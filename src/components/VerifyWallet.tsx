'use client';

import { useEffect, useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { supabase } from '../lib/supabase';
//import { useRouter } from 'next/router';
import Image from 'next/image';

interface DiscordUser {
    id: string;
    username: string;
    avatar: string;
    discriminator: string;
}

export default function VerifyWallet() {
    //const router = useRouter();
    const { publicKey, connected } = useWallet();
    const [discordUser, setDiscordUser] = useState<DiscordUser | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [verificationStatus, setVerificationStatus] = useState<'pending' | 'success' | 'error'>('pending');

    // Handle Discord OAuth
    useEffect(() => {
        const handleDiscordAuth = async () => {
            // Check URL hash for Discord OAuth token
            const fragment = new URLSearchParams(window.location.hash.slice(1));
            const accessToken = fragment.get('access_token');

            if (accessToken) {
                try {
                    setIsLoading(true);
                    const response = await fetch('https://discord.com/api/users/@me', {
                        headers: {
                            Authorization: `Bearer ${accessToken}`
                        }
                    });

                    if (!response.ok) {
                        throw new Error('Failed to fetch Discord user data');
                    }

                    const userData = await response.json();
                    setDiscordUser(userData);
                    
                    // Clear the URL hash
                    window.history.replaceState(
                        {},
                        document.title,
                        window.location.pathname + window.location.search
                    );
                } catch (err) {
                    setError(err instanceof Error ? err.message : 'An unknown error occurred');
                    setVerificationStatus('error');
                } finally {
                    setIsLoading(false);
                }
            }
        };

        handleDiscordAuth();
    }, []);

    // Handle verification when both connections are present
    useEffect(() => {
        const verifyConnections = async () => {
            if (connected && publicKey && discordUser && verificationStatus === 'pending') {
                try {
                    setIsLoading(true);
                    setError(null);

                    // Check for existing verification
                    const { data: existingData } = await supabase
                        .from('wallet_associations')
                        .select()
                        .or(
                            `discord_id.eq.${discordUser.id},wallet_address.eq.${publicKey.toString()}`
                        );

                    if (existingData && existingData.length > 0) {
                        throw new Error('This Discord account or wallet is already verified');
                    }

                    // Store new verification
                    const { error: insertError } = await supabase
                        .from('wallet_associations')
                        .insert([
                            {
                                discord_id: discordUser.id,
                                discord_username: `${discordUser.username}#${discordUser.discriminator}`,
                                wallet_address: publicKey.toString(),
                                verification_status: 'verified',
                            }
                        ]);

                    if (insertError) throw insertError;

                    setVerificationStatus('success');
                    
                    // Redirect back to Discord after short delay
                    setTimeout(() => {
                        window.location.href = process.env.NEXT_PUBLIC_DISCORD_REDIRECT_URL!;
                    }, 3000);

                } catch (err) {
                    setError(err instanceof Error ? err.message : 'An unknown error occurred');
                    setVerificationStatus('error');
                } finally {
                    setIsLoading(false);
                }
            }
        };

        verifyConnections();
    }, [connected, publicKey, discordUser, verificationStatus]);

    const handleDiscordLogin = () => {
        const DISCORD_CLIENT_ID = process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID;
        const REDIRECT_URI = encodeURIComponent(window.location.origin + '/verify');
        const SCOPES = 'identify';

        window.location.href = `https://discord.com/api/oauth2/authorize?client_id=${DISCORD_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=token&scope=${SCOPES}`;
    };

    return (
        <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
                <div className="px-8 py-6">
                    <h2 className="text-2xl font-bold text-center mb-8">
                        Verify Your Wallet
                    </h2>

                    {error && (
                        <div className="mb-6 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
                            {error}
                        </div>
                    )}

                    {verificationStatus === 'success' ? (
                        <div className="text-center space-y-4">
                            <div className="text-green-500 text-xl">
                                ✓ Verification Successful!
                            </div>
                            <p className="text-gray-600">
                                Redirecting back to Discord...
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-8">
                            {/* Discord Connection */}
                            <div className="border rounded-lg p-4">
                                <h3 className="text-lg font-medium mb-4">
                                    1. Connect Discord
                                </h3>
                                {discordUser ? (
                                    <div className="flex items-center space-x-3">
                                        <Image
                                            src={`https://cdn.discordapp.com/avatars/${discordUser.id}/${discordUser.avatar}.png`}
                                            alt={discordUser.username}
                                            width={40}
                                            height={40}
                                            className="rounded-full"
                                        />
                                        <span className="font-medium">
                                            {discordUser.username}#{discordUser.discriminator}
                                        </span>
                                        <span className="text-green-500 text-xl">✓</span>
                                    </div>
                                ) : (
                                    <button
                                        onClick={handleDiscordLogin}
                                        className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-4 rounded-md transition-colors duration-200"
                                        disabled={isLoading}
                                    >
                                        {isLoading ? 'Connecting...' : 'Connect Discord'}
                                    </button>
                                )}
                            </div>

                            {/* Wallet Connection */}
                            <div className="border rounded-lg p-4">
                                <h3 className="text-lg font-medium mb-4">
                                    2. Connect Wallet
                                </h3>
                                <div className="flex justify-center">
                                    <WalletMultiButton />
                                </div>
                                {connected && publicKey && (
                                    <div className="mt-2 text-center text-sm text-gray-600">
                                        Connected: {publicKey.toString().slice(0, 4)}...
                                        {publicKey.toString().slice(-4)}
                                        <span className="text-green-500 text-xl ml-2">✓</span>
                                    </div>
                                )}
                            </div>

                            {isLoading && (
                                <div className="text-center text-gray-600">
                                    Verifying connections...
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}