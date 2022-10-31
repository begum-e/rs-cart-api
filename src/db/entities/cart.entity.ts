import { Entity, PrimaryColumn, OneToMany, CreateDateColumn, UpdateDateColumn, OneToOne } from 'typeorm';
import { CartItem } from './cartItem.entity';
import { User } from './user.entity';
import { Order } from './order.entity';

@Entity('Cart')
export class Cart {
    @PrimaryColumn('uuid')
    id: string;

    @OneToMany(
        () => CartItem,
        items => items.cart,
        { cascade: true }
    )
    items: CartItem[];


    @OneToMany(
        () => Order,
        orders => orders.cart
    )
    orders: Order[];

    @OneToOne(
        () => User, user => user.cart)
    user: User;

    @CreateDateColumn({
        name: 'createdAt', type: Date, nullable: false,
        default: new Date()
    })
    createdAt: Date;

    @UpdateDateColumn({
        name: 'updatedAt', type: Date,
        nullable: false
    })
    updatedAt: Date;
}