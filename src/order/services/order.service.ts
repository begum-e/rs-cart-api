import { Injectable } from '@nestjs/common';
import { v4 } from 'uuid';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from '../models';
import { Order as OrderEntity } from 'src/db/entities/order.entity';

@Injectable()
export class OrderService {

  private orders: Record<string, Order> = {}
  private orderEntity: Record<string, OrderEntity> = {}

  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepo: Repository<OrderEntity>,
  ) { }

  findById(orderId: string): Order {
    return this.orders[orderId];
  }

  create(data: any) {
    const id = v4(v4())
    const order = {
      ...data,
      id,
      status: 'inProgress',
    };

    this.orders[id] = order;

    return order;
  }

  update(orderId, data) {
    const order = this.findById(orderId);

    if (!order) {
      throw new Error('Order does not exist.');
    }

    this.orders[orderId] = {
      ...data,
      id: orderId,
    }
  }

  async getAllOrdersFromRepo(): Promise<OrderEntity[]> {
    const orderEntities: OrderEntity[] = await this.orderRepo.find();
    console.log("getAllOrdersFromRepo:", orderEntities);
    return orderEntities;
  }

  findByIdFromRepo(orderId: string) {
    console.log("findByIdRepo:", orderId)
    const order = this.orderRepo.findOne(orderId)
    console.log("order:", order)
    return order;
  }

  updateFromRepo(orderId: string, data) {
    console.log("updateRepo:", orderId)

    const order = this.findByIdFromRepo(orderId);
    if (!order) {
      throw new Error('Order does not exist.');
    }

    const toUpdateData = {
      ...data,
      id: orderId,
    }
    console.log("toUpdateData:", toUpdateData)
    this.orderRepo.save(toUpdateData);
  }

  createFromRepo(data: any) {

    const id = v4(v4())
    const order = {
      ...data,
      id,
      status: 'inProgress',
    };
    const created = this.orderRepo.create(data);

    this.orderEntity[id] = created[id];

    return created;
  }
}
