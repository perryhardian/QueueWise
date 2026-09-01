import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import {
  LegalPagesController,
  PublicAccountDeletionController,
} from './legal.controller';
import { LegalPagesService } from './legal-pages.service';

@Module({
  imports: [UsersModule],
  controllers: [LegalPagesController, PublicAccountDeletionController],
  providers: [LegalPagesService],
})
export class LegalModule {}
