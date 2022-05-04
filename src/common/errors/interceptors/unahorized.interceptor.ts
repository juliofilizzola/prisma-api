import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  UnauthorizedException,
} from '@nestjs/common';

import { catchError, Observable } from 'rxjs';

import { UnauthorizedError } from '../types/UnauthorizedError';

@Injectable()
export class UnauthorizedInterceptor implements NestInterceptor {
  intercept(
    _context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> {
    return next.handle().pipe(
      catchError((error: any) => {
        if (error instanceof UnauthorizedError) {
          throw new UnauthorizedException(error.message);
        }
        throw error;
      }),
    );
  }
}
