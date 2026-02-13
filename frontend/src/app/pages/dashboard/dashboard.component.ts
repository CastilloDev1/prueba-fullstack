import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  greeting = signal('');

  constructor(protected readonly auth: AuthService) {}

  ngOnInit(): void {
    const hour = new Date().getHours();
    const saludo =
      hour < 12 ? 'Buenos días' : hour < 18 ? 'Buenas tardes' : 'Buenas noches';
    this.greeting.set(`${saludo}, ${this.auth.user()?.username}`);
  }
}
