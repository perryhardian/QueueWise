import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import type { AuthenticatedUser } from '../auth/auth.types';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { Roles } from '../common/decorators/roles.decorator';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Role } from '../generated/prisma/enums';
import { AnalyticsService } from './analytics.service';

@Controller()
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.CUSTOMER)
  @Get('queue-history/me')
  getMyHistory(@CurrentUser() user: AuthenticatedUser) {
    return this.analyticsService.getMyHistory(user.id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.MERCHANT)
  @Get('merchant/businesses/:businessId/analytics')
  getMerchantBusinessAnalytics(@CurrentUser() user: AuthenticatedUser, @Param('businessId') businessId: string) {
    return this.analyticsService.getMerchantBusinessAnalytics(user.id, businessId);
  }
}
