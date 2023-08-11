import { ForbiddenException, Logger, NotFoundException } from '@nestjs/common';

export function getTimeStampFromTime(date: Date) {
  return new Date(date).getTime() / 1000;
}

export function throwNotFoundException(message: string) {
  throw new NotFoundException(message);
}

export function throwForbiddenException(message: string) {
  throw new ForbiddenException(message);
}

export function uncaughtErrorHandler({ message, stack }: Error): void {
  console.error(`${new Date().toUTCString()} uncaughtException: `, message);
  console.error(stack);
  process.exit(1);
}

export function unhandledRejectionHandler({ message, stack }: Error): void {
  console.error(`${new Date().toUTCString()} uncaughtRejection: `, message);
  console.error(stack);
  process.exit(1);
}

export function processStdinHandler(data: Buffer) {
  Logger.log(data.toString());
  process.stdout.write(data.toString());
}
