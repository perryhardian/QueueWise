import { IsOptional, IsString } from 'class-validator';

export class WalkInDto {
  @IsOptional()
  @IsString()
  customerName?: string;

  @IsOptional()
  @IsString()
  serviceId?: string;
}