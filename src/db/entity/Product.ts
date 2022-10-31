import { Entity, PrimaryColumn, Column, OneToOne } from 'typeorm';
import { Stock } from './stock';

@Entity('Product')
export class Product {
    @PrimaryColumn('uuid')
    id: string

    @Column({ name: 'title' })
    title: string

    @Column({ name: 'description', nullable: true })
    description: string;

    @Column({ name: 'price' })
    price: number;

    @OneToOne(
        () => Stock, stock => stock.product, { cascade: true })
    stock: Stock;
}