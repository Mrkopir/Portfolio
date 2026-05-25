import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import {Throttle} from "@nestjs/throttler";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Throttle({ default: { ttl: 60000, limit: 3, blockDuration: 20000 } })
  @Get('health')
  getHealth() {
    return this.appService.getHealth();
  }
}
