
# 🎬 EsCine

Este proyecto es una aplicación web desarrollada con **React** que te permite explorar películas, reservar boletos y contactarnos. Está inspirada en estrategias de marketing de plataformas como Facebook/Meta para maximizar la conversión.

---

## 🌟 ¿Qué es EsCine?

EsCine es un proyecto que combina un **frontend** (lo que ves en el navegador) y un **backend** (que procesa datos) con una base de datos PostgreSQL. Actualmente incluye:

- 🏠 **Página de inicio**: Muestra estrenos y todas las películas con opción de reservar.
- 🔐 **Página de login/signup**: Permite iniciar sesión o registrarse (simulado por ahora, pronto con autenticación real).
- 📱 **Diseño responsivo**: Funciona en computadoras y móviles gracias a Tailwind CSS.
- ✨ **Interactividad**: Diálogos, botones animados y efectos visuales.
- 📧 **Contacto**: Envía mensajes que se guardan y se envían por correo (funcional con backend).
- 🎬 **Películas y horarios**: Incluye datos de muestra de películas y horarios para probar.

> ⚠️ Este proyecto está en desarrollo. Usa React, React Router, Tailwind CSS y Node.js para el backend con Sequelize. ¡Pronto se integrará autenticación real y más funciones!

---

## 🧭 Cómo navegar en EsCine

Una vez que la aplicación está corriendo en tu computadora, puedes acceder a las siguientes rutas:

- `/` → Página principal  
  Ve a `http://localhost:3000` para explorar los estrenos y películas. Haz clic en un póster para ir a la ruta de reserva `/reservation/:id`.

- `/auth` → Autenticación  
  Haz clic en el avatar (👤) en el encabezado. Se abrirá un diálogo con opción para iniciar sesión o registrarte (simulado por ahora).

- `/contact` → Página de contacto  
  Ve a `http://localhost:3000/contact` para enviar un mensaje de prueba.

- Otras páginas futuras:
  - `/reviews`: Para ver reseñas (en desarrollo).

---

## 🛠️ Instrucciones para instalar y probar EsCine

### 1. Prepara tu computadora

Necesitas instalar estas herramientas antes de empezar:

