export declare class BusinessQueryDto {
    search?: string;
    category?: string;
    queueLength?: 'shortest' | 'longest';
    latitude?: number;
    longitude?: number;
    radiusKm?: number;
}
