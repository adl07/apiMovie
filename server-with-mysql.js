import { createApp } from "./api.js";
import { MovieModel } from "./models/mysql/movie.js";

createApp({ movieModel: MovieModel });
