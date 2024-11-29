import { createApp } from "./api.js";
import { MovieModel } from "./models/superbase/movie.js";

createApp({ movieModel: MovieModel });
