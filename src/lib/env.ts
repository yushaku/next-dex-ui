import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
  NEXT_PUBLIC_APP_URL: z.string().url().optional(),

  NEXT_PUBLIC_ALCHEMY_API_KEY: z.string(),
  NEXT_PUBLIC_GAS_POLICY_ID: z.string().optional(),
});

const envParseResult = envSchema.safeParse(process.env);

if (!envParseResult.success) {
  throw new Error('Invalid environment variables');
}

export const env = envParseResult.data;
export const isDevelopment = env.NODE_ENV === 'development';
export const isProduction = env.NODE_ENV === 'production';
export const isTest = env.NODE_ENV === 'test';
