import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AnalyticsFeatureModule } from './analytics/analytics-feature.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { BusinessesModule } from './businesses/businesses.module';
import { validateEnvironment } from './common/config/environment.validation';
import { MerchantsModule } from './merchants/merchants.module';
import { NotificationsFeatureModule } from './notifications/notifications-feature.module';
import { PrismaModule } from './prisma/prisma.module';
import { QueueEntriesModule } from './queue-entries/queue-entries.module';
import { QueuesModule } from './queues/queues.module';
import { UsersModule } from './users/users.module';
import { QueueRealtimeModule } from './websocket/queue-realtime.module';
import { HealthController } from './health/health.controller';

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
    NotificationsFeatureModule,
    AnalyticsFeatureModule,
    QueueRealtimeModule,
  ],
  controllers: [AppController, HealthController],
  providers: [AppService],
})
export class AppModule {}
