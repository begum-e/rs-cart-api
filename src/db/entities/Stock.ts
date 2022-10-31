import { Entity, PrimaryColumn, JoinColumn, Column, OneToOne, } from 'typeorm';
import { Product } from './Product';

@Entity('Stock')
export class Stock {
    @PrimaryColumn('uuid')
    id: string

    @Column({ name: 'count' })
    count: number;

    @OneToOne(() => Product, product => product.stock)
    @JoinColumn({ name: 'productId' })
    product: Product;
}