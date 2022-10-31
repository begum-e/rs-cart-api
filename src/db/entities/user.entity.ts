import { Entity, PrimaryColumn, Column, OneToMany, OneToOne, JoinColumn } from 'typeorm';
import { Cart } from './cart.entity';
import { Order } from './order.entity';

@Entity('User')
export class User {

    @PrimaryColumn('uuid')
    id: string;

    @Column({ name: 'name' })
    name: string;

    @Column({ name: 'password', nullable: true })
    password: string;

    @Column({ name: 'email', nullable: true })
    email: string;

    @OneToOne(
        () => Cart,
        cart => cart.user, { nullable: true }
    )
    @JoinColumn({ name: 'cartId' })
    cart: Cart;

    @OneToMany(
        () => Order,
        orders => orders.user,
        { cascade: true }
    )
    orders: Order[];
}