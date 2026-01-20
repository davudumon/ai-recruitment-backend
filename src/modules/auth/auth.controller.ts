import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'User login', description: 'Authenticates a user and returns a JWT token upon successful login.' })
  @Post('login')
  login(@Body() body: { email: string; password: string }) {
    return this.authService.login(body.email, body.password);
  }
}
