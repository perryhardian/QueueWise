import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { OnGatewayConnection, OnGatewayInit } from '@nestjs/websockets';
import type { Server, Socket } from 'socket.io';
import { QueueEventsService } from './queue-events.service';
export declare class QueueGateway implements OnGatewayInit, OnGatewayConnection {
    private readonly jwtService;
    private readonly configService;
    private readonly queueEventsService;
    server: Server;
    constructor(jwtService: JwtService, configService: ConfigService, queueEventsService: QueueEventsService);
    afterInit(server: Server): void;
    handleConnection(client: Socket): Promise<void>;
    subscribeQueue(client: Socket, payload: {
        queueId?: string;
    }): Promise<{
        ok: boolean;
    }>;
    unsubscribeQueue(client: Socket, payload: {
        queueId?: string;
    }): Promise<{
        ok: boolean;
    }>;
    subscribeBusiness(client: Socket, payload: {
        businessId?: string;
    }): Promise<{
        ok: boolean;
    }>;
    private authenticate;
    private extractToken;
    private assertAuthenticated;
}
