
# 🎬 EsCine

Este proyecto es una aplicación web desarrollada con **React** que te permite explorar películas y reservar boletos. Está inspirada en estrategias de marketing de plataformas como Facebook/Meta para maximizar la conversión.

---

## 🌟 ¿Qué es EsCine?

EsCine es un proyecto frontend que simula una plataforma de cine. Actualmente incluye:

- 🏠 Página de inicio: muestra estrenos y todas las películas con opción de reservar.
- 🔐 Página de login/signup: permite iniciar sesión o registrarse con un diseño mágico y motivador.
- 📱 Diseño responsivo: funciona en computadoras y móviles gracias a Tailwind CSS.
- ✨ Interactividad: incorpora diálogos, botones animados y efectos visuales.

> ⚠️ Este proyecto está en desarrollo. Usa React, React Router y Tailwind CSS. ¡Pronto se integrará un backend para autenticación real!

---

## 🧭 Cómo navegar en EsCine

Una vez que la aplicación está corriendo en tu computadora, puedes acceder a las siguientes rutas:

- `/` → Página principal  
  Ve a `http://localhost:3000` para explorar los estrenos y películas. Haz clic en un póster para ir a la ruta de reserva `/reservation/:id`.

- `/auth` → Autenticación  
  Haz clic en el avatar (👤) en el encabezado. Se abrirá un diálogo con opción para iniciar sesión o registrarte.

- Otras páginas futuras:
  - `/reviews`: Para ver reseñas (en desarrollo).
  - `/contact`: Página de contacto (en desarrollo).

---

## 🛠️ Instrucciones para instalar y probar EsCine


### 1. Prepara tu computadora

- Instala Node.js (versión 14 o superior):  
  👉 [https://nodejs.org](https://nodejs.org)

- Opcional pero recomendado:  
  Visual Studio Code: 👉 [https://code.visualstudio.com](https://code.visualstudio.com)

---

### 2. Clona el repositorio

Abre una PowerShell (PowerShell en Windows) y ejecuta:

```bash
git clone https://github.com/HyperCoder-57/EsCine.git
```

> Reemplaza la URL con la del repositorio real si es diferente.

---

### 3. Entra a la carpeta del proyecto

```bash
cd escine
```

---

### 4. Instala las dependencias

```bash
npm install
```

Esto descargará todas las herramientas necesarias como React y Tailwind.  
⌛ Puede tardar unos minutos, ¡sé paciente!

---

### 5. Inicia la aplicación

```bash
npm start
```

🔗 Esto abrirá tu navegador en `http://localhost:3000`.  
Si no se abre automáticamente, copia y pega esa URL en tu navegador.

---

### 6. Explora y diviértete

- Haz clic en el avatar.
- Explora los estrenos.
- Prueba iniciar sesión o registrarte (por ahora con alertas simuladas).

---

## ⚠️ Notas importantes

- Si algo falla como “npm no reconocido”, asegúrate de que Node.js esté correctamente instalado:

```bash
node -v
```

- Necesitas conexión a internet para descargar dependencias e imágenes.
- Si quieres colaborar: abre un "issue" o envía un "pull request" en GitHub.

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
