'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { ThemeSwitcher } from '@/components/ThemeSwitcher';
import { MobileNavigation } from '@/components/MobileNavigation';
import { SideNavigation } from '@/components/SideNavigation';
import { HeroSection } from '@/components/HeroSection';
import { headingVariants, typographyVariants, cardVariants, animationVariants, buttonVariants } from '@/lib/styles';
import { cn } from '@/lib/utils';
import { skillCategories, professionalSkills, workExperience, education } from '@/data/portfolio';

const SECTIONS = ['About', 'Skills', 'Experience', 'Education', 'Contact'];

export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a');
      if (!link?.hash) return;

      e.preventDefault();
      const section = document.querySelector(link.hash);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  }, []);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <div className='min-h-screen bg-background text-foreground relative tech-grid-dark'>
      {/* Theme Switcher */}
      <div className='fixed top-6 right-6 z-50'>
        <ThemeSwitcher />
      </div>

      {/* Navigation Components */}
      <MobileNavigation sections={SECTIONS} isOpen={isMobileMenuOpen} onToggle={toggleMobileMenu} onClose={closeMobileMenu} />
      <SideNavigation sections={SECTIONS} />

      {/* Animated background elements */}
      <div className='fixed inset-0 overflow-hidden pointer-events-none'>
        <div className='absolute top-1/4 left-1/4 w-96 h-96 bg-neon-cyan/10 rounded-full blur-3xl animate-pulse'></div>
        <div className='absolute top-3/4 right-1/4 w-80 h-80 bg-neon-purple/10 rounded-full blur-3xl animate-pulse delay-1000'></div>
        <div className='absolute bottom-1/4 left-1/3 w-64 h-64 bg-neon-green/10 rounded-full blur-3xl animate-pulse delay-2000'></div>
      </div>

      <main className='relative'>
        <HeroSection />

        {/* Skills Section */}
        <section id='skills' className='py-32 relative'>
          <div className='absolute inset-0 bg-muted/10 pointer-events-none'></div>
          <div className='container mx-auto px-6 relative lg:ml-32'>
            <div className='max-w-5xl mx-auto'>
              <div className={cn(typographyVariants({ variant: 'info' }), 'mb-4 font-mono neon-text-purple')}>Skills</div>
              <h2 className={cn(headingVariants({ level: 2 }), 'mb-16 neon-text-green')}>Technical Expertise</h2>
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
                {skillCategories.map((category, index) => (
                  <div
                    key={index}
                    className={cn(
                      'glass-morphism-dark rounded-xl p-6 backdrop-blur-sm border border-neon-cyan/20',
                      'hover:border-neon-cyan/40 hover:shadow-lg hover:shadow-neon-cyan/10',
                      'tech-hover transition-all duration-300',
                      animationVariants({ type: 'slideUp', delay: index === 0 ? 'sm' : index === 1 ? 'default' : 'lg' })
                    )}>
                    <div className='mb-6'>
                      <h3 className={cn(headingVariants({ level: 4 }), 'neon-text-green')}>{category.title}</h3>
                    </div>
                    <div className='flex flex-wrap gap-2'>
                      {category.skills.map((skill, skillIndex) => (
                        <span
                          key={skillIndex}
                          className='px-3 py-1.5 bg-neon-cyan/10 text-neon-cyan text-sm rounded-full border border-neon-cyan/30 hover:bg-neon-cyan/20 hover:border-neon-cyan/50 transition-all duration-300 hover:scale-105'>
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Professional Excellence */}
              <div className='mt-16'>
                <h3 className={cn(headingVariants({ level: 3 }), 'mb-8 text-center neon-text-green')}>Professional Excellence</h3>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                  {professionalSkills.map((section, index) => (
                    <div
                      key={index}
                      className={cn(
                        'glass-morphism-dark rounded-xl p-6 backdrop-blur-sm border border-neon-cyan/20 hover:border-neon-cyan/40 tech-hover'
                      )}>
                      <div className={cn('w-full h-1 rounded-full mb-4 neon-glow', `bg-${section.color}`)}></div>
                      <h4 className={cn(headingVariants({ level: 5 }), 'mb-4 neon-text-green')}>{section.title}</h4>
                      <div className='space-y-2'>
                        {section.skills.map((skill, skillIndex) => (
                          <div key={skillIndex} className='flex items-center gap-2 text-sm text-muted-foreground'>
                            <span className={cn('w-2 h-2 rounded-full pulse-neon', `bg-${section.color}`)}></span>
                            {skill}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Learner & Adaptability */}
              <div className='mt-12 text-center'>
                <div
                  className={cn(
                    'glass-morphism-dark rounded-xl p-8 backdrop-blur-sm border border-neon-cyan/20 hover:border-neon-cyan/40 tech-hover max-w-4xl mx-auto'
                  )}>
                  <div className='flex items-center justify-center gap-3 mb-4'>
                    <span className='text-3xl pulse-neon'>⚡</span>
                    <h3 className={cn(headingVariants({ level: 3 }), 'neon-text-green')}>Quick Learner & AI Enthusiast</h3>
                  </div>
                  <p className={cn(typographyVariants({ variant: 'muted', size: 'lg' }), 'max-w-2xl mx-auto')}>
                    With 6+ years of frontend development experience, I&apos;m passionate about building scalable, high-performance applications
                    with a strong focus on user experience, accessibility, and security. Enthusiastic about AI programming and its
                    implementation in frontend development to enhance automation, personalization, and intelligent user interactions. I
                    thrive on learning new technologies quickly and applying them to solve real-world problems.
                  </p>
                  <div className='flex flex-wrap justify-center gap-3 mt-6'>
                    {[
                      '6+ Years Experience',
                      'AI Integration Expert',
                      'Performance Optimizer',
                      'Accessibility Advocate',
                      'Cloud Computing',
                    ].map((trait, index) => (
                      <span
                        key={index}
                        className={cn(
                          'px-4 py-2 bg-neon-purple/10 text-neon-purple text-xs rounded-full border border-neon-purple/30 hover:bg-neon-purple/20 hover:border-neon-purple/50 transition-all duration-300 hover:scale-105'
                        )}>
                        {trait}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section id='experience' className='py-32 relative'>
          <div className='absolute inset-0 bg-background pointer-events-none'></div>
          <div className='container mx-auto px-6 relative lg:ml-32'>
            <div className='max-w-5xl mx-auto'>
              <div className={cn(typographyVariants({ variant: 'info' }), 'mb-4 font-mono')}>Experience</div>
              <h2 className={cn(headingVariants({ level: 2 }), 'mb-16')}>Where I&apos;ve Worked</h2>
              <div className='space-y-12'>
                {workExperience.map((job, index) => (
                  <div
                    key={index}
                    className={cn(
                      cardVariants({ variant: 'elevated', padding: 'lg' }),
                      'tech-hover',
                      animationVariants({ type: 'slideUp', delay: index === 0 ? 'sm' : index === 1 ? 'default' : 'lg' })
                    )}>
                    <div className='flex flex-col md:flex-row md:items-center md:justify-between mb-4'>
                      <div>
                        <h3 className={cn(headingVariants({ level: 4 }), 'text-primary')}>{job.role}</h3>
                        <p className={cn(typographyVariants({ variant: 'info', size: 'lg' }), 'font-semibold')}>{job.company}</p>
                      </div>
                      <span className={cn(typographyVariants({ variant: 'muted' }), 'text-sm mt-2 md:mt-0')}>{job.period}</span>
                    </div>
                    <p className={cn(typographyVariants({ variant: 'muted', size: 'default' }), 'mb-4 leading-relaxed')}>
                      {job.description}
                    </p>
                    <div className='flex flex-wrap gap-2'>
                      {job.highlights.map((highlight, highlightIndex) => (
                        <span
                          key={highlightIndex}
                          className='px-3 py-1 bg-primary/10 text-primary text-xs rounded-full border border-primary/20'>
                          {highlight}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Education Section */}
        <section id='education' className='py-32 relative'>
          <div className='absolute inset-0 bg-muted/10 pointer-events-none'></div>
          <div className='container mx-auto px-6 relative lg:ml-32'>
            <div className='max-w-5xl mx-auto'>
              <div className={cn(typographyVariants({ variant: 'info' }), 'mb-4 font-mono')}>Education</div>
              <h2 className={cn(headingVariants({ level: 2 }), 'mb-16')}>Academic Background</h2>
              <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
                {education.map((edu, index) => (
                  <div
                    key={index}
                    className={cn(
                      cardVariants({ variant: 'elevated', padding: 'lg' }),
                      'tech-hover text-center',
                      animationVariants({ type: 'slideUp', delay: index === 0 ? 'sm' : index === 1 ? 'default' : 'lg' })
                    )}>
                    <h3 className={cn(headingVariants({ level: 5 }), 'text-primary mb-2')}>{edu.degree}</h3>
                    <p className={cn(typographyVariants({ variant: 'info', size: 'sm' }), 'font-semibold mb-2')}>{edu.institution}</p>
                    <p className={cn(typographyVariants({ variant: 'muted', size: 'sm' }), 'mb-3')}>{edu.period}</p>
                    <p className={cn(typographyVariants({ variant: 'muted', size: 'sm' }), 'leading-relaxed')}>{edu.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id='contact' className='py-32 relative'>
          <div className='absolute inset-0 bg-gradient-to-b from-background to-muted/20 pointer-events-none'></div>
          <div className='container mx-auto px-6 relative lg:ml-32'>
            <div className='max-w-3xl mx-auto text-center'>
              <div className={cn(typographyVariants({ variant: 'info' }), 'mb-4 font-mono neon-text-purple')}>What&apos;s Next?</div>
              <h2 className={cn(headingVariants({ level: 2 }), 'mb-8 neon-text-green')}>Get In Touch</h2>
              <p className={cn(typographyVariants({ size: 'lg' }), 'mb-12 leading-relaxed text-muted-foreground')}>
                I&apos;m currently looking for new opportunities. Whether you have a question or just want to say hi, I&apos;ll try my best
                to get back to you!
              </p>
              <div className='flex justify-center gap-6 flex-wrap'>
                <Link
                  href='/profile'
                  className={cn(buttonVariants({ variant: 'brand', size: 'lg' }), 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg hover:shadow-xl border border-primary/20')}>
                  Chat with AI →
                </Link>
                <Link
                  href='mailto:seoheejun@gmail.com'
                  className={cn(buttonVariants({ variant: 'outline', size: 'lg' }), 'border-neon-cyan hover:bg-neon-cyan/10 hover:text-neon-cyan shadow-sm')}>
                  Send Email →
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
