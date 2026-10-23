import { Component, inject, OnInit } from '@angular/core';
import { TarefaApi, TarefasApiService } from './tarefas-api.service';

@Component({
  imports: [],
  selector: 'app-tarefas',
  styleUrl: './tarefas.css',
  templateUrl: './tarefas.html',
})
export class Tarefas implements OnInit {
  private readonly tarefasApi = inject(TarefasApiService);
  tarefas:TarefaApi[] = [];
  filtro : 'todas'| 'pendentes'| 'concluidas' = 'todas';
  lixeira: TarefaApi[] = [];
  mostrarLixeira = false;

  ngOnInit(): void {
  this.tarefasApi.listar().subscribe({
    next: (tarefas) => {
      this.tarefas = tarefas;
    },
    error: (erro) => {
      console.error('Erro ao carregar tarefas:', erro);
    },
  });
}
  
adicionarTarefa(texto: string): void {
  const textoLimpo = texto.trim();

  if (textoLimpo === '') return;

  this.tarefasApi.criar(textoLimpo).subscribe({
    next: (tarefa) => {
      this.tarefas.push(tarefa);
      this.filtro = 'pendentes';
    },
    error: (erro) => {
      console.error('Erro ao adicionar tarefa:', erro);
    },
  });
}
  excluirTarefa(tarefa: TarefaApi): void {
  this.tarefasApi.atualizar(tarefa.id, {
    na_lixeira: true,
  }).subscribe({
    next: (tarefaNaLixeira) => {
      this.tarefas = this.tarefas.filter(
        item => item.id !== tarefa.id
      );
      this.lixeira.push(tarefaNaLixeira);
    },
    error: (erro) => {
      console.error('Erro ao mover tarefa para a lixeira:', erro);
    },
  });
}
  alternarEstado(tarefa: TarefaApi): void {
  const novoEstado = !tarefa.concluida;

  this.tarefasApi.atualizar(tarefa.id, {
    concluida: novoEstado,
  }).subscribe({
    next: (tarefaAtualizada) => {
      tarefa.concluida = tarefaAtualizada.concluida;
    },
    error: (erro) => {
      console.error('Erro ao atualizar tarefa:', erro);
    },
  });
}
  contadorTarefas():number{
    return this.tarefas.filter((tarefa) => tarefa.concluida).length;
  }
  tarefasVisiveis() {
  if (this.filtro === 'pendentes') {
    return this.tarefas.filter(tarefa => !tarefa.concluida);
  } else if (this.filtro === 'concluidas') {
    return this.tarefas.filter(tarefa => tarefa.concluida);
  } else {
    return this.tarefas; 
  }
  }
  restaurarTarefa(tarefa: TarefaApi): void {
  this.tarefasApi.atualizar(tarefa.id, {
    na_lixeira: false,
  }).subscribe({
    next: (tarefaRestaurada) => {
      this.lixeira = this.lixeira.filter(
        item => item.id !== tarefa.id
      );
      this.tarefas.push(tarefaRestaurada);
    },
    error: (erro) => {
      console.error('Erro ao restaurar tarefa:', erro);
    },
  });
}
  alternarLixeira(): void {
  this.mostrarLixeira = !this.mostrarLixeira;

  if (this.mostrarLixeira) {
    this.tarefasApi.listarLixeira().subscribe({
      next: (tarefas) => {
        this.lixeira = tarefas;
      },
      error: (erro) => {
        console.error('Erro ao carregar a lixeira:', erro);
      },
    });
  }
}
  excluirPermanentemente(tarefa: TarefaApi): void {
  this.tarefasApi.excluir(tarefa.id).subscribe({
    next: () => {
      this.lixeira = this.lixeira.filter(
        item => item.id !== tarefa.id
      );
    },
    error: (erro) => {
      console.error('Erro ao excluir tarefa permanentemente:', erro);
    },
  });
}
}
