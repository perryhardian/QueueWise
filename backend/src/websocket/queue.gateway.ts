import { UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { OnGatewayConnection, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import type { Server, Socket } from 'socket.io';
import type { AuthenticatedUser } from '../auth/auth.types';
import type { JwtPayload } from '../auth/jwt-payload';
import { QueueEventsService } from './queue-events.service';

@WebSocketGateway({
  cors: {
    origin: true,
    credentials: true,
  },
})
export class QueueGateway implements OnGatewayInit, OnGatewayConnection {
  @WebSocketServer()
  server!: Server;

  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly queueEventsService: QueueEventsService,
  ) {}

  afterInit(server: Server) {
    this.queueEventsService.attachServer(server);
  }

  async handleConnection(client: Socket) {
    try {
      const user = await this.authenticate(client);
      client.data.user = user;
      await client.join(`user:${user.id}`);
      await client.join(`role:${user.role}`);
    } catch {
      client.disconnect(true);
    }
  }

  @SubscribeMessage('queue.subscribe')
  async subscribeQueue(client: Socket, payload: { queueId?: string }) {
    this.assertAuthenticated(client);
    if (payload.queueId) await client.join(`queue:${payload.queueId}`);
    return { ok: true };
  }

  @SubscribeMessage('queue.unsubscribe')
  async unsubscribeQueue(client: Socket, payload: { queueId?: string }) {
    this.assertAuthenticated(client);
    if (payload.queueId) await client.leave(`queue:${payload.queueId}`);
    return { ok: true };
  }

  @SubscribeMessage('business.subscribe')
  async subscribeBusiness(client: Socket, payload: { businessId?: string }) {
    this.assertAuthenticated(client);
    if (payload.businessId) await client.join(`business:${payload.businessId}`);
    return { ok: true };
  }

  private async authenticate(client: Socket): Promise<AuthenticatedUser> {
    const token = this.extractToken(client);
    if (!token) throw new UnauthorizedException('Missing socket token');

    const payload = await this.jwtService.verifyAsync<JwtPayload>(token, {
      secret: this.configService.getOrThrow<string>('JWT_ACCESS_SECRET'),
    });

    return {
      id: payload.sub,
      email: payload.email,
      role: payload.role,
      sessionId: payload.sessionId,
    };
  }

  private extractToken(client: Socket) {
    const authToken = client.handshake.auth?.token;
    if (typeof authToken === 'string' && authToken.trim()) return authToken.trim();

    const header = client.handshake.headers.authorization;
    if (typeof header === 'string' && header.startsWith('Bearer ')) return header.slice(7).trim();
    return null;
  }

  private assertAuthenticated(client: Socket) {
    if (!client.data.user) throw new UnauthorizedException('Socket is not authenticated');
  }
}
