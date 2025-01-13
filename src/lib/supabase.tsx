import { createClient } from '@supabase/supabase-js';

if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    throw new Error('Missing env.NEXT_PUBLIC_SUPABASE_URL');
}

if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    throw new Error('Missing env.NEXT_PUBLIC_SUPABASE_ANON_KEY');
}

// Create Supabase client
export const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
        auth: {
            autoRefreshToken: true,
            persistSession: true,
        },
        db: {
            schema: 'public'
        }
    }
);

// Optional: Type definitions for your database schema
export type WalletAssociation = {
    id: string;
    discord_id: string;
    discord_username: string;
    wallet_address: string;
    verification_status: 'pending' | 'verified' | 'revoked';
    created_at: string;
    updated_at: string;
};

// Helper function to check if the client is properly initialized
export const isSupabaseConnected = async () => {
    try {
        const { error } = await supabase
            .from('wallet_associations')
            .select('count(*)')
            .limit(1);
            
        return !error;
    } catch {
        return false;
    }
};