- **Node.js** (versión 14 o superior):  
  👉 Descarga e instala desde [https://nodejs.org](https://nodejs.org). Esto te da `npm` para manejar dependencias.

- **PostgreSQL** (versión 13 o superior):  
  👉 Descarga e instala desde [https://www.postgresql.org/download/](https://www.postgresql.org/download/). Anota la contraseña que elijas para el usuario `postgres`.

- **Git**:  
  👉 Descarga e instala desde [https://git-scm.com/downloads](https://git-scm.com/downloads) para clonar el proyecto.

- **Opcional pero recomendado**:  
  Visual Studio Code: 👉 [https://code.visualstudio.com](https://code.visualstudio.com) para editar los archivos.

---

### 2. Clona el repositorio

Abre una terminal (PowerShell en Windows, Terminal en Mac/Linux) y ejecuta:

```bash
git clone https://github.com/HyperCoder-57/EsCine.git
```

> Reemplaza la URL con la del repositorio real si es diferente (por ejemplo, `https://github.com/tu-usuario/escine.git`).

---

### 3. Entra a la carpeta del proyecto y luego al frontend y backend

1. Ve a la carpeta del proyecto:
   ```bash
   cd escine
   ```

2. Instala las dependencias del backend (donde se procesan los datos):
   ```bash
   cd backend
   npm install
   cd ..
   ```

3. Instala las dependencias del frontend (lo que ves en el navegador):
   ```bash
   cd frontend
   npm install
   ```

⌛ ¡Esto puede tardar unos minutos, sé paciente mientras se descargan las herramientas!

---

### 4. Configura la Base de Datos

¡No te preocupes, esto es súper fácil! El backend creará las tablas automáticamente, pero necesitas preparar PostgreSQL y agregar datos de muestra.

1. **Inicia PostgreSQL**:
   - Si usas Windows, busca "pgAdmin" en el menú de inicio y haz clic en "Start Server".
   - En Mac/Linux, abre la terminal y escribe:
     ```bash
     sudo service postgresql start
     ```

2. **Crea una base de datos vacía**:
   - Abre una terminal y conecta con `psql`:
     ```bash
     psql -U postgres
     ```
   - Ingresa la contraseña si te la pide.
   - Crea una base de datos llamada `escine`:
     ```sql
     CREATE DATABASE escine;
     ```
   - Sal del prompt con:
     ```sql
     \q
     ```

3. **Inserta películas y horarios de muestra**:
   - En la carpeta `database/` del proyecto, encontrarás dos archivos: `insert_movies.sql` y `insert_showtimes.sql`.
   - Desde la terminal, ve a la raíz del proyecto (donde clonaste `escine`):
     ```bash
     cd escine
     ```
   - Ejecuta estos comandos para insertar los datos:
     ```bash
     psql -U postgres -d escine -f database/insert_movies.sql
     psql -U postgres -d escine -f database/insert_showtimes.sql
     ```
   - **Explicación**: Estos comandos usan `psql` para agregar películas (como "Cadena perpetua") y horarios de muestra a la base de datos.

4. **Usa las credenciales de prueba**:
   - En la carpeta `backend/`, encontrarás un archivo `.env` con credenciales preconfiguradas para este proyecto escolar. Contiene:
     ```
     DB_HOST=localhost
     DB_USER=postgres
     DB_PASSWORD=1234
     DB_NAME=escine
     DB_PORT=5432
     SUPPORT_EMAIL=test@escine.com
     EMAIL_PASSWORD=testpass
     ```
   - **Nota importante**: Estas credenciales son solo para pruebas y no deben usarse en producción ni en cuentas reales. Si quieres usar tu propio correo, genera una [contraseña de aplicación](https://myaccount.google.com/apppasswords) para Gmail y actualiza el `.env` antes de iniciar.

¡Listo! El backend creará las tablas y, con estos pasos, tendrás datos para probar.

---

### 5. Inicia la aplicación

1. **Inicia el backend**:
   - Desde la terminal en `escine/backend/`, ejecuta:
     ```bash
     node server.js
     ```
   - Deberías ver un mensaje como `Servidor corriendo en http://localhost:5000`.

2. **Inicia el frontend**:
   - Abre una nueva terminal, ve a `escine/frontend/` y ejecuta:
     ```bash
     npm start
     ```
   - Esto abrirá tu navegador en `http://localhost:3000` (o un puerto similar). Si no se abre, copia y pega esa URL.

---

### 6. Explora y diviértete

- Haz clic en el avatar (👤) para probar el login/signup (simulado).
- Explora los estrenos en la página principal.
- Ve a `/contact` y envía un mensaje de prueba (¡deberías recibirlo en `test@escine.com` si todo funciona!).

---

## ⚠️ Notas importantes

- Si algo falla como “npm no reconocido”, verifica que Node.js esté instalado:
  ```bash
  node -v
  ```
- Si ves un error como “base de datos no conecta”:
  - Asegúrate de que PostgreSQL esté corriendo.
  - Verifica que las credenciales en `.env` sean correctas.
- Necesitas conexión a internet para descargar dependencias e imágenes.
- Si `psql` no funciona, asegúrate de que PostgreSQL esté en tu PATH o usa la ruta completa (ej. `C:\Program Files\PostgreSQL\15\bin\psql.exe`).

---

## 🤝 Contribuciones

¿Quieres ayudar a mejorar EsCine? Sigue estos pasos:

1. Haz un fork del repositorio.
2. Crea una rama:
   ```bash
   git checkout -b mi-nueva-caracteristica
   ```
3. Sube tus cambios:
   ```bash
   git push origin mi-nueva-caracteristica
   ```
4. Abre un Pull Request en GitHub.

---

## 📝 Licencia
Este proyecto usa la licencia MIT. ¡Puedes usarlo y modificarlo libremente!

---

### **Notas Adicionales**
- El archivo `.env` y los scripts `.sql` están incluidos para facilitar las pruebas escolares. No uses estas credenciales en producción.
- Si quieres colaborar, abre un "issue" en GitHub para sugerencias o problemas.

---

### **Instrucciones Finales**

1. **Aplica los Cambios**:
   - Copia este `README.md` y reemplaza el existente en `escine/`.

2. **Sube al Repositorio**:
   - Desde la raíz de `escine/`, ejecuta:
     ```bash
     git add README.md
     git commit -m "Actualizar README con instrucciones completas para frontend, backend y base de datos"
     git push origin main
     ```

3. **Prueba el Proceso**:
   - Clona el repositorio en otra carpeta y sigue las instrucciones para confirmar que funcionen.

4. **Verifica en GitHub**:
   - Asegúrate de que el `README.md` actualizado esté en `https://github.com/HyperCoder-57/EsCine`.

---

### **Siguientes Pasos**
- Prueba las instrucciones en una máquina limpia para validarlas.
- Si encuentras errores (por ejemplo, al insertar datos o iniciar el backend), compárteme los logs.
- ¡Tu proyecto EsCine está listo para impresionar a todos! 😄