# Backend API

Node.js + Express + MSSQL ашиглан хийгдсэн backend API.

## Суулгах

```bash
npm install
```

## Тохиргоо

1. `config.env` файлыг тохируулах:
```env
PORT=3001
DB_SERVER=localhost
DB_DATABASE=login-system
DB_USER=sa
DB_PASSWORD=your-password
DB_PORT=1433
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
NODE_ENV=development
```

2. SQL Server суулгаж, ажиллуулах
3. Database үүсгэх: `login-system`

## Ажиллуулах

### JWT Secret үүсгэх
```bash
npm run generate-secret
```

### Development
```bash
npm run dev
```

### Production
```bash
npm start
```

## API Endpoints

### Authentication

#### POST /api/auth/register
Хэрэглэгч бүртгэх
```json
{
  "username": "testuser",
  "email": "test@example.com",
  "password": "password123"
}
```

#### POST /api/auth/login
Нэвтрэх
```json
{
  "username": "testuser",
  "password": "password123"
}
```

#### GET /api/auth/me
Одоогийн хэрэглэгчийн мэдээлэл (Token шаардлагатай)

#### POST /api/auth/logout
Гарах (Token шаардлагатай)

### Health Check

#### GET /api/health
Серверийн статус шалгах

## Middleware

- **protect**: JWT token шалгах
- **admin**: Admin эрх шалгах

## Models

### User
- username (unique)
- email (unique)
- password (hashed)
- role (user/admin)
- isActive
- lastLogin
- timestamps

## Security Features

- Password bcrypt hash
- JWT authentication
- Input validation
- CORS enabled
- Error handling 