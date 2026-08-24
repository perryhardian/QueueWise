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
exports.BusinessesService = void 0;
const common_1 = require("@nestjs/common");
const enums_1 = require("../generated/prisma/enums");
const prisma_service_1 = require("../prisma/prisma.service");
const activeEntryStatuses = [
    enums_1.QueueEntryStatus.WAITING,
    enums_1.QueueEntryStatus.CHECKED_IN,
    enums_1.QueueEntryStatus.CALLED,
    enums_1.QueueEntryStatus.SERVING,
];
let BusinessesService = class BusinessesService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findCategories() {
        return this.prisma.businessCategory.findMany({ orderBy: { name: 'asc' } });
    }
    async findAll(query) {
        const businesses = await this.prisma.business.findMany({
            where: {
                ...(query.search
                    ? {
                        OR: [
                            { name: { contains: query.search, mode: 'insensitive' } },
                            { address: { contains: query.search, mode: 'insensitive' } },
                        ],
                    }
                    : {}),
                ...(query.category ? { category: { slug: query.category } } : {}),
            },
            include: this.businessInclude(),
            orderBy: { name: 'asc' },
        });
        let items = businesses.map((business) => this.toBusinessSummary(business, query.latitude, query.longitude));
        if (query.latitude != null && query.longitude != null && query.radiusKm != null) {
            items = items.filter((business) => business.distanceKm != null && business.distanceKm <= query.radiusKm);
        }
        if (query.queueLength === 'shortest') {
            items.sort((a, b) => a.queue.peopleWaiting - b.queue.peopleWaiting);
        }
        if (query.queueLength === 'longest') {
            items.sort((a, b) => b.queue.peopleWaiting - a.queue.peopleWaiting);
        }
        return items;
    }
    async findNearby(query) {
        if (query.latitude == null || query.longitude == null) {
            return this.findAll(query);
        }
        const businesses = await this.findAll({ ...query, radiusKm: query.radiusKm ?? 25 });
        return businesses.sort((a, b) => (a.distanceKm ?? Number.MAX_VALUE) - (b.distanceKm ?? Number.MAX_VALUE));
    }
    async findOne(id) {
        const business = await this.prisma.business.findUnique({
            where: { id },
            include: this.businessInclude(),
        });
        if (!business) {
            throw new common_1.NotFoundException('Business not found');
        }
        return this.toBusinessDetail(business);
    }
    businessInclude() {
        return {
            category: true,
            services: { orderBy: { name: 'asc' } },
            queues: {
                where: { status: { in: [enums_1.QueueStatus.OPEN, enums_1.QueueStatus.PAUSED] } },
                orderBy: { openedAt: 'desc' },
                take: 1,
                include: {
                    entries: {
                        where: { status: { in: activeEntryStatuses } },
                        orderBy: { sequenceNumber: 'asc' },
                    },
                },
            },
        };
    }
    toBusinessSummary(business, latitude, longitude) {
        const queue = business.queues[0];
        const peopleWaiting = queue?.entries.length ?? 0;
        const averageServiceTimeMinutes = queue?.averageServiceTimeMinutes ?? 10;
        return {
            id: business.id,
            name: business.name,
            description: business.description,
            imageUrl: business.imageUrl,
            rating: business.rating == null ? null : Number(business.rating),
            address: business.address,
            distanceKm: this.distanceKm(business, latitude, longitude),
            category: business.category,
            queue: {
                id: queue?.id ?? null,
                status: queue?.status ?? enums_1.QueueStatus.CLOSED,
                currentNumber: queue?.currentNumber ?? null,
                peopleWaiting,
                estimatedWaitingTimeMinutes: peopleWaiting * averageServiceTimeMinutes,
                averageServiceTimeMinutes,
            },
        };
    }
    toBusinessDetail(business) {
        const summary = this.toBusinessSummary(business);
        return {
            ...summary,
            openingHours: business.openingHours,
            services: business.services.map((service) => ({
                id: service.id,
                name: service.name,
                estimatedDurationMinutes: service.estimatedDurationMinutes,
                price: service.price == null ? null : Number(service.price),
            })),
        };
    }
    distanceKm(business, latitude, longitude) {
        if (latitude == null || longitude == null || business.latitude == null || business.longitude == null) {
            return null;
        }
        const lat1 = latitude;
        const lon1 = longitude;
        const lat2 = Number(business.latitude);
        const lon2 = Number(business.longitude);
        const earthRadiusKm = 6371;
        const dLat = this.toRadians(lat2 - lat1);
        const dLon = this.toRadians(lon2 - lon1);
        const a = Math.sin(dLat / 2) ** 2 + Math.cos(this.toRadians(lat1)) * Math.cos(this.toRadians(lat2)) * Math.sin(dLon / 2) ** 2;
        return Math.round(earthRadiusKm * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)) * 10) / 10;
    }
    toRadians(value) {
        return (value * Math.PI) / 180;
    }
};
exports.BusinessesService = BusinessesService;
exports.BusinessesService = BusinessesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], BusinessesService);
//# sourceMappingURL=businesses.service.js.map