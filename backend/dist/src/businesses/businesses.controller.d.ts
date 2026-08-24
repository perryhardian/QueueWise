import { BusinessesService } from './businesses.service';
import { BusinessQueryDto } from './dto/business-query.dto';
export declare class BusinessesController {
    private readonly businessesService;
    constructor(businessesService: BusinessesService);
    categories(): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        slug: string;
    }[]>;
    nearby(query: BusinessQueryDto): Promise<{
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
            status: import("../generated/prisma/enums").QueueStatus;
            currentNumber: string | null;
            peopleWaiting: number;
            estimatedWaitingTimeMinutes: number;
            averageServiceTimeMinutes: number;
        };
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
            status: import("../generated/prisma/enums").QueueStatus;
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
            status: import("../generated/prisma/enums").QueueStatus;
            currentNumber: string | null;
            peopleWaiting: number;
            estimatedWaitingTimeMinutes: number;
            averageServiceTimeMinutes: number;
        };
    }>;
}
