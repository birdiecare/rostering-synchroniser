import { Module } from '@nestjs/common';
import { Synchroniser } from './synchroniser';
import { ApiModule } from './api/module';

@Module({
  imports: [ApiModule],
  controllers: [],
  providers: [Synchroniser],
})
export class AppModule {}
