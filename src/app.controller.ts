import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

interface IData {
  name: string;
  email: string;
  admin: boolean;
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  async getHello(@Body() data: IData): Promise<IData> {
    const { admin, name, email } = data;
    return this.appService.postHello({ admin, name, email });
  }
}
