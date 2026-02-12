import { Controller, Get, Param } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Controller('orders')
export class OrdersController {
  constructor(private readonly http: HttpService) {}

  @Get(':id')
  async getOrder(@Param('id') id: string) {

    //Pedido dummy
    const order = { id, userId: 'u1', total: 25000, currency: 'COP' };

    const usuariosBase = process.env.USUARIOS_URL || 'http://localhost:3001';
    const user = await firstValueFrom(
      this.http.get(`${usuariosBase}/api/v1/users/${order.userId}`),
    ).then((r) => r.data);

    return { ...order, user };
  }
}
