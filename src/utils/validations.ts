import { z } from "zod";

export const formSigninSchema = z
    .object({
        username: z
            .string()
            .min(2, 'Username is too short'),
        password: z
            .string()
            .min(5, 'Password is too short'),
    })

export const formSignupSchema = z
    .object({
        username: z
            .string()
            .min(2, 'Username is too short'),
        password: z
            .string()
            .min(5, 'Password is too short'),
        confirmPassword: z
            .string()
            .min(5, 'Repeat password'),
    })
    .refine((data) => data.password === data.confirmPassword, {
        path: ['confirmPassword'],
        message: 'The entered passwords do not match',
    })
