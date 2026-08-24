import { QueueStatus } from '../generated/prisma/enums';
import { PrismaService } from '../prisma/prisma.service';
import { BusinessQueryDto } from './dto/business-query.dto';
export declare class BusinessesService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findCategories(): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        slug: string;
    }[]>;
    findAll(query: BusinessQueryDto): Promise<{
        id: string;
        name: string;
        description: string | null;
        imageUrl: string | null;
        rating: number | null;
        address: string;
        distanceKm: number | null;
        category: {
            id: string;
            name: string;
            slug: string;
            createdAt: Date;
            updatedAt: Date;
        };
        queue: {
            id: string;
            status: QueueStatus;
            currentNumber: string | null;
            peopleWaiting: number;
            estimatedWaitingTimeMinutes: number;
            averageServiceTimeMinutes: number;
        };
    }[]>;
    findNearby(query: BusinessQueryDto): Promise<{
        id: string;
        name: string;
        description: string | null;
        imageUrl: string | null;
        rating: number | null;
        address: string;
        distanceKm: number | null;
        category: {
            id: string;
            name: string;
            slug: string;
            createdAt: Date;
            updatedAt: Date;
        };
        queue: {
            id: string;
            status: QueueStatus;
            currentNumber: string | null;
            peopleWaiting: number;
            estimatedWaitingTimeMinutes: number;
            averageServiceTimeMinutes: number;
        };
    }[]>;
    findOne(id: string): Promise<{
        openingHours: unknown;
        services: {
            id: string;
            name: string;
            estimatedDurationMinutes: number | null;
            price: number | null;
        }[];
        id: string;
        name: string;
        description: string | null;
        imageUrl: string | null;
        rating: number | null;
        address: string;
        distanceKm: number | null;
        category: {
            id: string;
            name: string;
            slug: string;
            createdAt: Date;
            updatedAt: Date;
        };
        queue: {
            id: string;
            status: QueueStatus;
            currentNumber: string | null;
            peopleWaiting: number;
            estimatedWaitingTimeMinutes: number;
            averageServiceTimeMinutes: number;
        };
    }>;
    private businessInclude;
    private toBusinessSummary;
    private toBusinessDetail;
    private distanceKm;
    private toRadians;
}
