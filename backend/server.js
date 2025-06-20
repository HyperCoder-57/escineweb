const express = require('express');
const cors = require('cors');
const sequelize = require('./config/db.config.js');
const movieRoutes = require('./routes/movieRoutes');
const reservationRoutes = require('./routes/reservationRoutes');
const userRoutes = require('./routes/userRoutes');
const contactRoutes = require('./routes/contactRoutes');

require('dotenv').config();

const Contact = require('./models/contact')(sequelize);

const app = express();

// Configurar CORS para permitir credenciales
const corsOptions = {
  origin: ['http://localhost:3000', 'http://localhost:3001'], // Ajusta según el puerto del frontend
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  next();
});

// Log para depurar rutas montadas
console.log('Rutas montadas:', {
  movieRoutes: !!movieRoutes,
  reservationRoutes: !!reservationRoutes,
  userRoutes: !!userRoutes,
  contactRoutes: !!contactRoutes,
});


app.set('models', { Contact });

// Montar rutas
app.use('/api', movieRoutes);
app.use('/api', reservationRoutes);
app.use('/api', userRoutes);
app.use('/api', contactRoutes);

// Iniciar servidor solo si la BD está lista
const PORT = process.env.PORT || 5000;
sequelize
  .authenticate()
  .then(() => {
    console.log('Conexión a la base de datos establecida.');
    return sequelize.sync({ force: false });
  })
  .then(() => {
    console.log('Modelos sincronizados con la base de datos.');
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('Error al conectar o sincronizar con la base de datos:', err.stack);
  });