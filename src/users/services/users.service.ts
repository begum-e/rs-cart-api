import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 } from 'uuid';
import { User } from '../models';
import { User as UserEntity } from 'src/db/entities/user.entity';

@Injectable()
export class UsersService {
  private readonly users: Record<string, User>;

  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
  ) {
    this.users = {}
  }


  findOne(userId: string): User {
    return this.users[userId];
  }

  createOne({ name, password }: User): User {
    const id = v4(v4());
    const newUser = { id: name || id, name, password };

    this.users[id] = newUser;

    return newUser;
  }

  async findOneFromRepo(userId: string): Promise<UserEntity> {
    console.log("findOneFromRepo:", userId)
    const user = await this.userRepo.findOne(userId);
    console.log("user:", user)
    return user;
  }

  async getAllFromRepo(): Promise<UserEntity[]> {
    console.log("findOneFromRepo:")
    const users = await this.userRepo.find();
    console.log("users:", users)
    return users;
  }
  async createOneFromRepo({ name, password }: User): Promise<UserEntity> {
    console.log("createOneFromRepo")

    const id = v4(v4());
    const newUser = { id: name || id, name, password };
    console.log("createOneFromRepo:newUser->", newUser)

    return await this.userRepo.save(newUser);
  }

}
