import { z } from "zod";

export const updateDoctorSchema = z.object({
  crm: z.string().optional(),
  speacialty: z.string().optional(),
  hospitalIds: z.array(z.string()).optional(),
});

export type UpdateDoctorDto = z.infer<typeof updateDoctorSchema>;
