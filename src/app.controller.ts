import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

/**
 * Controllers are responsible for handling incoming requests
 * and returning responses to the client.
 */
@Controller() // <- This is a Decorator, Decorators associate classes with required metadata
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getHello() {
    return this.appService.getHello();
  }
}
