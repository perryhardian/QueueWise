import { plainToInstance, Type } from 'class-transformer';
import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Max,
  Min,
  validateSync,
} from 'class-validator';

enum Environment {
  Development = 'development',
  Test = 'test',
  Production = 'production',
}

class EnvironmentVariables {
  @IsEnum(Environment)
  NODE_ENV: Environment = Environment.Development;

  @IsString()
  @IsNotEmpty()
  HOST = '0.0.0.0';

  @IsInt()
  @Min(1)
  @Max(65535)
  @Type(() => Number)
  PORT = 3000;

  @IsString()
  @IsNotEmpty()
  API_PREFIX = 'api';

  @IsOptional()
  @IsString()
  CORS_ORIGINS?: string;

  @IsString()
  @IsNotEmpty()
  DATABASE_URL!: string;

  @IsString()
  @IsNotEmpty()
  JWT_ACCESS_SECRET!: string;

  @IsString()
  @IsNotEmpty()
  JWT_REFRESH_SECRET!: string;

  @IsString()
  @IsNotEmpty()
  JWT_ACCESS_EXPIRES_IN = '15m';

  @IsString()
  @IsNotEmpty()
  JWT_REFRESH_EXPIRES_IN = '7d';

  @IsOptional()
  @IsString()
  FIREBASE_PROJECT_ID?: string;

  @IsOptional()
  @IsString()
  FIREBASE_CLIENT_EMAIL?: string;

  @IsOptional()
  @IsString()
  FIREBASE_PRIVATE_KEY?: string;
}

export function validateEnvironment(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }

  if (validatedConfig.NODE_ENV === Environment.Production) {
    const productionErrors: string[] = [];
    const accessSecret = validatedConfig.JWT_ACCESS_SECRET.trim();
    const refreshSecret = validatedConfig.JWT_REFRESH_SECRET.trim();

    if (accessSecret.length < 32 || accessSecret.startsWith('replace-with')) {
      productionErrors.push(
        'JWT_ACCESS_SECRET must contain at least 32 non-placeholder characters.',
      );
    }
    if (refreshSecret.length < 32 || refreshSecret.startsWith('replace-with')) {
      productionErrors.push(
        'JWT_REFRESH_SECRET must contain at least 32 non-placeholder characters.',
      );
    }
    if (accessSecret === refreshSecret) {
      productionErrors.push(
        'JWT access and refresh secrets must be different.',
      );
    }

    const firebaseValues = [
      validatedConfig.FIREBASE_PROJECT_ID,
      validatedConfig.FIREBASE_CLIENT_EMAIL,
      validatedConfig.FIREBASE_PRIVATE_KEY,
    ];
    if (firebaseValues.some((value) => !value?.trim())) {
      productionErrors.push(
        'Firebase Admin credentials are required in production.',
      );
    }

    if (productionErrors.length > 0) {
      throw new Error(productionErrors.join(' '));
    }
  }

  return validatedConfig;
}
