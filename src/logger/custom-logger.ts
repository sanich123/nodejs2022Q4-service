import { LoggerService } from '@nestjs/common';

export class MyLogger implements LoggerService {
  log(message: any, ...optionalParams: any[]) {
    console.log(message, ...optionalParams);
  }
  error(message: any, ...optionalParams: any[]) {
    console.log(message, ...optionalParams);
  }
  warn(message: any, ...optionalParams: any[]) {
    console.log(message, ...optionalParams);
  }
  debug?(message: any, ...optionalParams: any[]) {
    console.log(message, ...optionalParams);
  }
  verbose?(message: any, ...optionalParams: any[]) {
    console.log(message, ...optionalParams);
  }
}
