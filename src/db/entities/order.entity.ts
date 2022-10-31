import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm';

import { CartItem } from './cartItem.entity';
import { Cart } from './cart.entity';

import { User } from './user.entity';

@Entity('Order')
export class Order {
    @PrimaryColumn('uuid')
    id: string;

    @ManyToOne(
        () => Cart,
        cart => cart.orders
    )
    @JoinColumn({ name: 'cartId' })
    cart: Cart;

    @ManyToOne(
        () => User,
        user => user.orders
    )
    @JoinColumn({ name: 'userId' })
    user: User;

    @Column({ type: 'jsonb', nullable: true })
    items: CartItem[];

    @Column({ type: 'jsonb', nullable: true })
    payment: string;

    @Column({ type: 'jsonb', nullable: true })
    delivery: string;

    @Column({ nullable: true })
    comments: string;

    @Column()
    status: string;

    @Column()
    total: number;
}