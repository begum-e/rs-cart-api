import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Cart } from './cart.entity';

@Entity('CartItem')
export class CartItem {
    @PrimaryColumn('uuid')
    id: string;

    @Column({ name: 'productId' })
    productId: string;

    @ManyToOne
        (() => Cart, { nullable: false })
    @JoinColumn({ name: 'cartId' })
    cart: Cart;

    @Column({ name: 'count' })
    count: number;
}