import { Injectable } from '@nestjs/common';

interface IData {
  name: string;
  email: string;
  admin: boolean;
}

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
  postHello(data: IData): IData {
    return data;
  }
}
