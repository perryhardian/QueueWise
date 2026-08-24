import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import type { AuthenticatedUser } from '../auth/auth.types';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { Roles } from '../common/decorators/roles.decorator';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Role } from '../generated/prisma/enums';
import { JoinQueueDto } from './dto/join-queue.dto';
import { WalkInDto } from './dto/walk-in.dto';
import { QueueEntriesService } from './queue-entries.service';

@Controller()
export class QueueEntriesController {
  constructor(private readonly queueEntriesService: QueueEntriesService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.CUSTOMER)
  @Post('queues/:queueId/join')
  joinQueue(@CurrentUser() user: AuthenticatedUser, @Param('queueId') queueId: string, @Body() dto: JoinQueueDto) {
    return this.queueEntriesService.joinQueue(user.id, queueId, dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.CUSTOMER)
  @Get('queue-entries/me/active')
  myActiveQueue(@CurrentUser() user: AuthenticatedUser) {
    return this.queueEntriesService.getMyActiveQueue(user.id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.CUSTOMER)
  @Get('queue-entries/:entryId/status')
  entryStatus(@CurrentUser() user: AuthenticatedUser, @Param('entryId') entryId: string) {
    return this.queueEntriesService.getEntryStatus(user.id, entryId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.CUSTOMER)
  @Post('queue-entries/:entryId/cancel')
  cancel(@CurrentUser() user: AuthenticatedUser, @Param('entryId') entryId: string) {
    return this.queueEntriesService.cancelEntry(user.id, entryId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.MERCHANT)
  @Post('merchant/queues/:queueId/walk-in')
  walkIn(@CurrentUser() user: AuthenticatedUser, @Param('queueId') queueId: string, @Body() dto: WalkInDto) {
    return this.queueEntriesService.addWalkIn(user.id, queueId, dto);
  }
}