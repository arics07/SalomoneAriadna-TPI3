# 🏟️ API de Gestión de Socios

API REST desarrollada con Node.js y Express para la gestión de socios de un club. Incluye autenticación con JWT, validación de datos con Zod y persistencia en archivos JSON.

---

## 🚀 Tecnologías utilizadas

- Node.js
- Express
- JSON (base de datos local)
- JWT (autenticación)
- bcrypt (hash de contraseñas)
- cors
- dotenv
- Zod (validación de datos)

---

## 📁 Estructura del proyecto

/controllers  
/middlewares  
/models  
/routes  
/validations  
/data  
/public  
app.js  

---

## ▶️ Instalación y ejecución

npm install  
npm start  

El servidor corre en: http://localhost:3000

---

## 🔐 Autenticación

La API incluye registro e inicio de sesión de usuarios con JWT.

Las rutas de /api/members están protegidas excepto los GET.

---

## 📌 Endpoints de autenticación

POST /users/register

Body:
```json
{
  "email": "usuario@mail.com",
  "password": "123456"
}
```

---

POST /users/login

Body:
```json
{
  "email": "usuario@mail.com",
  "password": "123456"
}
```

Respuesta:
```json
{
  "token": "JWT_TOKEN"
}
```

---

## 👥 Endpoints de socios

Base URL: http://localhost:3000/api/members

---

GET /api/members → Obtener todos los socios

GET /api/members/:id → Obtener socio por ID

---

POST /api/members → Crear socio (requiere token)

Headers:
Authorization: Bearer TOKEN
Content-Type: application/json

Body:
```json
{
  "number": 11866,
  "name": "León Salomone",
  "email": "leon@mail.com",
  "status": "Activo"
}
```

---

PUT /api/members/:id → Actualizar socio (requiere token)

Headers:
Authorization: Bearer TOKEN

Body:
```json
{
  "status": "Inactivo"
}
```

---

DELETE /api/members/:id → Eliminar socio (requiere token)

---

## 📦 Modelo de socio
```json
{
  "id": "1774917884020",
  "number": 11866,
  "name": "León Salomone",
  "email": "leon@mail.com",
  "status": "Activo"
}
```

---

## 👤 Modelo de usuario
```json
{
  "id": "1776041120672",
  "email": "user@mail.com",
  "password": "HASH"
}
```

---

## 🔐 Seguridad

- Contraseñas encriptadas con bcrypt
- Autenticación con JWT
- Rutas protegidas con middleware
- Validación de datos con Zod

---

## ⚠️ Información importante

- Base de datos en archivo JSON
- IDs generados con Date.now()
- PUT permite actualización parcial
- POST requiere datos válidos
- GET no requiere autenticación

---

## 👩‍💻 Autora

Proyecto realizado por Ariadna Salomone.
