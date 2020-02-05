import { Connection } from 'typeorm';
import { repositoryConfig } from '../common/configs/repository.config';
import { Admin } from '../users/admin/models/admin.model';
import { Role } from '../users/permissions/models/role.model';
import { Permission } from '../users/permissions/models/permission.model';

export const AdminPanelProviders = [
  {
    provide: repositoryConfig.admin,
    useFactory: ( connection: Connection ) => connection.getRepository( Admin ),
    inject: [ repositoryConfig.database ],
  },
  {
    provide: repositoryConfig.role,
    useFactory: ( connection: Connection ) => connection.getRepository( Role ),
    inject: [ repositoryConfig.database ],
  },
  {
    provide: repositoryConfig.permission,
    useFactory: ( connection: Connection ) => connection.getRepository( Permission ),
    inject: [ repositoryConfig.database ],
  },
];
