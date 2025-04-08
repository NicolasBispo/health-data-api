// src/app/validators/create-user.validator.ts
import { z } from "zod";

export const createHospitalSchema = z.object({
  name: z.string(),
  doctorsIds: z.array(z.string()).min(1),
});
export type CreateHospitalDto = z.infer<typeof createHospitalSchema>;
