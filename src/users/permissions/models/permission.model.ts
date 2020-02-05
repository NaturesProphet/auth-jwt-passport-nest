import { Entity, Column, Index, ManyToMany } from "typeorm";
import { GenericEntity } from "../../../common/models/genericEntity.model";
import { Role } from "./role.model";


@Entity()
@Index( [ "operation", "feature" ], { unique: true } )
export class Permission extends GenericEntity {
  @Column()
  operation: string;

  @Column()
  feature: string;

  @ManyToMany( type => Role, role => role.permissions )
  roles: Role[];
}
