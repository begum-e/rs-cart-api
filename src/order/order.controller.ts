import { Controller, Get, Param, Put, Body, Req, Post, HttpStatus } from '@nestjs/common';

import { OrderService } from './services/order.service';
import { AppRequest } from '../shared';

import { Order as OrderEntity } from './../db/entities/order.entity';

@Controller('api/order')
export class OrderController {

  constructor(private orderService: OrderService) { }

  @Get('all')
  async getAllOrders(@Req() req: AppRequest) {
    const order = this.orderService.getAllOrdersFromRepo();
    console.log(order)
    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
      data: { order },
    }
  }

  @Get(':id')
  async findOneById(
    @Param('id') id: string
  ): Promise<any & {
    body: OrderEntity
  }> {
    return this.orderService.findByIdFromRepo(id);
  }


}
