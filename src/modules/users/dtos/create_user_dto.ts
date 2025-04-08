import { z } from "zod";

export const createUserSchema = z
  .object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
    confirmPassword: z.string().min(6),
  })
  .refine((data) => data.password !== data.confirmPassword, {
    message: "Passwords don't match",
  });

export type CreateUserDto = z.infer<typeof createUserSchema>;
