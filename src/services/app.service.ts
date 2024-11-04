import { Injectable } from '@nestjs/common';

const messages = ['Hello World!', 'Hello NestJS!'];

@Injectable()
export class AppService {
  getMessages(): string[] {
    return messages;
  }

  getMessage(id: number): string {
    return messages[id];
  }
}
