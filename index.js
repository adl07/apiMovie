import express from "express";
import { createMovieRouter } from "./routes/movies.js";
import { MovieModel } from "./models/superbase-test/movie.js";
import cookieParser from "cookie-parser";
import { corsMiddleware } from "./middlewares/cors.js";

export function createApp({ movieModel }) {
  const app = express();

  // Middleware para manejar manualmente el preflight CORS
  app.use((req, res, next) => {
    // Configurar cabeceras CORS manualmente para asegurar que se apliquen correctamente
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Credentials", "true")
    res.header("Access-Control-Allow-Methods", "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization")

    // Manejar solicitudes OPTIONS
    if (req.method === "OPTIONS") {
      return res.status(204).end()
    }

    next()
  })

  // Configuración de CORS mejorada
  app.use(corsMiddleware);

  app.use((req, res, next) => {
    // Registrar información de depuración
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    console.log("Cookies recibidas:", req.cookies);
    console.log("Headers de autorización:", req.headers.authorization);
    
    next();
  });
  app.use(express.json());
  app.disable("x-powered-by");

  app.use(cookieParser());

  app.use("/movies", createMovieRouter({ movieModel }));

  // Middleware para manejar rutas no encontradas
  app.use((req, res, next) => {
    res.status(404).json({ error: "Ruta no encontrada" });
  });

  // Middleware de manejo de errores mejorado
  app.use((err, req, res, next) => {
    console.error("Error en la aplicación:", err);

  // Middleware para logging de requests
    app.use((req, res, next) => {
      console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
      next();
    });

    // Resetear la conexión de Supabase si es necesario
    if (err.message?.includes("connection")) {
      console.log("Intentando resetear la conexión...");
      // La próxima petición creará una nueva conexión
    }

    // Asegurarse de que la respuesta no se haya enviado ya
    if (!res.headersSent) {
      res.status(err.status || 500).json({
        error: err.message || "Ha ocurrido un error en el servidor",
        status: err.status || 500,
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
/* // ⚠️ Manejo manual del preflight CORS para Vercel
  app.options("*", (req, res) => {
    const ACCEPTED_ORIGINS = [
      "http://localhost:8080",
      "http://localhost:1234",
      "http://localhost:5173",
      "http://movies.com",
    ];

    const origin = req.headers.origin;
    if (origin && ACCEPTED_ORIGINS.includes(origin)) {
      res.setHeader("Access-Control-Allow-Origin", origin);
    }

    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, OPTIONS"
    );
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization"
    );
    res.setHeader("Access-Control-Allow-Credentials", "true");

    res.status(200).end();
  }); */


   /* // Determinar el entorno
  const environment = process.env.NODE_ENV || "development";
  console.log(`Ejecutando en entorno ${environment}`);

  

  // Añadir middleware de depuración CORS
  app.use((req, res, next) => {
    // Registrar detalles de la petición
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    console.log(`Origen: ${req.headers.origin}`)

    // Registrar cabeceras CORS en la respuesta
    const originalSetHeader = res.setHeader;
    res.setHeader = function(name, value) {
      if (name.toLowerCase().startsWith("access-control")) {
        console.log(`Configurando cabecera: ${name} = ${value}`);
      }
      return originalSetHeader.call(this, name, value);
    };

    next();
  }); */
