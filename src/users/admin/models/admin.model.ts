import { GenericUser } from "../../models/genericUser.model";
import { Entity, ManyToOne, JoinColumn } from "typeorm";
import { Role } from "../../permissions/models/role.model";

@Entity()
export class Admin extends GenericUser {
  @ManyToOne( type => Role )
  @JoinColumn( { name: 'role_id' } )
  role: Role
}
