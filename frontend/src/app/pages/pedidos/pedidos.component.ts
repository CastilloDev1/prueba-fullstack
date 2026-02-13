import { Component, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

interface OrderData {
  id: string;
  userId: string;
  total: number;
  currency: string;
  user: {
    _id: string;
    name: string;
    email: string;
    role: string;
  };
}

@Component({
  selector: 'app-pedidos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './pedidos.component.html',
  styleUrl: './pedidos.component.css',
})
export class PedidosComponent implements OnInit {
  orderId = 'ord-001';
  order = signal<OrderData | null>(null);
  loading = signal(false);
  error = signal<string | null>(null);

  constructor(private readonly http: HttpClient) {}

  ngOnInit(): void {
    this.search();
  }

  search(): void {
    if (!this.orderId.trim()) return;
    this.loading.set(true);
    this.error.set(null);
    this.order.set(null);

    this.http.get<OrderData>(`${environment.pedidosApi}/orders/${this.orderId.trim()}`).subscribe({
      next: (data) => {
        this.order.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set(err.status === 404 ? 'Pedido no encontrado' : 'Error al consultar el servicio');
        this.loading.set(false);
      },
    });
  }
}
