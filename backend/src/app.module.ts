import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AnalyticsModule } from './analytics/analytics.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { BusinessesModule } from './businesses/businesses.module';
import { validateEnvironment } from './common/config/environment.validation';
import { MerchantsModule } from './merchants/merchants.module';
import { NotificationsModule } from './notifications/notifications.module';
import { PrismaModule } from './prisma/prisma.module';
import { QueueEntriesModule } from './queue-entries/queue-entries.module';
import { QueuesModule } from './queues/queues.module';
import { UsersModule } from './users/users.module';
import { WebsocketModule } from './websocket/websocket.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: validateEnvironment,
    }),
    PrismaModule,
    AuthModule,
    UsersModule,
    MerchantsModule,
    BusinessesModule,
    QueuesModule,
    QueueEntriesModule,
    NotificationsModule,
    AnalyticsModule,
    WebsocketModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
