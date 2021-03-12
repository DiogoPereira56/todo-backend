import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  loginHello(): string {
    return 'Hello Login!';
  }

}
