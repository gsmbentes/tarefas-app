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

## Android Studio / APK

O projeto Android fica na pasta `android/` e usa Capacitor para empacotar o frontend Angular.
Com Android Studio e o Android SDK instalados:

```powershell
npm run android:sync
npm run android:open
```

No Android Studio, aguarde a sincronização do Gradle e use **Build > Build APK(s)**. O APK de depuração fica em `android/app/build/outputs/apk/debug/app-debug.apk`.

O build aponta para a API Django no computador pela URL `http://10.0.2.2:8000/api`, endereço especial do emulador Android Studio. Para permitir essa conexão no Django, inicie o servidor com:

```powershell
$env:DJANGO_ALLOWED_HOSTS = "localhost,127.0.0.1,10.0.2.2"
$env:CORS_ALLOWED_ORIGINS = "http://localhost:4200,http://127.0.0.1:4200,https://localhost"
python manage.py runserver
```

O app e a API precisam estar rodando ao mesmo tempo. Em um celular físico, substitua `10.0.2.2` em `src/environments/environment.production.ts` pelo IP local do computador (por exemplo, `192.168.0.15`) e adicione esse IP aos `DJANGO_ALLOWED_HOSTS`; o telefone e o computador precisam estar na mesma rede Wi-Fi.

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
