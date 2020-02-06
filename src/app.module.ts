import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { LogModule } from './logs/log.module';
import { AdminPanelModule } from './adminPanel/pannel.module';
import { ServicesModule } from './services/services.module';

@Module( {
  imports: [ AuthModule, AdminPanelModule, LogModule, ServicesModule ],
  controllers: [],
  providers: [],
} )
export class AppModule { }
