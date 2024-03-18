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

// Verification schema
export const VerificationSchema = z.object({
  title: z.string().min(1, 'title is required'),
  shortDescription: z.string(),
  description: z.string(),
  rewardAmount: z.number(),
  icon: z.string(),
  payload: z.string(),
  url: z.string(),
});

export type verificationFormValues = z.infer<typeof VerificationSchema>;

export const VerificationFormDefaultValues: verificationFormValues = {
  title: '',
  shortDescription: '',
  description: '',
  rewardAmount: 0,
  icon: '',
  payload: '',
  url: '',
};
