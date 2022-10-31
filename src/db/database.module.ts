import { Module } from '@nestjs/common';
//import { DatabaseService } from './database.service';

import { Product } from 'src/db/entities/product.entity';
import { Stock } from 'src/db/entities/stock.entity';
import { Cart } from 'src/db/entities/cart.entity';
import { CartItem } from 'src/db/entities/cartItem.entity';
import { User } from 'src/db/entities/user.entity';
import { Order } from 'src/db/entities/order.entity';

import { TypeOrmModule } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

const { PG_HOST, PG_PORT, PG_DB, PG_USER, PG_PASSWORD } = process.env;

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: PG_HOST,
      port: +PG_PORT,
      username: PG_USER,
      password: PG_PASSWORD,
      database: PG_DB,
      entities: ["dist/**/*.entity{.ts,.js}"],
      logging: true,
      namingStrategy: new SnakeNamingStrategy(),
    }),
    TypeOrmModule.forFeature([Product, Stock, Cart, CartItem, User, Order]),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule { }
