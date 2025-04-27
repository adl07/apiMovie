import { Router } from "express";
import { MovieController } from "../controllers/movies.js";
import { verifyToken } from "../middlewares/cors.js";
//import { MovieModel } from "../models/mysql/movie.js";

export const createMovieRouter = ({ movieModel }) => {
  const moviesRouter = Router();

  const movieController = new MovieController({ movieModel });

  // Rutas específicas primero
  moviesRouter.get("/", verifyToken, movieController.getAll);
  moviesRouter.get("/users/:user", movieController.getUser);
  moviesRouter.get(
    "/userId/:userId",
    verifyToken,
    movieController.getMoviesFav
  );
  moviesRouter.get("/logout/:user", movieController.logoutUser);
  moviesRouter.post("/movieList", verifyToken, movieController.addMovieList);
  moviesRouter.post("/register", movieController.createUser);
  moviesRouter.patch(
    "/updateFav",
    verifyToken,
    movieController.updateMovieList
  );

  // Rutas con parámetros dinámicos después
  moviesRouter.post("/", movieController.create);
  moviesRouter.get("/:id", movieController.getById);
  moviesRouter.delete("/:id", movieController.delete);
  moviesRouter.patch("/:id", movieController.update);

  return moviesRouter;
};
