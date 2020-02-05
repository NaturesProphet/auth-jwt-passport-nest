import { Module } from '@nestjs/common';
import { DatabaseModule } from '../common/Database/database.module';
import { LogService } from './log.service';
import { LogProvider } from './log.provider';
import { Log } from './models/log.model';
import { LogController } from './log.controller';


@Module( {
  imports: [ DatabaseModule ],
  controllers: [ LogController ],
  providers: [ LogService, ...LogProvider, Log ],
  exports: [ LogService ],
} )
export class LogModule { }
