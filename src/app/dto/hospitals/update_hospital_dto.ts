import { z } from "zod";

export const updateHospitalSchema = z.object({
  name: z.string().optional(),
  doctorsIds: z.array(z.string()).optional(),
});

export type UpdateHospitalDto = z.infer<typeof updateHospitalSchema>;
