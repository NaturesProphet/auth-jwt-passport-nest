import { PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";

export abstract class GenericEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn( { select: false } )
  createdAt: Date;

  @UpdateDateColumn( { select: false } )
  updatedAt: Date;
}
