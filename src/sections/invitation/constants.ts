import { z } from 'zod';

export const invitationFormSchema = z.object({
  source: z.string().nonempty(),
  rewardAmount: z.number().int().positive(),
  comment: z.string().optional(),
});

export type InvitationFormValues = z.infer<typeof invitationFormSchema>;
