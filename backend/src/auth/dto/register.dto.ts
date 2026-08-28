import { IsEmail, IsEnum, IsIn, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';
import { Role } from '../../generated/prisma/enums';

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  fullName!: string;

  @IsEmail({}, { message: 'Enter a valid email address.' })
  email!: string;

  @IsOptional()
  @IsString()
  phoneNumber?: string;

  @IsString()
  @MinLength(8)
  password!: string;

  @IsOptional()
  @IsEnum(Role)
  @IsIn([Role.CUSTOMER, Role.MERCHANT])
  role?: Role;

  @IsOptional()
  @IsString()
  merchantDisplayName?: string;
}
