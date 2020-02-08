import { Module } from '@nestjs/common';
import { Synchroniser } from './synchroniser';
import ApiVisitService from './api/visit-service';
import APIService from './api/api-service';
import AccessTokenStorage from './api/access-token-storage';

@Module({
  imports: [],
  controllers: [],
  providers: [AccessTokenStorage, APIService, ApiVisitService, Synchroniser],
})
export class AppModule {}
