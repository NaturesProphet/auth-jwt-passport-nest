import { Injectable, Inject, UnprocessableEntityException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { repositoryConfig } from '../common/configs/repository.config';
import { Admin } from '../users/admin/models/admin.model';
import { CreateAdminDto } from '../users/admin/DTOs/createAdmin.dto';
import { Role } from '../users/permissions/models/role.model';
import { Permission } from '../users/permissions/models/permission.model';
import { CreatePermissionDto } from './DTOs/createPermission.dto';
import { CreateRoleDto } from './DTOs/createRole.dto';
import { checkEntityAlreadExist, permissionFilter } from '../common/utils.util';
import { apiBaseUrl } from '../common/configs/api.conf';
import { paginate } from 'nestjs-typeorm-paginate';
import { ListPermissionsQuery } from './DTOs/listPermissions.query';
import { ListRolesQuery } from './DTOs/listRoles.query';
import { EditPermissionsFromRole } from './DTOs/addPermission.dto';

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
    permissionFilter( req, 'create', 'adminAccount' );
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
    permissionFilter( req, 'create', 'permission' );
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
    permissionFilter( req, 'create', 'role' );
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

  async listPermissions ( req, query: ListPermissionsQuery ) {
    permissionFilter( req, 'list', 'permission' );
    let limit = query.limit ? +query.limit : 5;
    let page = query.page ? +query.page : 1
    let endpoint = apiBaseUrl + req._parsedUrl.pathname;
    try {
      let qb = this.permissionRepository.createQueryBuilder( 'p' )
        .where( '1=1' )
        .orderBy( 'p.feature' );
      if ( query.id ) {
        qb.andWhere( 'p.id = :id', { id: query.id } );
      }
      if ( query.feature ) {
        qb.andWhere( 'p.feature = :feature', { feature: query.feature } );
      }
      if ( query.operation ) {
        qb.andWhere( 'p.operation = :operation', { operation: query.operation } );
      }
      return await paginate<Permission>( qb, { page: page, limit: limit, route: endpoint } );
    } catch ( err ) {
      throw new UnprocessableEntityException( err.message );
    }
  }

  async listRoles ( req, query: ListRolesQuery ) {
    permissionFilter( req, 'list', 'role' );
    let limit = query.limit ? +query.limit : 5;
    let page = query.page ? +query.page : 1
    let endpoint = apiBaseUrl + req._parsedUrl.pathname;
    try {
      let qb = this.roleRepository.createQueryBuilder( 'r' )
        .leftJoinAndSelect( 'r.permissions', 'permissions' )
        .where( '1=1' )
        .orderBy( 'permissions.feature' );
      if ( query.id ) {
        qb.andWhere( 'r.id = :id', { id: query.id } );
      }
      if ( query.name ) {
        qb.andWhere( 'r.name = :name', { name: query.name } );
      }
      return await paginate<Role>( qb, { page: page, limit: limit, route: endpoint } );
    } catch ( err ) {
      throw new UnprocessableEntityException( err.message );
    }
  }

  async addPermissionsToRole ( req ) {
    permissionFilter( req, 'edit', 'role' );
    let dto: EditPermissionsFromRole = req.body;

    let role: Role;
    let permissions: Permission[];

    try {
      role = await this.roleRepository.createQueryBuilder( 'r' )
        .leftJoinAndSelect( 'r.permissions', 'permissions' )
        .where( 'r.id = :id', { id: dto.role } )
        .getOne();
    } catch ( err ) {
      throw new UnprocessableEntityException( `Erro ao buscar dados de roles. ${err.message}` );
    }
    if ( !role ) {
      throw new UnprocessableEntityException( `Role ${dto.role} não encontrada` );
    }

    try {
      permissions = await this.permissionRepository.createQueryBuilder( 'p' )
        .where( `p.id IN (${dto.permissions})` )
        .orderBy( 'p.id', 'DESC' )
        .getMany();
    } catch ( err ) {
      throw new UnprocessableEntityException( `Erro ao buscar dados de permissions. ${err.message}` );
    }
    if ( !permissions || permissions.length == 0 ) {
      throw new UnprocessableEntityException( `Permissões não encontradas` );
    }
    if ( permissions.length != dto.permissions.length ) {
      throw new UnprocessableEntityException( `Nem todas as permissões foram encontradas.`
        + `(Encontrado um total de ${permissions.length} de ${dto.permissions.length}). `
        + `Confira a lista de permissões que você enviou` );
    }


    for ( let i = 0; i < permissions.length; i++ ) {
      for ( let z = 0; z < role.permissions.length; z++ ) {
        if ( role.permissions[ z ].id == permissions[ i ].id ) {
          throw new UnprocessableEntityException( `A permissão ${permissions[ i ].id} `
            + `já faz parte da role ${role.id}` );
        }
      }
      role.permissions.push( permissions[ i ] );
    }


    try {
      return await this.roleRepository.save( role );
    } catch ( err ) {
      throw new UnprocessableEntityException( `Erro ao salvar a role. ${err.message}` );
    }
  }



  async removePermissionsToRole ( req ) {
    permissionFilter( req, 'edit', 'role' );
    let dto: EditPermissionsFromRole = req.body;

    let role: Role;
    let permissions: Permission[];

    try {
      role = await this.roleRepository.createQueryBuilder( 'r' )
        .leftJoinAndSelect( 'r.permissions', 'permissions' )
        .where( 'r.id = :id', { id: dto.role } )
        .getOne();
    } catch ( err ) {
      throw new UnprocessableEntityException( `Erro ao buscar dados de roles. ${err.message}` );
    }
    if ( !role ) {
      throw new UnprocessableEntityException( `Role ${dto.role} não encontrada` );
    }

    try {
      permissions = await this.permissionRepository.createQueryBuilder( 'p' )
        .where( `p.id IN (${dto.permissions})` )
        .orderBy( 'p.id', 'DESC' )
        .getMany();
    } catch ( err ) {
      throw new UnprocessableEntityException( `Erro ao buscar dados de permissions. ${err.message}` );
    }
    if ( !permissions || permissions.length == 0 ) {
      throw new UnprocessableEntityException( `Permissões não encontradas` );
    }
    if ( permissions.length != dto.permissions.length ) {
      throw new UnprocessableEntityException( `Nem todas as permissões foram encontradas.`
        + `(Encontrado um total de ${permissions.length} de ${dto.permissions.length}). `
        + `Confira a lista de permissões que você enviou` );
    }



    for ( let i = 0; i < permissions.length; i++ ) {
      let permissionId = permissions[ i ].id;
      let isIn = false;

      for ( let z = 0; z < role.permissions.length; z++ ) {
        if ( role.permissions[ z ].id == permissionId ) {
          isIn = true;
          role.permissions[ z ] = null;
          break;
        }
      }
      if ( isIn == false ) {
        throw new UnprocessableEntityException( `A permissão ${permissionId} não `
          + `foi encontrada na role ${dto.role}` );
      }
    }

    try {
      return await this.roleRepository.save( role );
    } catch ( err ) {
      throw new UnprocessableEntityException( `Erro ao salvar a role. ${err.message}` );
    }
  }


}
