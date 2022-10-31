import { Module } from '@nestjs/common';

import { UsersService } from './services';
import { DatabaseModule } from '../db/database.module';
import { UserController } from './user.controller';

@Module({
  imports: [DatabaseModule],
  providers: [UsersService],
  exports: [UsersService],
  controllers: [UserController]
})

export class UsersModule { }
