import { IsOptional, IsString } from 'class-validator';

export class JoinQueueDto {
  @IsOptional()
  @IsString()
  serviceId?: string;
}