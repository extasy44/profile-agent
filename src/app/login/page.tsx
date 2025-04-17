/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';

export default function LoginPage() {
  const { loginWithGoogle, loginWithGithub, isLoading } = useAuth();
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (provider: 'google' | 'github') => {
    try {
      setError(null);
      if (provider === 'google') {
        await loginWithGoogle();
      } else {
        await loginWithGithub();
      }
    } catch (error) {
      setError('Failed to login. Please try again.');
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-[#0D0D0D] p-4'>
      <div className='max-w-md w-full space-y-8 bg-white/5 p-8 rounded-xl backdrop-blur-sm'>
        <div className='text-center'>
          <h2 className='text-3xl font-bold text-white mb-2'>Welcome Back</h2>
          <p className='text-white/60'>Sign in to continue to Heejun Seo&apos;s Profile</p>
        </div>

        {error && <div className='bg-red-500/10 border border-red-500/50 text-red-500 rounded-lg p-4 text-sm'>{error}</div>}

        <div className='space-y-4'>
          <button
            onClick={() => handleLogin('google')}
            disabled={isLoading}
            className='w-full flex items-center justify-center gap-3 bg-white/5 hover:bg-white/10 text-white rounded-lg p-4 transition-colors disabled:opacity-50'>
            <svg className='w-5 h-5' viewBox='0 0 24 24'>
              <path
                fill='currentColor'
                d='M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z'
              />
              <path
                fill='currentColor'
                d='M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z'
              />
              <path
                fill='currentColor'
                d='M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z'
              />
              <path
                fill='currentColor'
                d='M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z'
              />
            </svg>
            Continue with Google
          </button>

          <button
            onClick={() => handleLogin('github')}
            disabled={isLoading}
            className='w-full flex items-center justify-center gap-3 bg-white/5 hover:bg-white/10 text-white rounded-lg p-4 transition-colors disabled:opacity-50'>
            <svg className='w-5 h-5' fill='currentColor' viewBox='0 0 24 24'>
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z'
              />
            </svg>
            Continue with GitHub
          </button>
        </div>

        {isLoading && (
          <div className='flex justify-center'>
            <div className='flex gap-2'>
              <span className='w-2 h-2 bg-white/50 rounded-full animate-bounce [animation-delay:-0.3s]'></span>
              <span className='w-2 h-2 bg-white/50 rounded-full animate-bounce [animation-delay:-0.15s]'></span>
              <span className='w-2 h-2 bg-white/50 rounded-full animate-bounce'></span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
