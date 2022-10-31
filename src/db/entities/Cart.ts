import { Entity, PrimaryColumn, OneToMany, CreateDateColumn, UpdateDateColumn, OneToOne } from 'typeorm';
import { CartItem } from './CartItem';
import { User } from './User';

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