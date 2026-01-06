import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map } from 'rxjs/operators';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler) {
    return next.handle().pipe(
      map((response) => {
        // kalau controller sudah return format custom
        if (
          response?.success !== undefined &&
          response?.data !== undefined
        ) {
          return response;
        }

        return {
          success: true,
          message: response?.message || 'Request successful',
          data: response?.data ?? response,
        };
      }),
    );
  }
}
