import { Controller, Get, Request, Post, UseGuards, HttpStatus } from '@nestjs/common';
import { LocalAuthGuard, AuthService, JwtAuthGuard, BasicAuthGuard } from './auth';
import dbService from 'src/db/db.service';

@Controller()
export class AppController {

  constructor(private authService: AuthService) { }

  @Get(['', 'ping'])
  async healthCheck(): Promise<any> {
    const dbClient = await dbService();
    const res = dbClient.query('SELECT $1::text as connected', [
      'Connection to postgres successful!',
    ]);
    if (res) {
      return {
        statusCode: HttpStatus.OK,
        message: 'OK',
      };
    }
    return {
      statusCode: HttpStatus.BAD_REQUEST,
      message: 'NOT-OK',
    };
  }

  @UseGuards(LocalAuthGuard)
  @Post('api/auth/login')
  async login(@Request() req) {
    const token = this.authService.login(req.user, 'basic');

    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
      data: {
        ...token,
      },
    };
  }

  @UseGuards(BasicAuthGuard)
  @Get('api/profile')
  async getProfile(@Request() req) {
    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
      data: {
        user: req.user,
      },
    };
  }
}
