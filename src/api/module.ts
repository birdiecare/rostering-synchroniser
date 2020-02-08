import { Module } from '@nestjs/common';
import ApiVisitService from './visit-service';
import AccessTokenStorage from './access-token-storage';
import APIService from './api-service';

@Module({
  imports: [],
  controllers: [],
  providers: [AccessTokenStorage, APIService, ApiVisitService],
  exports: [ApiVisitService]
})
export class ApiModule {}
