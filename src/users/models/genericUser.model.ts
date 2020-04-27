import {
  PrimaryGeneratedColumn, CreateDateColumn,
  UpdateDateColumn, Column, Index, BeforeInsert
} from "typeorm";
import * as bcrypt from 'bcryptjs';
import { enumUserStatus } from "../enums/userStatus.enum";
import { CreateGenericUserDto } from "../DTOs/createGenericUser.dto";

export class GenericUser {

  @BeforeInsert()
  padronize () {
    this.email = this.email.toLowerCase();
  }

  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn( { type: 'timestamp with time zone' } )
  createdAt: Date;

  @UpdateDateColumn( { type: 'timestamp with time zone' } )
  updatedAt: Date;

  @Column()
  name: string;

  @Column( { name: 'playerId', default: 'UNKNOWN PLAYER ID' } )
  playerId: string;

  @Column( { type: 'date' } )
  birthDay: Date;

  @Column()
  @Index( { unique: true } )
  email: string;

  @Column()
  @Index( { unique: true } )
  cpf: string;

  @Column()
  @Index( { unique: true } )
  phone: string;

  @Column( { select: false } )
  private passwordHash: string;

  @Column( {
    type: "enum",
    enum: enumUserStatus,
    default: 'pendent'
  } )
  status: string;

  @Column( { nullable: true } )
  profilePicturePath: string;

  @Column( { nullable: true, select: false } )
  emailVerificationCode: string;

  // usado pelo mecanismo de autenticação
  accountType: string;

  setPassword ( password: string ) {
    this.passwordHash = bcrypt.hashSync( password );
  }

  getPasswordHash () {
    return this.passwordHash;
  }

  setUp ( dto: CreateGenericUserDto ) {
    this.name = dto.name;
    this.cpf = dto.cpf;
    this.birthDay = dto.birthDay;
    this.email = dto.email;
    this.phone = dto.phone;
    this.setPassword( dto.password );
    this.setStatus( 'pendent' );
    return this;
  }

  setStatus ( status: 'pendent' | 'active' | 'deleted' | 'suspended' ) {
    this.status = status;
  }

  getStatus () {
    return this.status;
  }

}
