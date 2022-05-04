import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  NotFoundException,
} from '@nestjs/common';

import { catchError, Observable } from 'rxjs';

import { NotFoundError } from '../types/NotFoundError';

@Injectable()
export class NotFoundErrorInterceptor implements NestInterceptor {
  intercept(
    _context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> {
    return next.handle().pipe(
      catchError((error: any) => {
        if (error instanceof NotFoundError) {
          throw new NotFoundException(error.message);
        }
        throw error;
      }),
    );
  }
}
