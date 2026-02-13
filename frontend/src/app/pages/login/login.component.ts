import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { ThemeService } from '../../core/services/theme.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  username = '';
  password = '';
  error = signal<string | null>(null);
  submitted = signal(false);

  constructor(
    private readonly auth: AuthService,
    private readonly router: Router,
    protected readonly theme: ThemeService,
  ) {}

  get usernameInvalid(): boolean {
    return this.submitted() && !this.username.trim();
  }

  get passwordInvalid(): boolean {
    return this.submitted() && !this.password.trim();
  }

  onSubmit(): void {
    this.submitted.set(true);
    this.error.set(null);

    if (!this.username.trim() || !this.password.trim()) {
      return;
    }

    const err = this.auth.login(this.username.trim(), this.password.trim());
    if (err) {
      this.error.set(err);
    } else {
      this.router.navigate(['/dashboard']);
    }
  }
}
