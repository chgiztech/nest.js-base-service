import { IsBoolean, IsInt, IsString } from 'class-validator';
import { ConfigFragment, EnvValue } from '@utils';

export class TypeORMConfig extends ConfigFragment {
  @IsString()
  @EnvValue()
  public readonly TYPEORM_HOST: string;

  @IsInt()
  @EnvValue()
  public readonly TYPEORM_PORT: number;

  @IsString()
  @EnvValue()
  public readonly TYPEORM_DATABASE: string;

  @IsString()
  @EnvValue()
  public readonly TYPEORM_USERNAME: string;

  @IsString()
  @EnvValue()
  public readonly TYPEORM_PASSWORD: string;

  @IsBoolean()
  @EnvValue()
  public readonly TYPEORM_LOGGING: boolean;

  @IsBoolean()
  @EnvValue()
  public readonly TYPEORM_SYNCHRONIZE: boolean;

  @IsBoolean()
  @EnvValue<boolean>({ defaultValue: false })
  public readonly TYPEORM_MIGRATION_RUN: boolean;

  get fullConfig() {
    return {
      database: this.TYPEORM_DATABASE,
      username: this.TYPEORM_USERNAME,
      password: this.TYPEORM_PASSWORD,
      host: this.TYPEORM_HOST,
      port: this.TYPEORM_PORT,
      migrationsRun: this.TYPEORM_MIGRATION_RUN,
      synchronize: this.TYPEORM_SYNCHRONIZE,
      logging: this.TYPEORM_LOGGING,
    };
  }
}
