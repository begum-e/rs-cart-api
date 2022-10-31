import { Entity, PrimaryColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { Cart } from './Cart';

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
}