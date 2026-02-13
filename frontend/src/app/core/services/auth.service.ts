import { Injectable, signal, computed } from '@angular/core';
import { Router } from '@angular/router';
import { AuthUser, MenuItem, Role } from '../models/user.model';

const ALL_MENU_ITEMS: MenuItem[] = [
  { label: 'Dashboard', icon: '📊', route: '/dashboard' },
  { label: 'Usuarios', icon: '👥', route: '/usuarios' },
  { label: 'Pedidos', icon: '📦', route: '/pedidos' },
  { label: 'Pagos', icon: '💳', route: '/pagos' },
  { label: 'API Pública', icon: '🌐', route: '/public-api' },
  { label: 'Configuración', icon: '⚙️', route: '/config' },
];

const CREDENTIALS: Record<string, { password: string; role: Role }> = {
  admin: { password: 'admin123', role: 'admin' },
  user: { password: 'user123', role: 'user' },
};

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly _user = signal<AuthUser | null>(this.loadUser());

  readonly user = this._user.asReadonly();
  readonly isLoggedIn = computed(() => !!this._user());
  readonly role = computed(() => this._user()?.role ?? null);

  readonly menuItems = computed<MenuItem[]>(() => {
    const r = this._user()?.role;
    if (!r) return [];
    if (r === 'admin') return ALL_MENU_ITEMS;
    return ALL_MENU_ITEMS.slice(0, 3);
  });

  constructor(private readonly router: Router) {}

  login(username: string, password: string): string | null {
    const cred = CREDENTIALS[username];
    if (!cred || cred.password !== password) {
      return 'Credenciales inválidas';
    }
    const user: AuthUser = { username, role: cred.role };
    this._user.set(user);
    sessionStorage.setItem('auth_user', JSON.stringify(user));
    return null;
  }

  logout(): void {
    this._user.set(null);
    sessionStorage.removeItem('auth_user');
    this.router.navigate(['/login']);
  }

  hasRole(role: Role): boolean {
    return this._user()?.role === role;
  }

  private loadUser(): AuthUser | null {
    const raw = sessionStorage.getItem('auth_user');
    if (!raw) return null;
    try {
      return JSON.parse(raw) as AuthUser;
    } catch {
      return null;
    }
  }
}
