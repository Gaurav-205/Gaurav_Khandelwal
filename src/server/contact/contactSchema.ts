import { z } from 'zod';

export const ContactSchema = z.object({
  name:     z.string().min(2).max(100),
  email:    z.string().email().max(254),
  message:  z.string().min(5).max(2000),
  honeypot: z.string().optional(),
});

export type ContactPayload = z.infer<typeof ContactSchema>;
