const express = require('express');
const cors = require('cors');
const sequelize = require('./config/db.config');
const movieRoutes = require('./routes/movieRoutes'); // Asegúrate de que la ruta sea correcta
const reservationRoutes = require('./routes/reservationRoutes'); // Asegúrate de que este archivo exista
require('dotenv').config();

const app = express();

app.use(cors({ origin: 'http://localhost:3000' })); // Usa una sola configuración de CORS
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  next();
});

// Montar rutas
app.use('/api', movieRoutes);
app.use('/api', reservationRoutes); // Asegúrate de que este archivo esté creado

// Prueba de conexión a la base de datos
sequelize
  .authenticate()
  .then(() => console.log('Conexión a la base de datos establecida.'))
  .catch(err => console.error('No se pudo conectar a la base de datos:', err));

sequelize.sync({ force: true }) // Cambia a true solo para pruebas iniciales
  .then(() => console.log('Modelos sincronizados con la base de datos.'))
  .catch(err => console.error('Error al sincronizar modelos:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});