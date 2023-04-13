import { z } from 'zod';
import { formSigninSchema, formSignupSchema } from './validations';

export type TFormSigninSchema = z.infer<typeof formSigninSchema>;

export type TFormSignupSchema = z.infer<typeof formSignupSchema>;
