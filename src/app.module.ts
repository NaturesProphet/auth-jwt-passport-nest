import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { LogModule } from './logs/log.module';
import { AdminPanelModule } from './adminPanel/pannel.module';

@Module( {
  imports: [ AuthModule, AdminPanelModule, LogModule ],
  controllers: [],
  providers: [],
} )
export class AppModule { }
