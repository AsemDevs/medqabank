import { Controller, Post, Body, Get, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { RegisterDto } from './register.dto';
import { LoginDto } from './login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // Default JWT Login
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const result = await this.authService.login(loginDto);
    console.log('Generated Token:', result.access_token); // Log the generated token for debugging
    return result;
  }

  // Register a new user
  @Post('register')
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  // Google OAuth Login Initiation
  @Get('google')
  @UseGuards(AuthGuard('google'))
  googleLogin() {
    // This route redirects to Google for authentication
  }

  // Google OAuth Callback
  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  googleLoginCallback(@Req() req) {
    // Handle Google OAuth callback, returning user data and token
    const user = req.user;
    return {
      message: 'Google login successful',
      user, // user data obtained from Google
    };
  }
}
