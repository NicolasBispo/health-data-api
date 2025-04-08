import { z } from "zod";

export const updateUserDto = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  email: z.string().email().optional(),
})

export type UpdateUserDto = z.infer<typeof updateUserDto>;