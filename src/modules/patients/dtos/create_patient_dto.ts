// src/app/validators/create-user.validator.ts
import { CONTACT_TYPES } from "@/config/constants";
import { z } from "zod";

const contactSchema = z.object({
  value: z.string(),
  type: z.enum(CONTACT_TYPES as [string, ...string[]]),
  contactableType: z.enum(["user", "patient", "hospital", "doctor"]),
  contactableId: z.string(),
});
export const createPatientSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  cpf: z.string(),
  contacts: z.array(contactSchema).optional(),
});
export type CreatePatientDto = z.infer<typeof createPatientSchema>;
