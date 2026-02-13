export type Role = 'admin' | 'user';

export interface AuthUser {
  username: string;
  role: Role;
}

export interface MenuItem {
  label: string;
  icon: string;
  route: string;
}
