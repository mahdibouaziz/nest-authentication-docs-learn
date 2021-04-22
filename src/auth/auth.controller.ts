import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  /* 
    With @UseGuards(AuthGuard('local')) 
    we are using an AuthGuard that @nestjs/passport
    automatically provisioned for us 
    when we extended the passport-local strategy. 

    Our Passport local strategy has a default name of 'local'. 
    We reference that name in the @UseGuards() decorator 
    to associate it with code supplied by the passport-local package.
  */

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req) {
    return await this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Req() req) {
    return req.user;
  }
}
