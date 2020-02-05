import { Injectable, UnprocessableEntityException, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { repositoryConfig } from '../common/configs/repository.config';
import { paginate } from 'nestjs-typeorm-paginate';
import { Log } from './models/log.model';
import { GetLogsDto } from './DTOs/getLogs.dto';
import { apiBaseUrl } from '../common/configs/api.conf';

@Injectable()
export class LogService {
  constructor(
    @Inject( repositoryConfig.logs )
    private readonly logRepository: Repository<Log>,
  ) { }

  async getAll ( req: any, query: GetLogsDto ) {

    let limit = query.limit ? +query.limit : 5;
    let page = query.page ? +query.page : 1
    let endpoint = apiBaseUrl + req._parsedUrl.pathname;

    try {
      const queryBuilder = this.logRepository.createQueryBuilder( 'log' );
      queryBuilder.orderBy( "log.id", "DESC" );

      if ( query.accountType ) {
        queryBuilder.andWhere( 'log.accountType = :data', { data: query.accountType } );
      }
      if ( query.userId ) {
        queryBuilder.andWhere( 'log.userId = :data1', { data1: query.userId } );
      }
      if ( query.afterDate ) {
        queryBuilder.andWhere( 'log.createdAt > :data2', { data2: query.afterDate } );
      }
      if ( query.beforeDate ) {
        queryBuilder.andWhere( 'log.createdAt < :data3', { data3: query.beforeDate } );
      }
      if ( query.endpoint ) {
        queryBuilder.andWhere( 'log.endpoint = :data4', { data4: query.endpoint } );
      }
      if ( query.ip ) {
        queryBuilder.andWhere( 'log.ip = :data5', { data5: query.ip } );
      }
      if ( query.method ) {
        queryBuilder.andWhere( 'log.method = :data6', { data6: query.method } );
      }
      if ( query.response ) {
        queryBuilder.andWhere( 'log.response = :data7', { data7: query.response } );
      }
      if ( query.userAgent ) {
        queryBuilder.andWhere( 'log.userAgent = :data8', { data8: query.userAgent } );
      }

      let results = await paginate<Log>( queryBuilder, { page: page, limit: limit, route: endpoint } );
      return results;
    } catch ( err ) {
      throw new UnprocessableEntityException( err.message );
    }
  }

}