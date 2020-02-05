import { Connection } from 'typeorm';
import { repositoryConfig } from '../common/configs/repository.config';
import { Log } from './models/log.model';

export const LogProvider = [
  {
    provide: repositoryConfig.logs,
    useFactory: ( connection: Connection ) => connection.getRepository( Log ),
    inject: [ repositoryConfig.database ],
  },
];
