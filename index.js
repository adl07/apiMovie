import express from "express";
import { createMovieRouter } from "./routes/movies.js";
import { MovieModel } from "./models/superbase-test/movie.js"; // Asegúrate de que la ruta sea correcta

const app = express();
app.use(express.json());
app.disable("x-powered-by");

app.use("/movies", createMovieRouter({ movieModel: MovieModel }));

export default app;











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
