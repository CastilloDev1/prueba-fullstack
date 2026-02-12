import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SystemController } from './system/system.controller';

@Module({
  imports: [],
  controllers: [AppController, SystemController],
  providers: [AppService],
})
export class AppModule {}
