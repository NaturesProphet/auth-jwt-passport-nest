import { Module } from '@nestjs/common';
import { AdminPanelProviders } from './pannel.provider';
import { AdminPanelController } from './panel.controller';
import { AdminPanelService } from './panel.service';
import { DatabaseModule } from '../common/Database/database.module';

@Module( {
  imports: [ DatabaseModule ],
  providers: [ AdminPanelService, ...AdminPanelProviders ],
  controllers: [ AdminPanelController ],
} )
export class AdminPanelModule { }
