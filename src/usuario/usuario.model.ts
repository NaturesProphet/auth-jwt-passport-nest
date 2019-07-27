import {
  BaseEntity, Entity, PrimaryGeneratedColumn, CreateDateColumn,
  UpdateDateColumn, Column, Index, OneToMany
} from "typeorm";
import * as bcrypt from 'bcryptjs';
import { enumPerfilUsuario } from "../common/enums/perfilUsuario.enum";

@Entity( { name: "usuario" } )
export class Usuario extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  dataregistro: Date;

  @UpdateDateColumn()
  atualizadoem: Date;

  @Column()
  nome: string;

  @Column()
  @Index( { unique: true } )
  email: string;

  @Column()
  private hash: string;

  @Column( { type: "boolean" } )
  ativo: boolean

  @Column( {
    type: "enum",
    enum: enumPerfilUsuario
  } )
  perfilusuario: enumPerfilUsuario;


  /**
    * Método que criptografa a senha do usuário antes de armazena-la no banco
    * @param pass senha bruta a ser criptografada
  */
  public setPassword ( pass: string ): string {
    this.hash = bcrypt.hashSync( pass );
    return this.hash;
  }

  /**
   * Este método recupera o hash da senha do usuário
  */
  public getHash (): string {
    return this.hash;
  }
}
