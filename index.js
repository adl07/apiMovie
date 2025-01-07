import express from "express";
import { createMovieRouter } from "./routes/movies.js";
import { MovieModel } from "./models/superbase-test/movie.js";
import cors from 'cors';

export function createApp({ movieModel }) {
  const app = express();

   // Configuración de CORS mejorada
   app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
  }));

  app.use(express.json());
  app.disable("x-powered-by");

  // Middleware para logging de requests
  app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
  });

  app.use("/movies", createMovieRouter({ movieModel }));

  // Middleware para manejar rutas no encontradas
  app.use((req, res, next) => {
    res.status(404).json({ error: 'Ruta no encontrada' });
  });

  // Middleware de manejo de errores mejorado
  app.use((err, req, res, next) => {
    console.error('Error en la aplicación:', err);
    
    // Resetear la conexión de Supabase si es necesario
    if (err.message?.includes('connection')) {
      console.log('Intentando resetear la conexión...');
      // La próxima petición creará una nueva conexión
    }

    // Asegurarse de que la respuesta no se haya enviado ya
    if (!res.headersSent) {
      res.status(err.status || 500).json({
        error: err.message || 'Ha ocurrido un error en el servidor',
        status: err.status || 500
      });
    }
  });

  return app;
}

// Crear y exportar la instancia de la aplicación
const app = createApp({ movieModel: MovieModel });
export default app;


/* import express from "express";
import { createMovieRouter } from "./routes/movies.js";
import { MovieModel } from "./models/superbase-test/movie.js"; // Asegúrate de que la ruta sea correcta

const app = express();
app.use(express.json());
app.disable("x-powered-by");

app.use("/movies", createMovieRouter({ movieModel: MovieModel }));

export default app; */











/* import express, { json } from "express";
import { createMovieRouter } from "./routes/movies.js";
import dotenv from 'dotenv';
dotenv.config();
//import { corsMiddleware } from "./middlewares/cors.js";
//import { moviesRouter } from "./routes/movies.js";

export const createApp = ({ movieModel }) => {
  const app = express();
  app.use(json());
  app.disable("x-powered-by");

  //MIDDLEWARES//
  //app.use(corsMiddleware());

  //Devolver toda la informacion//
  app.use("/movies", createMovieRouter({ movieModel }));

  const PORT = process.env.PORT ?? 1234;

  app.listen(PORT, () => {
    console.log(`server se levanto en el puerto http://localhost:${PORT}`);
  });
}; */

/* app.options("/movies/:id", (req, res) => {
  const origin = req.header("origin");

  if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
    res.header("Access-Control-Allow-Origin", origin);
    res.header(
      "Access-Control-Allow-Origin-Methods",
      "GET",
      "POST",
      "PUT",
      "PATCH",
      "DELETE"
    );
  }
  res.sendStatus(200);
}); */
