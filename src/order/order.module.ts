import { Module } from '@nestjs/common';
import { OrderService } from './services';
import { DatabaseModule } from '../db/database.module';
import { OrderController } from './order.controller';

@Module({
  imports: [DatabaseModule],
  providers: [OrderService],
  exports: [OrderService],
  controllers: [OrderController]

})
export class OrderModule { }
