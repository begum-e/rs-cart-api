import { Controller, Get, Param, Put, Body, Req, Post, HttpStatus } from '@nestjs/common';

import { UsersService } from './services/users.service';
import { AppRequest } from '../shared';

import { User as UserEntity } from '../db/entities/user.entity';

@Controller('api/order')
export class UserController {

  constructor(private userService: UsersService) { }

  @Get('all')
  async getAllUsers(@Req() req: AppRequest) {
    const users = this.userService.getAllFromRepo();
    console.log(users)
    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
      data: { users },
    }
  }

  @Get(':id')
  async findOneById(
    @Param('id') id: string
  ): Promise<any & {
    body: UserEntity
  }> {
    return this.userService.findOneFromRepo(id);
  }


}
