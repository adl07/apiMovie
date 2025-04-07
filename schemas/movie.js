import { z } from "zod";

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

const registreUserSchema = z.object({
  username: z
    .string({
      invalid_type_error: "El nombre del usuario debe ser un string",
      required_error: "El nombre del usuario es requerido",
    })
    .min(4)
    .max(10),
  email: z.string().email(),
  subscripcion: z.string({
    invalid_type_error: "El nombre de la subscripcion debe ser un string",
    required_error: "El nombre de la subscripcion es requerido",
  }),
  password: z
    .string()
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .max(32, "La contraseña no puede tener más de 32 caracteres")
    .regex(/[A-Z]/, "La contraseña debe contener al menos una letra mayúscula")
    .regex(/[a-z]/, "La contraseña debe contener al menos una letra minúscula")
    .regex(/[0-9]/, "La contraseña debe contener al menos un número")
    .regex(
      /[@$!%*?&]/,
      "La contraseña debe contener al menos un carácter especial (@$!%*?&)"
    ),
});

export function validateMovie(object) {
  return movieSchema.safeParse(object);
}

export function validatePartialMovie(object) {
  return movieSchema.partial().safeParse(object);
}

export function validateRegistreUser(object) {
  return registreUserSchema.safeParse(object);
}
