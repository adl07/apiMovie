import { z } from "zod";

export const registerLoginUser = z.object({
  username: z
    .string({
      invalid_type_error: "El nombre del usuario debe ser un string",
      required_error: "El nombre del usuario es requerido",
    })
    .min(4)
    .max(10),
  email: z.string().email(),
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

export type RegisterLoginUserType = z.infer<typeof registerLoginUser>;

export function validateLoginUser(object: unknown) {
  return registerLoginUser.safeParse(object);
}
