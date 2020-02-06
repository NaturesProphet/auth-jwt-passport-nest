import { Connection } from 'typeorm';
import { repositoryConfig } from '../common/configs/repository.config';
import { Admin } from '../users/admin/models/admin.model';

export const ServicesProvider = [
  {
    provide: repositoryConfig.admin,
    useFactory: ( connection: Connection ) => connection.getRepository( Admin ),
    inject: [ repositoryConfig.database ],
  },
];
