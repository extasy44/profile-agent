'use client';

import ProfileChat from '@/components/ProfileChat';
import { ThemeSwitcher } from '@/components/ThemeSwitcher';
import { headingVariants, typographyVariants, cardVariants, animationVariants, buttonVariants } from '@/lib/styles';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export default function ProfilePage() {
  return (
    <div className='min-h-screen bg-background text-foreground'>
      {/* Theme Switcher */}
      <div className='fixed top-6 right-6 z-50'>
        <ThemeSwitcher />
      </div>

      <div className='max-w-[1000px] mx-auto py-16 px-4 sm:px-6 lg:px-8'>
        {/* Header Section */}
        <div className='text-center mb-16'>
          <div className='inline-block mb-8'>
            <Link
              href='/'
              className={cn(
                'block w-28 h-28 rounded-full bg-primary/10 border-2 border-primary/20 hover:bg-primary/20 hover:border-primary/30 transition-all duration-300 flex items-center justify-center text-primary text-3xl font-mono font-bold',
                animationVariants({ type: 'bounceSubtle' })
              )}
              aria-label='Go back to homepage'>
              HS
            </Link>
          </div>
          <h1 className={cn(headingVariants({ level: 1 }), 'mb-4')}>Heejun Seo</h1>
          <p className={cn(typographyVariants({ variant: 'info', size: 'xl' }), 'mb-6 font-semibold')}>
            Frontend/Web Developer with Fullstack Capabilities
          </p>
          <p className={cn(typographyVariants({ variant: 'muted', size: 'lg' }), 'max-w-2xl mx-auto leading-relaxed')}>
            Welcome to my interactive profile! Feel free to chat with my AI assistant to learn more about my experience, skills, and
            projects. The AI has been trained on my professional background and can provide detailed information about my work history,
            technical expertise, and achievements.
          </p>
        </div>

        {/* Chat Section */}
        <div className={cn(cardVariants({ variant: 'elevated', padding: 'none' }), 'overflow-hidden')}>
          <div className='p-8 border-b border-border text-center'>
            <h2 className={cn(headingVariants({ level: 3 }), 'mb-2')}>Interactive Chat</h2>
            <p className={cn(typographyVariants({ variant: 'muted', size: 'default' }))}>
              Ask me anything about my professional background
            </p>
          </div>
          <ProfileChat />
        </div>

        {/* Quick Actions */}
        <div className='mt-12 text-center'>
          <div className='flex justify-center gap-4 flex-wrap'>
            <Link href='/' className={cn(buttonVariants({ variant: 'outline', size: 'lg' }))}>
              ← Back to Portfolio
            </Link>
            <Link href='mailto:seoheejun@gmail.com' className={cn(buttonVariants({ variant: 'brand', size: 'lg' }))}>
              Contact Me
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
