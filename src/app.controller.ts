import { Controller, Request, Get, Post, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth/auth.service';

@Controller()
export class AppController {
  constructor(
    private authService: AuthService,
    private readonly appService: AppService
    ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  //@UseGuards(AuthGuard('local'))
  @Get('auth/login')
  loginHello(): string {
    return this.appService.loginHello();
  }

  //@UseGuards(AuthGuard('local'))
  @Post('auth/login')
  async login(@Request() req: any){
    return this.authService.login(req.client);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  getProfile(@Request() req: any) {
    return req.user;
  }

}
