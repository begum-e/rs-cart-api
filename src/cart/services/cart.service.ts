import { Injectable } from '@nestjs/common';

import { v4 } from 'uuid';

import { Cart } from '../models';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cart as CartEntity } from 'src/db/entities/cart.entity';
import { CartItem as CartItemEntity } from 'src/db/entities/cartItem.entity';

import { User as UserEntity } from 'src/db/entities/user.entity';

@Injectable()
export class CartService {
  private userCarts: Record<string, Cart> = {};
  private userCartEntities: Record<string, CartEntity> = {};

  constructor(
    @InjectRepository(CartEntity)
    private readonly cartRepo: Repository<CartEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
    @InjectRepository(CartItemEntity)
    private readonly cartItemRepo: Repository<CartItemEntity>,
  ) { }

  findByUserId(userId: string): Cart {
    return this.userCarts[userId];
  }

  createByUserId(userId: string) {
    const id = v4(v4());
    const userCart = {
      id,
      items: [],
    };

    this.userCarts[userId] = userCart;

    return userCart;
  }

  findOrCreateByUserId(userId: string): Cart {
    const userCart = this.findByUserId(userId);

    if (userCart) {
      return userCart;
    }

    return this.createByUserId(userId);
  }

  updateByUserId(userId: string, { items }: Cart): Cart {
    const { id, ...rest } = this.findOrCreateByUserId(userId);

    const updatedCart = {
      id,
      ...rest,
      items: [...items],
    }

    this.userCarts[userId] = { ...updatedCart };

    return { ...updatedCart };
  }

  removeByUserId(userId): void {
    this.userCarts[userId] = null;
  }


  async getAllCartsFromRepo(): Promise<CartEntity[]> {
    console.log("getAllCarts");

    const cartEntities: CartEntity[] = await this.cartRepo.find();
    console.log("getAllCarts:", cartEntities);
    return cartEntities;
  }

  async findByUserIdFromRepo(userId: string): Promise<CartEntity> {
    console.log("findByUserIdRepo:", userId);

    const user = await this.userRepo.findOne({ where: { "id": "3f150694-de43-4ecf-afc8-9929af1e1fea" }, relations: ['cart'] });
    const cartId = user.cart.id;
    const cart: CartEntity = await this.cartRepo.findOne({
      where: { "id": cartId },
      relations: ['items']
    })
    this.userCartEntities[userId] = cart

    console.log("findByUserIdRepo:cartId:", cart)
    return this.userCartEntities[userId];
  }

  async findOrCreateByUserIdFromRepo(userId: string): Promise<CartEntity> {
    console.log("findOrCreateByUserIdFromRepo:userId -> ", userId);

    const userCart: CartEntity = await this.findByUserIdFromRepo(userId);
    console.log("userCart:", userCart)

    if (userCart) {
      return userCart;
    }
    return this.createByUserIdFromRepo(userId);
  }

  async createByUserIdFromRepo(userId: string): Promise<any> {
    console.log("createByUserIdFromRepo:userId -> ", userId);

    const id = v4(v4());
    const userCart = {
      id,
      items: [],
    };


    console.log("createByUserIdFromRepo:userCart -> ", userCart);
    const created = this.cartRepo.create(userCart);

    this.userCartEntities[userId] = created;
    return this.userCartEntities[userId];

  }

  async removeByUserIdFromRepo(userId: string): Promise<void> {
    console.log("removeByUserIdFromRepo:userCart -> ", userId);
    const userCart = await this.findByUserIdFromRepo(userId)
    console.log("removeByUserIdFromRepo:userCart -> ", userCart);
    this.cartRepo.queryRunner.startTransaction()
    try {
      // execute some operations on this transaction:
      await this.cartRepo.delete(userCart)
      // commit transaction now:
      this.cartRepo.queryRunner.commitTransaction()
    } catch (err) {
      // since we have errors let's rollback changes we made
      await this.cartRepo.queryRunner.rollbackTransaction()
    } finally {
      // you need to release query runner which is manually created:
      await this.cartRepo.queryRunner.release()
    }
  }
}
