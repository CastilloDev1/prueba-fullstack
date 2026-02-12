import { Controller, Get } from '@nestjs/common';

@Controller()
export class SystemController {

  @Get('health')
  health() {
    return { status: 'ok' };
  }

  @Get('status')
  status() {
    return {
      service: 'pagos',
      version: '1.0.0',
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
    };
  }
}
