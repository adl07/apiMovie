import express, { json } from "express";
import { createMovieRouter } from "./routes/movies.js";
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
};

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
