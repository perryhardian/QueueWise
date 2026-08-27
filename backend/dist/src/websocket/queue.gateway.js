"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueueGateway = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const websockets_1 = require("@nestjs/websockets");
const queue_events_service_1 = require("./queue-events.service");
let QueueGateway = class QueueGateway {
    jwtService;
    configService;
    queueEventsService;
    server;
    constructor(jwtService, configService, queueEventsService) {
        this.jwtService = jwtService;
        this.configService = configService;
        this.queueEventsService = queueEventsService;
    }
    afterInit(server) {
        this.queueEventsService.attachServer(server);
    }
    async handleConnection(client) {
        try {
            const user = await this.authenticate(client);
            client.data.user = user;
            await client.join(`user:${user.id}`);
            await client.join(`role:${user.role}`);
        }
        catch {
            client.disconnect(true);
        }
    }
    async subscribeQueue(client, payload) {
        this.assertAuthenticated(client);
        if (payload.queueId)
            await client.join(`queue:${payload.queueId}`);
        return { ok: true };
    }
    async unsubscribeQueue(client, payload) {
        this.assertAuthenticated(client);
        if (payload.queueId)
            await client.leave(`queue:${payload.queueId}`);
        return { ok: true };
    }
    async subscribeBusiness(client, payload) {
        this.assertAuthenticated(client);
        if (payload.businessId)
            await client.join(`business:${payload.businessId}`);
        return { ok: true };
    }
    async authenticate(client) {
        const token = this.extractToken(client);
        if (!token)
            throw new common_1.UnauthorizedException('Missing socket token');
        const payload = await this.jwtService.verifyAsync(token, {
            secret: this.configService.getOrThrow('JWT_ACCESS_SECRET'),
        });
        return {
            id: payload.sub,
            email: payload.email,
            role: payload.role,
            sessionId: payload.sessionId,
        };
    }
    extractToken(client) {
        const authToken = client.handshake.auth?.token;
        if (typeof authToken === 'string' && authToken.trim())
            return authToken.trim();
        const header = client.handshake.headers.authorization;
        if (typeof header === 'string' && header.startsWith('Bearer '))
            return header.slice(7).trim();
        return null;
    }
    assertAuthenticated(client) {
        if (!client.data.user)
            throw new common_1.UnauthorizedException('Socket is not authenticated');
    }
};
exports.QueueGateway = QueueGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", Function)
], QueueGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('queue.subscribe'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Function, Object]),
    __metadata("design:returntype", Promise)
], QueueGateway.prototype, "subscribeQueue", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('queue.unsubscribe'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Function, Object]),
    __metadata("design:returntype", Promise)
], QueueGateway.prototype, "unsubscribeQueue", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('business.subscribe'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Function, Object]),
    __metadata("design:returntype", Promise)
], QueueGateway.prototype, "subscribeBusiness", null);
exports.QueueGateway = QueueGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({
        cors: {
            origin: true,
            credentials: true,
        },
    }),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        config_1.ConfigService,
        queue_events_service_1.QueueEventsService])
], QueueGateway);
//# sourceMappingURL=queue.gateway.js.map