export declare const activeQueueEntryStatuses: ("WAITING" | "CHECKED_IN" | "CALLED" | "SERVING")[];
export declare function formatQueueNumber(sequenceNumber: number, prefix?: string): string;
export declare function estimateWaitMinutes(peopleAhead: number, averageServiceTimeMinutes: number): number;
