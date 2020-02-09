import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Synchroniser } from './synchroniser';
import { PartnerIntegration } from './integration.implementation';

const run = async () => {
  const app = await NestFactory.createApplicationContext(AppModule, {
    logger: true,
  });
  const synchroniser = app.get(Synchroniser);

  synchroniser.synchronise(new PartnerIntegration());
};

run().then();
