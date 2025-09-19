'use client';

import Link from 'next/link';
import { headingVariants, typographyVariants, buttonVariants } from '@/lib/styles';
import { cn } from '@/lib/utils';

export function HeroSection() {
  return (
    <section id='about' aria-labelledby='hero-title' className='relative isolate flex min-h-screen items-center py-24'>
      <div aria-hidden='true' className='pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-background/80 to-muted/20'></div>
      <div className='container mx-auto px-6 md:px-8'>
        <div className='max-w-3xl mx-auto space-y-6 text-center'>
          <div className={cn(typographyVariants({ variant: 'info', size: 'lg' }), 'font-mono neon-text')}>Hi, my name is</div>
          <h1 id='hero-title' className={cn(headingVariants({ level: 1 }), 'text-foreground neon-text-green')}>
            Heejun Seo
          </h1>
          <h2 className={cn(headingVariants({ level: 2 }), 'text-muted-foreground')}>I build AI-powered experiences for the web.</h2>
          <p className={cn(typographyVariants({ size: 'lg' }), 'leading-relaxed max-w-xl text-muted-foreground mx-auto')}>
            I&apos;m a senior frontend developer specializing in building exceptional digital experiences with AI integration. Currently
            focused on pioneering AI-powered applications, modern web technologies, and creating accessible, human-centered products that
            leverage the latest in machine learning and intelligent automation.
          </p>
          <div className='flex flex-wrap gap-4 justify-center'>
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
