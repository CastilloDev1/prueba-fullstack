import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-pagos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pagos.component.html',
  styleUrl: './pagos.component.css',
})
export class PagosComponent {
  health = signal<string | null>(null);
  loading = signal(false);
  error = signal<string | null>(null);

  constructor(private readonly http: HttpClient) {}

  checkHealth(): void {
    this.loading.set(true);
    this.error.set(null);
    this.health.set(null);

    this.http.get<{ status: string }>(`${environment.pagosApi}/health`).subscribe({
      next: (data) => {
        this.health.set(JSON.stringify(data, null, 2));
        this.loading.set(false);
      },
      error: () => {
        this.error.set('No se pudo conectar al servicio de pagos');
        this.loading.set(false);
      },
    });
  }
}
