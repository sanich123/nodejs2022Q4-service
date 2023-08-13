import { InternalServerErrorException } from '@nestjs/common';
import { LogLevel } from '@nestjs/common/services/logger.service';
import { appendFile } from 'node:fs/promises';

export function getLogLevels(isProduction: boolean): LogLevel[] {
  if (isProduction) {
    return ['log', 'warn', 'error'];
  }
  return ['error', 'warn', 'log', 'verbose', 'debug'];
}

export async function writeLogs(log: string) {
  try {
    await appendFile('logs.log', `${log}\n`);
  } catch (error) {
    throw new InternalServerErrorException('Something wrong with write logs to file');
  }
}
