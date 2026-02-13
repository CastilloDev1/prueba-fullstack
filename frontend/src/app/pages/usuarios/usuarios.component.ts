import { Component, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

interface UserData {
  _id: string;
  name: string;
  email: string;
  role: string;
}

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css',
})
export class UsuariosComponent implements OnInit {
  userId = 'u1';
  user = signal<UserData | null>(null);
  loading = signal(false);
  error = signal<string | null>(null);

  constructor(private readonly http: HttpClient) {}

  ngOnInit(): void {
    this.search();
  }

  search(): void {
    if (!this.userId.trim()) return;
    this.loading.set(true);
    this.error.set(null);
    this.user.set(null);

    this.http.get<UserData>(`${environment.usuariosApi}/users/${this.userId.trim()}`).subscribe({
      next: (data) => {
        this.user.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set(err.status === 404 ? 'Usuario no encontrado' : 'Error al consultar el servicio');
        this.loading.set(false);
      },
    });
  }
}
