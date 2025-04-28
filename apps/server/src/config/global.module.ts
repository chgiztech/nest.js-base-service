import { Global, Module } from '@nestjs/common';
import { AppConfig } from './global.config';

@Global()
@Module({
  providers: [AppConfig],
  exports: [AppConfig],
})
export class AppConfigModule {}
