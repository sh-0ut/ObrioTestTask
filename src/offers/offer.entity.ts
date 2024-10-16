import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('offers')
export class Offer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('decimal')
  price: number;
}
