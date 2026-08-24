import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { RegisterDto } from './dto/register.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(dto: RegisterDto): Promise<import("./auth.types").AuthResponse>;
    login(dto: LoginDto): Promise<import("./auth.types").AuthResponse>;
    refresh(dto: RefreshTokenDto): Promise<import("./auth.types").AuthResponse>;
    logout(dto: RefreshTokenDto): Promise<{
        success: true;
    }>;
}
