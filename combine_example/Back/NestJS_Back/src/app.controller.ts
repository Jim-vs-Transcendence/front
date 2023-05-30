import { Controller, Get, Redirect } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  hello(){
    return 'Hello World!';
  }
  // @Redirect('http://localhost:8080', 301)
  // redirect() {}
}
