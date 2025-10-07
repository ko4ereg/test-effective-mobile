# test-effective-mobile
тестовое

 

# Технологии
Node.js (v18+)
Express
TypeScript
PostgreSQL
TypeORM
JWT  
bcrypt  

# Установка и запуск
1. Клонировать репозиторий
git clone https://github.com/ko4ereg/test-effective-mobile.git
cd test-effective-mobile

2. Установить зависимости
npm install

3. Настроить переменные окружения

Создать файл .env в корне проекта и добавить:

PORT=4000
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_DATABASE=user_service
JWT_SECRET=secret-key
JWT_EXPIRES_IN=1h
BCRYPT_SALT_ROUNDS=10
NODE_ENV=development


4. Настроить базу данных PostgreSQL

В PostgreSQL создать новую базу:

CREATE DATABASE users_db;

5. Запуск в режиме разработки

Скомпилируй и запусти проект:

npm run dev

(используется ts-node-dev для автоматического перезапуска при изменениях)

6. Проверка сервера

После запуска в консоли появится сообщение:

Server started on port 4000

Проверь:

http://localhost:4000/health

Ответ:

{ "ok": true }

# Основные эндпойнты
POST	/auth/register	        Регистрация нового пользователя	 
POST	/auth/login	            Авторизация (получение JWT токена)	 
GET	/users/:id	                Получение данных пользователя по ID	(Только сам пользователь или админ)
GET	/users	                    Получение списка всех пользователей	(Только админ)
PATCH	/users/:id/status	    Изменение статуса пользователя	(Только сам пользователь или админ)
GET	/health	                    Проверка работоспособности сервера	 