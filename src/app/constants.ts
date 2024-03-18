import { z } from 'zod';

export const adsSchema = z.object({
  title: z.string().min(1, 'title is required'),
  imageUrl: z.string(),
  description: z.string(),
  url: z.string(),
});

export type AdsFormValues = z.infer<typeof adsSchema>;

export const adsFormDefaultValues: AdsFormValues = {
  title: '',
  imageUrl: '',
  description: '',
  url: '',
};
