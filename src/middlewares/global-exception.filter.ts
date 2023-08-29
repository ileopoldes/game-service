import {
  Catch,
  HttpException,
  ExceptionFilter,
  ArgumentsHost,
} from '@nestjs/common';
import { AbstractHttpAdapter, HttpAdapterHost } from '@nestjs/core';
import {
  PrismaClientRustPanicError,
  PrismaClientValidationError,
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
  PrismaClientInitializationError,
} from '@prisma/client/runtime/library';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  private httpAdapter: AbstractHttpAdapter;

  constructor(adapterHost: HttpAdapterHost) {
    this.httpAdapter = adapterHost.httpAdapter;
  }

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    let statusCode = 500;
    let errorMessage = 'Internal Server Error';

    if (exception instanceof HttpException) {
      statusCode = exception.getStatus();
      errorMessage = exception.getResponse() as string;
    } else if (
      exception instanceof PrismaClientKnownRequestError ||
      exception instanceof PrismaClientRustPanicError ||
      exception instanceof PrismaClientValidationError ||
      exception instanceof PrismaClientKnownRequestError ||
      exception instanceof PrismaClientUnknownRequestError ||
      exception instanceof PrismaClientInitializationError
    ) {
      statusCode = 400;
      errorMessage = 'Bad Request';
    }

    this.httpAdapter.reply(response, { message: errorMessage }, statusCode);
  }
}
