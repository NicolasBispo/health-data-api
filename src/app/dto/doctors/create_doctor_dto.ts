// src/app/validators/create-user.validator.ts
import { z } from "zod";

export const createDoctorSchema = z.object({
  crm: z.string(),
  specialty: z.string(),
  hospitalIds: z.array(z.string()).min(1),
});
export type CreateDoctorDto = z.infer<typeof createDoctorSchema>;
