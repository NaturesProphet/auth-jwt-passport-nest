import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { LogModule } from './logs/log.module';
import { AdminPanelModule } from './adminPanel/pannel.module';

@Module( {
  imports: [ AuthModule, AdminPanelModule, UsersModule, LogModule ],
  controllers: [],
  providers: [],
} )
export class AppModule { }
