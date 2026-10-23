import { Component, signal } from '@angular/core';
import { Tarefas } from './tarefas/tarefas';

@Component({
  imports: [Tarefas],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('tarefas-app');
}
