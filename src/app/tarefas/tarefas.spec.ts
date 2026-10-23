import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Tarefas } from './tarefas';
import { TarefasApiService } from './tarefas-api.service';

describe('Tarefas', () => {
  let component: Tarefas;
  let fixture: ComponentFixture<Tarefas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Tarefas],
      providers: [{ provide: TarefasApiService, useValue: { listar: () => of([]) } }],
    }).compileComponents();

    fixture = TestBed.createComponent(Tarefas);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
