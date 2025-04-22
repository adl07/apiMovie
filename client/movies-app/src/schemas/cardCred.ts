import {z} from "zod"

export const cardCreditProps = z.object({
    numberCard: z.string({
        invalid_type_error:"Por favor ingresa el número como figura en la tarjeta",
        required_error: "Por favor ingresa el número como figura en la tarjeta",
    })
    .regex(/[0-9]/, "Solo debe contener números")
    .min(12, "La cantidad de digitos deben ser 12")
    .max(12, "La cantidad de digitos deben ser 12"),
    fecVencCard: z.string({
        invalid_type_error: "Por favor ingresa en número como figura en la tarjeta (MM-YY)",
        required_error: "Por favor ingresa en número como figura en la tarjeta (MM-YY)",
    })
    .regex(/[0-9]/, "Solo debe contener números")
    .min(4, "La cantidad de digitos deben ser 4")
    .max(4, "La cantidad de digitos deben ser 4"),
    cvvCard: z.string({
        invalid_type_error: "Por favor ingresa los 3/4 digitos que figuran en el reverso",
        required_error: "Por favor ingresa los 3/4 digitos que figuran en el reverso",
    })
    .regex(/[0-9]/, "Solo debe contener números")
    .min(3, "La cantidad de digitos deben ser 3")
    .max(4, "La cantidad de digitos deben ser 3"),
    userCard: z.string({
        invalid_type_error: "Por favor ingresa el nombre como figura en la tarjeta",
        required_error: "Por favor ingresa el nombre como figura en la tarjeta",
    })
    .regex(/[A-Z]/, "Solo debe contener letras")
    .min(4, "El nombre de usuario debe tener al menos 4 caracteres")
    .max(20, "El nombre de usuario debe tener un maximo de 10 caracteres"),
})

export type CardCreditType = z.infer<typeof cardCreditProps>

export function validateCardCreditProps(object: unknown){
    return cardCreditProps.safeParse(object);
}