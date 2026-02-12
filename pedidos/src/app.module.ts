import { Module } from '@nestjs/common';
import { SystemController } from './system/system.controller';
import { OrdersModule } from './orders/orders.module';

@Module({
  imports: [OrdersModule],
  controllers: [SystemController],
})
export class AppModule {}
