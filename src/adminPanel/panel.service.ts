import { Injectable, Inject, UnprocessableEntityException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { repositoryConfig } from '../common/configs/repository.config';
import { Admin } from '../users/admin/models/admin.model';
import { CreateAdminDto } from '../users/admin/DTOs/createAdmin.dto';
import { Role } from '../users/permissions/models/role.model';
import { Permission } from '../users/permissions/models/permission.model';
import { CreatePermissionDto } from './DTOs/createPermission.dto';
import { CreateRoleDto } from './DTOs/createRole.dto';

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
      this.permissionRepository.save( {
        operation: dto.operation,
        feature: dto.feature
      } );
    }
    catch ( err ) {
      throw new UnprocessableEntityException( err.message );
    }
  }

  async createRole ( req ) {
    let dto: CreateRoleDto = req.body;
    let role = new Role();
    role.name = dto.name;
    let permissions: Permission[];

  }

}
