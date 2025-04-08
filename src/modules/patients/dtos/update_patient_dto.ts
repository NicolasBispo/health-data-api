// src/app/validators/create-user.validator.ts
import { z } from "zod";

export const updatePatientSchema = z.object({
  cpf: z.string().optional(),
});
export type UpdatePatientDto = z.infer<typeof updatePatientSchema>;
