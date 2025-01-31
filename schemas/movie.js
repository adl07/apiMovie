import z from "zod";

const movieSchema = z.object({
  title: z.string({
    invalid_type_error: "Movie title must be a string",
    required_error: "Movie title is requeried",
  }),
  director: z.string(),
  year: z.number().int().min(1900).max(2024),
  duration: z.number().int().positive(),
  rate: z.number().min(0).max(10).default(5),
  poster: z.string().url({
    message: "Poster must be a valid URL",
  }),
  genre: z.array(
    z.enum([
      "Crime",
      "Drama",
      "Action",
      "Adventure",
      "Comedy",
      "Fantasy",
      "Horror",
      "Thriller",
      "Sci-Fi",
    ]),
    {
      required_error: "Movie genre is requeried",
      invalid_type_error: "Movie genre must be a array of enum Genre",
    }
  ),
});

export function validateMovie(object) {
  return movieSchema.safeParse(object);
}

export function validatePartialMovie(object) {
  return movieSchema.partial().safeParse(object);
}
