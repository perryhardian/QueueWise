"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = __importStar(require("bcrypt"));
const prisma_service_1 = require("../prisma/prisma.service");
const enums_1 = require("../generated/prisma/enums");
let AuthService = class AuthService {
    prisma;
    jwtService;
    configService;
    constructor(prisma, jwtService, configService) {
        this.prisma = prisma;
        this.jwtService = jwtService;
        this.configService = configService;
    }
    async register(dto) {
        const normalizedEmail = dto.email.trim().toLowerCase();
        const existingUser = await this.prisma.user.findUnique({ where: { email: normalizedEmail } });
        if (existingUser) {
            throw new common_1.ConflictException('Email is already registered');
        }
        const passwordHash = await bcrypt.hash(dto.password, 12);
        const role = dto.role ?? enums_1.Role.CUSTOMER;
        const user = await this.prisma.$transaction(async (tx) => {
            const createdUser = await tx.user.create({
                data: {
                    fullName: dto.fullName.trim(),
                    email: normalizedEmail,
                    phoneNumber: dto.phoneNumber?.trim(),
                    passwordHash,
                    role,
                },
            });
            if (role === enums_1.Role.MERCHANT) {
                await tx.merchant.create({
                    data: {
                        userId: createdUser.id,
                        displayName: dto.merchantDisplayName?.trim() || createdUser.fullName,
                    },
                });
            }
            return createdUser;
        });
        return this.createAuthResponse(user);
    }
    async login(dto) {
        const user = await this.prisma.user.findUnique({
            where: { email: dto.email.trim().toLowerCase() },
        });
        if (!user) {
            throw new common_1.UnauthorizedException('Invalid email or password');
        }
        const passwordMatches = await bcrypt.compare(dto.password, user.passwordHash);
        if (!passwordMatches) {
            throw new common_1.UnauthorizedException('Invalid email or password');
        }
        return this.createAuthResponse(user);
    }
    async refresh(refreshToken) {
        let payload;
        try {
            payload = await this.jwtService.verifyAsync(refreshToken, {
                secret: this.configService.getOrThrow('JWT_REFRESH_SECRET'),
            });
        }
        catch {
            throw new common_1.UnauthorizedException('Invalid refresh token');
        }
        if (!payload.sessionId) {
            throw new common_1.UnauthorizedException('Invalid refresh token');
        }
        const session = await this.prisma.authSession.findUnique({
            where: { id: payload.sessionId },
            include: { user: true },
        });
        if (!session || session.revokedAt || session.expiresAt <= new Date()) {
            throw new common_1.UnauthorizedException('Refresh token expired or revoked');
        }
        const tokenMatches = await bcrypt.compare(refreshToken, session.refreshTokenHash);
        if (!tokenMatches) {
            throw new common_1.UnauthorizedException('Invalid refresh token');
        }
        await this.prisma.authSession.update({
            where: { id: session.id },
            data: { revokedAt: new Date() },
        });
        return this.createAuthResponse(session.user);
    }
    async logout(refreshToken) {
        let payload;
        try {
            payload = await this.jwtService.verifyAsync(refreshToken, {
                secret: this.configService.getOrThrow('JWT_REFRESH_SECRET'),
                ignoreExpiration: true,
            });
        }
        catch {
            return { success: true };
        }
        if (payload.sessionId) {
            await this.prisma.authSession.updateMany({
                where: { id: payload.sessionId, revokedAt: null },
                data: { revokedAt: new Date() },
            });
        }
        return { success: true };
    }
    async createAuthResponse(user) {
        const session = await this.prisma.authSession.create({
            data: {
                userId: user.id,
                refreshTokenHash: 'pending',
                expiresAt: this.getRefreshTokenExpiryDate(),
            },
        });
        const accessPayload = {
            sub: user.id,
            email: user.email,
            role: user.role,
            sessionId: session.id,
        };
        const refreshPayload = accessPayload;
        const accessExpiresIn = this.configService.get('JWT_ACCESS_EXPIRES_IN', '15m');
        const refreshExpiresIn = this.configService.get('JWT_REFRESH_EXPIRES_IN', '7d');
        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync(accessPayload, {
                secret: this.configService.getOrThrow('JWT_ACCESS_SECRET'),
                expiresIn: accessExpiresIn,
            }),
            this.jwtService.signAsync(refreshPayload, {
                secret: this.configService.getOrThrow('JWT_REFRESH_SECRET'),
                expiresIn: refreshExpiresIn,
            }),
        ]);
        await this.prisma.authSession.update({
            where: { id: session.id },
            data: { refreshTokenHash: await bcrypt.hash(refreshToken, 12) },
        });
        return {
            accessToken,
            refreshToken,
            user: {
                id: user.id,
                fullName: user.fullName,
                email: user.email,
                phoneNumber: user.phoneNumber,
                role: user.role,
            },
        };
    }
    getRefreshTokenExpiryDate() {
        const expiresIn = this.configService.get('JWT_REFRESH_EXPIRES_IN', '7d');
        const milliseconds = this.parseDurationToMilliseconds(expiresIn);
        return new Date(Date.now() + milliseconds);
    }
    parseDurationToMilliseconds(value) {
        const match = /^(\d+)([mhd])$/.exec(value);
        if (!match) {
            return 7 * 24 * 60 * 60 * 1000;
        }
        const amount = Number(match[1]);
        const unit = match[2];
        if (unit === 'm')
            return amount * 60 * 1000;
        if (unit === 'h')
            return amount * 60 * 60 * 1000;
        return amount * 24 * 60 * 60 * 1000;
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService,
        config_1.ConfigService])
], AuthService);
//# sourceMappingURL=auth.service.js.map