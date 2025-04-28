import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger('HTTP');

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now();

    const request = context.switchToHttp().getRequest();
    const method = request.method;
    const url = request.originalUrl;

    this.logger.log(
      `[START] ${method} ${url} at ${new Date(now).toISOString()}`,
    );

    return next.handle().pipe(
      tap(() => {
        const duration = Date.now() - now;
        this.logger.log(`[END] ${method} ${url} - ${duration}ms`);
      }),
    );
  }
}
