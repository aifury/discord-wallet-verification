// utils/env.ts
export function validateEnv() {
  const requiredEnvVars = [
    'NEXT_PUBLIC_DISCORD_CLIENT_ID',
    'NEXT_PUBLIC_DISCORD_REDIRECT_URL',
    'NEXT_PUBLIC_SUPABASE_URL',
    'NEXT_PUBLIC_SUPABASE_ANON_KEY',
  ];

  const missingEnvVars = requiredEnvVars.filter(
    (envVar) => !process.env[envVar]
  );

  if (missingEnvVars.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missingEnvVars.join(', ')}`
    );
  }
}