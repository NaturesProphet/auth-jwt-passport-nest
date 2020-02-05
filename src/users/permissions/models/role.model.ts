import { Entity, Column, Index, ManyToMany, JoinTable } from "typeorm";
import { Permission } from "./permission.model";
import { GenericEntity } from "../../../common/models/genericEntity.model";

@Entity()
export class Role extends GenericEntity {
  @Column()
  @Index( { unique: true } )
  name: string;

  @Column( { type: "text", nullable: true } )
  description: string;

  @ManyToMany( type => Permission, permission => permission.roles )
  @JoinTable( {
    name: 'roles_permissions',
    joinColumns: [ { name: 'role_id' } ],
    inverseJoinColumns: [ { name: 'permission_id' } ]
  } )
  permissions: Permission[];
}
