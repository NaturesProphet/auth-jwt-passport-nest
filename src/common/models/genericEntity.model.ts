import { PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate } from "typeorm";

export abstract class GenericEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column( { type: Date, select: false, nullable: true } )
  createdAt: Date;

  @Column( { type: Date, select: false, nullable: true } )
  updatedAt: Date;


  @BeforeInsert()
  onCreate () {
    this.createdAt = new Date( new Date().toISOString() );
  }

  @BeforeUpdate()
  onUpdate () {
    this.updatedAt = new Date( new Date().toISOString() );
  }

}
