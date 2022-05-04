import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';

import { response as res } from 'express';

@Catch()
export class HttpExceptionFilter<T extends HttpException>
  implements ExceptionFilter
{
  catch(exception: T, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const RES = ctx.getResponse<Response>();
    const REQ = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const exceptionRes = exception.getResponse();

    const error =
      typeof RES === 'string'
        ? { message: exceptionRes }
        : (exceptionRes as object);

    const resultErro = {
      ...error,
      statusCode: status,
      date: new Date().toISOString(),
      path: REQ.url,
    };

    res.status(status).json(resultErro);
  }
}
