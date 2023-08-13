import { HttpException, HttpStatus } from '@nestjs/common';

const { INTERNAL_SERVER_ERROR, NOT_FOUND } = HttpStatus;

export class PrismaException extends HttpException {
  constructor(message: string, code?: string) {
    super(`Error in a database: ${message}`, code === 'P2025' ? NOT_FOUND : INTERNAL_SERVER_ERROR);
  }
}
