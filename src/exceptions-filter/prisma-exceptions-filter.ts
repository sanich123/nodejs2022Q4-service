import { HttpException, HttpStatus } from '@nestjs/common';

export class PrismaException extends HttpException {
  constructor(message: string, code?: string) {
    super(
      `Error in a database: ${message}`,
      code === 'P2025' ? HttpStatus.NOT_FOUND : HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
