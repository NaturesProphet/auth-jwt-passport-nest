import { Injectable, Inject, UnprocessableEntityException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { repositoryConfig } from '../common/configs/repository.config';
import { Admin } from '../users/admin/models/admin.model';
import { CreateAdminDto } from '../users/admin/DTOs/createAdmin.dto';
import { Role } from '../users/permissions/models/role.model';
import { Permission } from '../users/permissions/models/permission.model';
import { CreatePermissionDto } from './DTOs/createPermission.dto';
import { CreateRoleDto } from './DTOs/createRole.dto';
import { checkEntityAlreadExist } from '../common/utils.util';

@Injectable()
export class AdminPanelService {
  constructor(
    @Inject( repositoryConfig.admin )
    private readonly adminRepository: Repository<Admin>,
    @Inject( repositoryConfig.role )
    private readonly roleRepository: Repository<Role>,
    @Inject( repositoryConfig.permission )
    private readonly permissionRepository: Repository<Permission>,
  ) { }

  async createAdmin ( req ) {
    let dto: CreateAdminDto = req.body;
    let admin: Admin = new Admin();
    admin.setUp( dto );
    try {
      admin.role = await this.roleRepository.findOne( { id: dto.roleId } );
    } catch ( err ) {
      throw new UnprocessableEntityException( `Erro ao buscar dados da Role. ${err.message}` );
    }
    if ( !admin.role ) {
      throw new UnprocessableEntityException( `Role ${dto.roleId} não encontrada` );
    }
    try {
      return await this.adminRepository.save( admin );
    } catch ( err ) {
      throw new UnprocessableEntityException( `Erro ao salvar usuário. ${err.mesage}` );
    }
  }

  async createPermission ( req ) {
    let dto: CreatePermissionDto = req.body;
    try {
      return await this.permissionRepository.save( {
        operation: dto.operation,
        feature: dto.feature
      } );
    }
    catch ( err ) {
      checkEntityAlreadExist( err.message );
      throw new UnprocessableEntityException( err.message );
    }
  }

  async createRole ( req ) {
    let dto: CreateRoleDto = req.body;
    let role = new Role();
    role.name = dto.name;
    role.description = dto.description;
    role.permissions = new Array();

    // busca as permissões
    for ( let i = 0; i < dto.permissions.length; i++ ) {
      let permission: Permission = null;
      try {
        permission = await this.permissionRepository.findOne( { id: dto.permissions[ i ] } );
      }
      catch ( err ) {
        console.log( err )
        throw new UnprocessableEntityException( `Erro ao buscar permissões. ${err.message}` );
      }
      if ( !permission ) {
        throw new UnprocessableEntityException( `Permissão ${dto.permissions[ i ]} não encontrada` );
      }
      role.permissions.push( permission );
    }

    try {
      return await this.roleRepository.save( role );
    } catch ( err ) {
      checkEntityAlreadExist( err.message );
      throw new UnprocessableEntityException( `Erro ao salvar a role. ${err.message}` );
    }
  }

}
