# TarefasApp

Aplicação de lista de tarefas com frontend Angular e API Django REST Framework.

## Frontend

```powershell
npm install
npm start
```

O frontend de desenvolvimento usa a API em `http://127.0.0.1:8000/api`. Esse valor fica em `src/environments/environment.development.ts`.

## Backend

```powershell
cd backend-tarefas
python -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

O CORS de desenvolvimento permite `http://localhost:4200` e `http://127.0.0.1:4200`. Para mudar essa lista, defina `CORS_ALLOWED_ORIGINS` como uma lista de origens separadas por vírgula.

## Configuração para produção

Antes de publicar, defina `DJANGO_DEBUG=False`, `DJANGO_SECRET_KEY`, `DJANGO_ALLOWED_HOSTS` e `CORS_ALLOWED_ORIGINS` no ambiente do servidor. `DJANGO_ALLOWED_HOSTS` e `CORS_ALLOWED_ORIGINS` aceitam valores separados por vírgula. O backend encerra a inicialização se `DJANGO_DEBUG` estiver desativado e `DJANGO_SECRET_KEY` não estiver definida.

O build de produção usa `/api` como endereço da API, então o servidor web deve encaminhar esse caminho ao Django. Se a API for hospedada em outro domínio, atualize `apiBaseUrl` em `src/environments/environment.production.ts` antes do build.

## Testes

```powershell
npm test
cd backend-tarefas
python manage.py test
```
