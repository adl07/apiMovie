import { createApp } from "./api.js";
import { MovieModel } from "./models/superbase-test/movie.js";

createApp({ movieModel: MovieModel });