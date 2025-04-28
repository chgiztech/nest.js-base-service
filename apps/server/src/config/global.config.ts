import { IsNumber, IsString } from 'class-validator';
import { ConfigFragment, EnvValue } from '@utils';

export class AppConfig extends ConfigFragment {
  @IsString()
  @EnvValue()
  public readonly APP_ENV: string;

  @IsNumber()
  @EnvValue({ defaultValue: 3000 })
  public readonly APP_PORT: number;

  @IsString()
  @EnvValue({ defaultValue: 'api' })
  public readonly APP_PREFIX: string;

  @IsString()
  @EnvValue({
    transform: (raw) => (raw ? String(raw).replace(/\\n/g, '\n') : ''),
  })
  public readonly JWT_PUBLIC: string;

  @IsString()
  @EnvValue({
    transform: (raw) => (raw ? String(raw).replace(/\\n/g, '\n') : ''),
  })
  public readonly JWT_PRIVATE: string;

  @IsString()
  @EnvValue()
  public readonly JWT_REFRESH_SECRET: string;

  get isProd() {
    return this.APP_ENV === 'prod' ? true : false;
  }
}
