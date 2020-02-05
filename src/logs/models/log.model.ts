import { Entity, Column } from "typeorm";
import { GenericEntity } from "../../common/models/genericEntity.model";

@Entity()
export class Log extends GenericEntity {
  @Column()
  endpoint: string;

  @Column()
  response: number;

  @Column( { nullable: true } )
  body: string;

  @Column( { nullable: true } )
  params: string;

  @Column( { nullable: true } )
  userId: number; // se quiser, você pode melhorar isso com um ManyToOne() para User ;)

  @Column( { nullable: true } )
  accountType: string;

  @Column( { nullable: true } )
  ip: string;

  @Column()
  method: string;

  @Column( { nullable: true } )
  userAgent: string;
}
