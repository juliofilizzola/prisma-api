import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  UnauthorizedException,
} from '@nestjs/common';

import { catchError, Observable } from 'rxjs';

import { DatabaseError } from '../types/DatabaseError';

@Injectable()
export class DatabaseInterceptor implements NestInterceptor {
  intercept(
    _context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> {
    return next.handle().pipe(
      catchError((error: any) => {
        if (error instanceof DatabaseError) {
          throw new UnauthorizedException(error.message);
        }
        throw error;
      }),
    );
  }
}
