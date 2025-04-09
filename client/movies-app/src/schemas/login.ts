import { z } from "zod";

export const registerLoginUser = z.object({
  email: z.string({
      required_error: "Por favor ingresa un email",
    })
    .email("El email no es válido"),
  username: z.string({
      invalid_type_error: "Por favor ingresa un nombre de usuario",
      required_error: "El nombre de usuario debe tener al menos 4 caracteres",
    })
    .min(4, "El nombre de usuario debe tener al menos 4 caracteres")
    .max(10, "El nombre de usuario debe tener un maximo de 10 caracteres"),
  password: z.string({
      required_error: "Por favor ingresa una contraseña",
    })
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
