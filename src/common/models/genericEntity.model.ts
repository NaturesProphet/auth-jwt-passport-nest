import { PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";

export abstract class GenericEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn( { type: 'timestamp with time zone' } )
  createdAt: Date;

  @UpdateDateColumn( { type: 'timestamp with time zone' } )
  updatedAt: Date;

}
