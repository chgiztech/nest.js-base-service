import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AppConfigModule } from '../config/global.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './services/auth/auth.module';
import { TypeORMGlobalModule } from '@global';

@Module({
  imports: [
    AppConfigModule,
    TypeORMGlobalModule,
    JwtModule.register({
      global: true,
      publicKey: String(process.env.JWT_PUBLIC).replace(/\\n/g, '\n'),
      privateKey: String(process.env.JWT_PRIVATE).replace(/\\n/g, '\n'),
      signOptions: {
        algorithm: 'RS256',
      },
    }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
