// types/env.d.ts
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_DISCORD_CLIENT_ID: string;
      NEXT_PUBLIC_DISCORD_REDIRECT_URL: string;
      NEXT_PUBLIC_SUPABASE_URL: string;
      NEXT_PUBLIC_SUPABASE_ANON_KEY: string;
      NEXT_PUBLIC_SOLANA_NETWORK?: string;
    }
  }
}

export {}