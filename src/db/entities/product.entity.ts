import { Entity, PrimaryColumn, Column, OneToOne } from 'typeorm';
import { Stock } from './stock.entity';

@Entity('Product')
export class Product {
    @PrimaryColumn('uuid')
    id: string

    @Column({ name: 'title' })
    title: string

    @Column({ name: 'description', nullable: true })
    description: string;

    @Column({ name: 'price' })
    price: string;

    @OneToOne(
        () => Stock,
        stock => stock.product, { cascade: true })
    stock: Stock;
}