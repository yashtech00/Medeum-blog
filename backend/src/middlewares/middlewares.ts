import z from "zod";

export const signupInput =  z.object({
    name:z.string().optional(),
    email:z.string().email(),
    password:z.string().min(6)
})

export type SignupInput = z.infer<typeof signupInput>