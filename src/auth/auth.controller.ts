import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
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
    return req.user;
  }
}
