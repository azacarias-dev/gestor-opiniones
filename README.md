# gestor-opiniones

**API REST para gestionar usuarios, publicaciones y comentarios**

Este proyecto es un backend ligero construido con **Node.js** y **Express** que expone rutas para manejar tres entidades principales: usuarios, publicaciones y comentarios. Está diseñado para ser consumido por aplicaciones frontend (web, móvil) o por herramientas de prueba como Postman.

---

## 🛠 Tecnologías utilizadas

- Node.js 18+ (ECMAScript Modules)
- Express 5
- MongoDB con Mongoose
- dotenv para variables de entorno
- middlewares: cors, helmet, morgan, express-rate-limit
- express-validator para validación de peticiones
- jsonwebtoken (preparado para autenticación futura)
- multer y cloudinary (dependencias instaladas para subir archivos)
- axios (cliente HTTP, utilizado en algunos controladores)


## 📁 Estructura del proyecto

```
configs/           # configuraciones de servidor, base de datos y seguridad
middlewares/       # validadores y manejo de errores
src/
  usuarios/        # modelo, controlador y rutas de usuario
  publicaciones/   # modelo, controlador y rutas de publicaciones
  comentarios/     # modelo, controlador y rutas de comentarios
index.js           # punto de entrada (carga .env y arranca el servidor)
package.json
README.md
...otros archivos de configuración (Postman, etc.)
```

---

## 🧱 Entidades y modelos

### Usuario
- `name` (String, obligatorio)
- `email` (String, obligatorio, único, minúsculas)
- `bio` (String, opcional)
- `password` (String, obligatorio)
- `creationDate` (Date, por defecto ahora)
- `isActive` (Boolean, por defecto `true`)

### Publicación
- `title` (String, obligatorio)
- `content` (String, obligatorio)
- `idUsuario` (ObjectId, referencia a `User`, obligatorio)
- `publicationDate` (Date, por defecto ahora)
- `isActive` (Boolean, por defecto `true`)

### Comentario
- `content` (String, obligatorio)
- `idUsuario` (ObjectId, referencia a `User`, obligatorio)
- `idPublicacion` (ObjectId, referencia a `Publication`, obligatorio)
- `commentDate` (Date, por defecto ahora)
- `isActive` (Boolean, por defecto `true`)

---

## 🚦 Rutas disponibles

Todas las rutas están prefijadas con la URL base:

```
/gestor-opiniones/v1
```

### 🔹 Usuarios
- `POST /usuarios` – crear nuevo usuario
- `GET /usuarios` – listar todos los usuarios activos
- `GET /usuarios/:id` – obtener usuario por ID
- `PUT /usuarios/:id` – actualizar información de un usuario
- `PUT /usuarios/:id/activar` – activar un usuario
- `PUT /usuarios/:id/desactivar` – desactivar un usuario

### 🔹 Publicaciones
- `POST /publicaciones` – crear publicación
- `GET /publicaciones` – obtener todas las publicaciones
- `GET /publicaciones/:id` – publicación por ID
- `PUT /publicaciones/:id` – modificar publicación
- `PUT /publicaciones/:id/activar` – activar publicación
- `PUT /publicaciones/:id/desactivar` – desactivar publicación

### 🔹 Comentarios
- `POST /comentarios` – añadir un comentario (debe indicarse `idUsuario` e `idPublicacion` en el cuerpo)

> **Nota:** los controladores actuales no implementan paginación ni autenticación; se pueden ampliar fácilmente.

---

## ⚙️ Configuración de entorno (.env)

Crear un archivo `.env` en la raíz del proyecto con las variables mínimas necesarias:

```dotenv
PORT=3001
NODE_ENV=development
URI_MONGODB=mongodb://localhost:27017/gestor-opiniones
```

Agregar cualquier otra variable que requiera la aplicación en el futuro.

---

## 🚀 Instalación y ejecución

1. **Clonar el repositorio**
   ```bash
git clone <url-del-repositorio>
cd gestor-opiniones
```

2. **Instalar dependencias**
   ```bash
npm install
# o: pnpm install
```

3. **Configurar el archivo `.env`** según se describió arriba.

4. **Iniciar el servidor**
   ```bash
node index.js
# (puede añadirse un script en package.json como "start")
```

El servidor quedará escuchando en `http://localhost:<PORT>/gestor-opiniones/v1`.

---

## 📬 Uso con Postman

Se suministra una colección Postman (`REST API Gestion de opiniones.postman_collection.json`) y los entornos/globals en la carpeta `postman` para facilitar pruebas.

---

## 🛠 Desarrollo y notas

- La carpeta `middlewares` contiene validadores (`check-validators.js`), límite de peticiones y manejo de errores
- `configs` centraliza la configuración de CORS, Helmet y la conexión a MongoDB
- Todos los módulos usan ES Modules (`import` / `export`)

---

## 📜 Licencia

ISC (consulte el archivo `LICENSE` para más detalles).
