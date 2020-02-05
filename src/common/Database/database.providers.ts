import { createConnection } from 'typeorm';
import * as config from '../configs/database.conf';
import { repositoryConfig } from '../configs/repository.config'
import { Log } from '../../logs/models/log.model';
import { Admin } from '../../users/admin/models/admin.model';
import { Role } from '../../users/permissions/models/role.model';
import { Permission } from '../../users/permissions/models/permission.model';

export const databaseProviders = [
  {
    provide: repositoryConfig.database,
    useFactory: async () =>
      await createConnection( {
        type: 'postgres',
        host: config.db_host,
        port: config.db_port,
        username: config.db_username,
        password: config.db_password,
        database: config.db_schema,
        entities: [
          Log, Admin, Role, Permission
        ],
        synchronize: config.orm_sync,
        dropSchema: config.drop_schema
      } ),
  },
];
