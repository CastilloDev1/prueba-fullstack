import { Component, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
}

interface Todo {
  id: number;
  userId: number;
  title: string;
  completed: boolean;
}

@Component({
  selector: 'app-public-api',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './public-api.component.html',
  styleUrl: './public-api.component.css',
})
export class PublicApiComponent implements OnInit {
  activeTab = signal<'posts' | 'todos'>('posts');
  posts = signal<Post[]>([]);
  todos = signal<Todo[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);

  constructor(private readonly http: HttpClient) {}

  ngOnInit(): void {
    this.loadPosts();
  }

  switchTab(tab: 'posts' | 'todos'): void {
    this.activeTab.set(tab);
    if (tab === 'posts' && this.posts().length === 0) {
      this.loadPosts();
    } else if (tab === 'todos' && this.todos().length === 0) {
      this.loadTodos();
    }
  }

  private loadPosts(): void {
    this.loading.set(true);
    this.error.set(null);
    this.http.get<Post[]>(`${environment.publicApi}/posts?_limit=12`).subscribe({
      next: (data) => {
        this.posts.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Error al cargar posts');
        this.loading.set(false);
      },
    });
  }

  private loadTodos(): void {
    this.loading.set(true);
    this.error.set(null);
    this.http.get<Todo[]>(`${environment.publicApi}/todos?_limit=20`).subscribe({
      next: (data) => {
        this.todos.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Error al cargar todos');
        this.loading.set(false);
      },
    });
  }
}
