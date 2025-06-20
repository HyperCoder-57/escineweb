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


const corsOptions = {
  origin: ['http://localhost:3000'],  
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  console.log(`Solicitud recibida: ${req.method} ${req.url}`); // Depuración
  next();
});

// Middleware para listar rutas registradas (para depuración)
app.use((req, res, next) => {
  console.log('Rutas registradas:', app._router.stack
    .filter(r => r.route)
    .map(r => ({ path: r.route.path, method: r.route.stack[0].method })));
  next();
});


console.log('Rutas montadas:', {
  movieRoutes: !!movieRoutes,
  reservationRoutes: !!reservationRoutes,
  userRoutes: !!userRoutes,
  contactRoutes: !!contactRoutes,
});


app.set('models', { Contact });


app.use('/api', movieRoutes);
app.use('/api/reservations', reservationRoutes);
app.use('/api', userRoutes);
app.use('/api', contactRoutes);


const PORT = process.env.PORT || 5000;
sequelize
  .authenticate()
  .then(() => {
    console.log('Conexión a la base de datos establecida.');
    return sequelize.sync({ force: true });
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