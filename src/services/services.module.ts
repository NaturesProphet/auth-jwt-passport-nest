import { Module } from '@nestjs/common';
import { DatabaseModule } from '../common/Database/database.module';
import { ServicesController } from './services.controller';
import { ServicesService } from './services.service';
import { ServicesProvider } from './services.provider';


@Module( {
  imports: [ DatabaseModule ],
  controllers: [ ServicesController ],
  providers: [ ServicesService, ...ServicesProvider ],
} )
export class ServicesModule { }
