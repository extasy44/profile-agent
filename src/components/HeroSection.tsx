'use client';

import Link from 'next/link';
import { headingVariants, typographyVariants, buttonVariants } from '@/lib/styles';
import { cn } from '@/lib/utils';

export function HeroSection() {
  return (
    <section id='about' className='min-h-screen flex items-center py-24 relative pl-40 md:pl-48 lg:pl-32'>
      <div className='absolute inset-0 bg-gradient-to-b from-background/80 to-muted/20 pointer-events-none'></div>
      <div className='container mx-auto px-6 relative z-10'>
        <div className='max-w-3xl'>
          <div className={cn(typographyVariants({ variant: 'info', size: 'lg' }), 'mb-4 ml-1 font-mono neon-text')}>Hi, my name is</div>
          <h1 className={cn(headingVariants({ level: 1 }), 'mb-4 text-foreground neon-text-green')}>Heejun Seo</h1>
          <h2 className={cn(headingVariants({ level: 2 }), 'mb-8 text-muted-foreground')}>I build AI-powered experiences for the web.</h2>
          <p className={cn(typographyVariants({ size: 'lg' }), 'mb-12 leading-relaxed max-w-xl text-muted-foreground')}>
            I&apos;m a senior frontend developer specializing in building exceptional digital experiences with AI integration. Currently
            focused on pioneering AI-powered applications, modern web technologies, and creating accessible, human-centered products that
            leverage the latest in machine learning and intelligent automation.
          </p>
          <div className='flex gap-4 flex-wrap'>
            <Link
              href='/profile'
              className={cn(
                buttonVariants({ variant: 'brand', size: 'lg' }),
                'bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg hover:shadow-xl border border-primary/20'
              )}>
              Chat with AI →
            </Link>
            <Link
              href='#contact'
              className={cn(
                buttonVariants({ variant: 'outline', size: 'lg' }),
                'border-neon-cyan hover:bg-neon-cyan/10 hover:text-neon-cyan shadow-sm'
              )}>
              Get in Touch
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
