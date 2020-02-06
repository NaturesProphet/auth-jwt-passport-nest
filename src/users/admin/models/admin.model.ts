import { GenericUser } from "../../models/genericUser.model";
import { Entity, ManyToOne, JoinColumn, BeforeInsert, AfterInsert } from "typeorm";
import { Role } from "../../permissions/models/role.model";
import { sendEmailVerification } from "../../../integrations/EMAIL/sendemail.functions";
import { emailEndpoint } from "../../../common/configs/email.conf";
import { apiBaseUrl } from "../../../common/configs/api.conf";

@Entity()
export class Admin extends GenericUser {
  @ManyToOne( type => Role )
  @JoinColumn( { name: 'role_id' } )
  role: Role





  @BeforeInsert()
  generateCode () {
    let code = Math.random() * ( 1000000 - 1000 ) + 1000;
    this.emailVerificationCode = `admin-${code}`;
  }

  @AfterInsert()
  sendEmail () {
    if ( this.status == 'pendent' ) {
      sendEmailVerification( this.email, `${apiBaseUrl}${emailEndpoint}/${this.emailVerificationCode}` );
    }
  }
}
