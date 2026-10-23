import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface TarefaApi {
  id: number;
  texto: string;
  concluida: boolean;
  na_lixeira: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class TarefasApiService {
  private readonly apiUrl = 'http://127.0.0.1:8000/api/tarefas/';
  private readonly http = inject(HttpClient);

  listar() {
    return this.http.get<TarefaApi[]>(this.apiUrl);
  }
  criar(texto: string) {
  return this.http.post<TarefaApi>(this.apiUrl, {
    texto,
    concluida: false,
  });
  }
  atualizar(id: number, dados: Partial<TarefaApi>) {
  return this.http.patch<TarefaApi>(
    `${this.apiUrl}${id}/`,
    dados
  );
  }
  excluir(id: number) {
  return this.http.delete<void>(`${this.apiUrl}${id}/`);
 }
 listarLixeira() {
  return this.http.get<TarefaApi[]>(`${this.apiUrl}lixeira/`);
 }

}