import { Router } from "express";
import { MovieController } from "../controllers/movies.js";
//import { MovieModel } from "../models/mysql/movie.js";

export const createMovieRouter = ({ movieModel }) => {
  const moviesRouter = Router();

  const movieController = new MovieController({ movieModel });

 // Rutas específicas primero
  moviesRouter.get("/", movieController.getAll);
  moviesRouter.get("/users/:user", movieController.getUser);
  moviesRouter.get("/userId/:userId", movieController.getMoviesFav);
  moviesRouter.post("/movieList", movieController.addMovieList);
  moviesRouter.patch("/updateFav", movieController.updateMovieList); 
  
  // Rutas con parámetros dinámicos después
  moviesRouter.post("/", movieController.create);
  moviesRouter.get("/:id", movieController.getById);
  moviesRouter.delete("/:id", movieController.delete);
  moviesRouter.patch("/:id", movieController.update);

  return moviesRouter;
};
