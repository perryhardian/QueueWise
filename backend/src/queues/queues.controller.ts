import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import type { AuthenticatedUser } from '../auth/auth.types';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { Roles } from '../common/decorators/roles.decorator';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Role } from '../generated/prisma/enums';
import { OpenQueueDto } from './dto/open-queue.dto';
import { QueuesService } from './queues.service';

@Controller()
export class QueuesController {
  constructor(private readonly queuesService: QueuesService) {}

  @Get('businesses/:businessId/queue')
  getBusinessQueue(@Param('businessId') businessId: string) {
    return this.queuesService.getBusinessQueue(businessId);
  }

  @Get('queues/:queueId/status')
  getQueueStatus(@Param('queueId') queueId: string) {
    return this.queuesService.getQueueStatus(queueId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.MERCHANT)
  @Get('merchant/queues/:queueId/dashboard')
  getMerchantDashboard(@CurrentUser() user: AuthenticatedUser, @Param('queueId') queueId: string) {
    return this.queuesService.getMerchantDashboard(user.id, queueId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.MERCHANT)
  @Get('merchant/queues/:queueId/entries')
  getMerchantQueueEntries(@CurrentUser() user: AuthenticatedUser, @Param('queueId') queueId: string) {
    return this.queuesService.getMerchantQueueEntries(user.id, queueId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.MERCHANT)
  @Post('merchant/businesses/:businessId/queues/open')
  openQueue(@CurrentUser() user: AuthenticatedUser, @Param('businessId') businessId: string, @Body() dto: OpenQueueDto) {
    return this.queuesService.openQueue(user.id, businessId, dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.MERCHANT)
  @Post('merchant/queues/:queueId/close')
  closeQueue(@CurrentUser() user: AuthenticatedUser, @Param('queueId') queueId: string) {
    return this.queuesService.closeQueue(user.id, queueId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.MERCHANT)
  @Post('merchant/queues/:queueId/pause')
  pauseQueue(@CurrentUser() user: AuthenticatedUser, @Param('queueId') queueId: string) {
    return this.queuesService.pauseQueue(user.id, queueId);
  }
}