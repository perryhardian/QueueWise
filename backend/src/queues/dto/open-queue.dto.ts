import { IsInt, IsOptional, Max, Min } from 'class-validator';

export class OpenQueueDto {
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(240)
  averageServiceTimeMinutes?: number;
}