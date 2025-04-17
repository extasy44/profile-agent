'use client';

import Link from 'next/link';
import { useEffect } from 'react';

export default function Home() {
  const sections = ['About', 'Skills', 'Experience', 'Education', 'Contact'];

  useEffect(() => {
    // Smooth scroll behavior for anchor links
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a');
      if (!link?.hash) return;

      e.preventDefault();
      const section = document.querySelector(link.hash);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    };

    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  }, []);

  return (
    <div className='min-h-screen bg-[#0a192f] text-gray-300 relative'>
      {/* Side Navigation */}
      <nav className='fixed left-8 top-1/2 -translate-y-1/2 z-50 hidden lg:block'>
        <ul className='space-y-6'>
          {sections.map((section) => (
            <li key={section}>
              <a
                href={`#${section.toLowerCase()}`}
                className='flex items-center gap-4 text-gray-400 hover:text-blue-400 transition-colors group'>
                <span className='w-8 h-[1px] bg-gray-400 group-hover:bg-blue-400 group-hover:w-16 transition-all duration-300'></span>
                <span className='text-sm font-medium tracking-wider'>{section}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <main className='relative'>
        {/* Hero Section */}
        <section id='about' className='min-h-screen flex items-center py-24 relative'>
          <div className='absolute inset-0 bg-gradient-to-b from-[#0a192f] to-[#112240] pointer-events-none'></div>
          <div className='container mx-auto px-6 relative'>
            <div className='max-w-3xl'>
              <div className='text-blue-400 mb-4 ml-1 font-mono'>Hi, my name is</div>
              <h1 className='text-5xl md:text-7xl font-bold text-gray-100 mb-4'>Heejun Seo</h1>
              <h2 className='text-3xl md:text-5xl font-bold text-gray-400 mb-8'>I build things for the web.</h2>
              <p className='text-lg text-gray-400 mb-12 leading-relaxed max-w-xl'>
                I&apos;m a senior frontend developer specializing in building exceptional digital experiences. Currently, I&apos;m focused
                on building accessible, human-centered products.
              </p>
              <div className='flex gap-4'>
                <Link
                  href='/profile'
                  className='group px-8 py-4 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500/30 border border-blue-500/20 hover:border-blue-500/40'>
                  <span className='group-hover:translate-x-1 inline-block transition-transform duration-300'>Chat with AI →</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id='skills' className='py-32 relative'>
          <div className='absolute inset-0 bg-[#112240] pointer-events-none'></div>
          <div className='container mx-auto px-6 relative'>
            <div className='max-w-5xl mx-auto'>
              <h2 className='text-2xl font-semibold text-blue-400 mb-4 font-mono'>Skills</h2>
              <h3 className='text-4xl font-bold text-gray-100 mb-16'>Technical Expertise</h3>
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
                {[
                  {
                    title: 'Frontend Development',
                    skills: ['React', 'TypeScript', 'Next.js', 'Redux', 'HTML/CSS'],
                  },
                  {
                    title: 'Backend & Cloud',
                    skills: ['Node.js', 'AWS', 'Azure Cloud', 'REST APIs', 'SQL'],
                  },
                  {
                    title: 'Tools & Practices',
                    skills: ['Git', 'CI/CD', 'Jest', 'Webpack', 'Azure DevOps'],
                  },
                ].map((category, index) => (
                  <div
                    key={index}
                    className='bg-blue-500/5 p-8 rounded-lg border border-blue-500/10 hover:border-blue-500/20 transition-all duration-300 hover:translate-y-[-2px] hover:shadow-xl hover:shadow-blue-500/5'>
                    <h3 className='text-xl font-semibold text-gray-100 mb-6'>{category.title}</h3>
                    <ul className='space-y-3'>
                      {category.skills.map((skill, skillIndex) => (
                        <li key={skillIndex} className='flex items-center text-gray-400'>
                          <span className='w-2 h-2 bg-blue-400/50 rounded-full mr-3'></span>
                          {skill}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* Soft Skills */}
              <div className='mt-16'>
                <h3 className='text-2xl font-semibold text-gray-100 mb-8'>Professional Skills</h3>
                <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                  {[
                    'Problem Solving',
                    'Quick Learner',
                    'Team Collaboration',
                    'Client Communication',
                    'Solution-Oriented',
                    'Self-Motivated',
                    'Adaptability',
                    'Continuous Learning',
                  ].map((skill, index) => (
                    <div
                      key={index}
                      className='bg-blue-500/5 px-4 py-3 rounded-lg border border-blue-500/10 text-gray-400 text-sm flex items-center gap-2'>
                      <span className='w-1.5 h-1.5 bg-blue-400/50 rounded-full'></span>
                      {skill}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section id='experience' className='py-32 relative'>
          <div className='absolute inset-0 bg-[#0a192f] pointer-events-none'></div>
          <div className='container mx-auto px-6 relative'>
            <div className='max-w-5xl mx-auto'>
              <h2 className='text-2xl font-semibold text-blue-400 mb-4 font-mono'>Experience</h2>
              <h3 className='text-4xl font-bold text-gray-100 mb-16'>Where I&apos;ve Worked</h3>
              <div className='space-y-12'>
                {[
                  {
                    company: 'LMI Group',
                    role: 'Senior Frontend Developer',
                    period: 'Nov 2023 - Present',
                    description:
                      'Leading frontend development using React and TypeScript, ensuring scalable and maintainable architecture. Collaborating with product teams to define new features and optimize performance.',
                  },
                  {
                    company: 'LMI Group',
                    role: 'Frontend Developer',
                    period: 'July 2021 - Nov 2023',
                    description:
                      'Developed responsive web apps using React, Redux, and Next.js. Refactored legacy systems into component-based architecture and implemented CI/CD pipelines.',
                  },
                  {
                    company: 'Computers and Parts Land',
                    role: 'eCommerce Developer',
                    period: 'Apr 2013 - Jun 2021',
                    description:
                      'Managed Magento-based platforms with 30,000+ products, built tools for inventory and pricing, and created custom POS integrations.',
                  },
                ].map((job, index) => (
                  <div
                    key={index}
                    className='bg-blue-500/5 p-8 rounded-lg border border-blue-500/10 hover:border-blue-500/20 transition-all duration-300 hover:translate-y-[-2px] hover:shadow-xl hover:shadow-blue-500/5'>
                    <div className='flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6'>
                      <div>
                        <h3 className='text-xl font-semibold text-gray-100'>{job.company}</h3>
                        <p className='text-blue-400'>{job.role}</p>
                      </div>
                      <span className='text-gray-500 font-mono'>{job.period}</span>
                    </div>
                    <p className='text-gray-400 leading-relaxed'>{job.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Education Section */}
        <section id='education' className='py-32 relative'>
          <div className='absolute inset-0 bg-[#112240] pointer-events-none'></div>
          <div className='container mx-auto px-6 relative'>
            <div className='max-w-5xl mx-auto'>
              <h2 className='text-2xl font-semibold text-blue-400 mb-4 font-mono'>Education</h2>
              <h3 className='text-4xl font-bold text-gray-100 mb-16'>Academic Background</h3>
              <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
                {[
                  {
                    institution: 'Swinburne University',
                    degree: 'Bachelor of Information and Communication Technology',
                    period: '2011 - 2013',
                    major: 'Network Security and Design',
                  },
                  {
                    institution: 'Holmesglen Institute',
                    degree: 'Diploma of IT',
                    period: '2009 - 2011',
                    major: 'Software Development',
                  },
                  {
                    institution: 'Monash University',
                    degree: 'Data Analytics and Visualization',
                    period: '2021',
                    major: 'Bootcamp',
                  },
                ].map((edu, index) => (
                  <div
                    key={index}
                    className='bg-blue-500/5 p-8 rounded-lg border border-blue-500/10 hover:border-blue-500/20 transition-all duration-300 hover:translate-y-[-2px] hover:shadow-xl hover:shadow-blue-500/5'>
                    <h3 className='text-xl font-semibold text-gray-100 mb-3'>{edu.institution}</h3>
                    <p className='text-blue-400 mb-2'>{edu.degree}</p>
                    <p className='text-gray-400 mb-2'>{edu.major}</p>
                    <p className='text-gray-500 font-mono'>{edu.period}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id='contact' className='py-32 relative'>
          <div className='absolute inset-0 bg-[#0a192f] pointer-events-none'></div>
          <div className='container mx-auto px-6 relative'>
            <div className='max-w-3xl mx-auto text-center'>
              <h2 className='text-2xl font-semibold text-blue-400 mb-4 font-mono'>What&apos;s Next?</h2>
              <h3 className='text-4xl font-bold text-gray-100 mb-8'>Get In Touch</h3>
              <p className='text-lg text-gray-400 mb-12 leading-relaxed'>
                I&apos;m currently looking for new opportunities. Whether you have a question or just want to say hi, I&apos;ll try my best
                to get back to you!
              </p>
              <div className='flex justify-center gap-6'>
                <Link
                  href='/profile'
                  className='group px-8 py-4 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500/30 border border-blue-500/20 hover:border-blue-500/40'>
                  <span className='group-hover:translate-x-1 inline-block transition-transform duration-300'>Chat with AI →</span>
                </Link>
                <Link
                  href='mailto:seoheejun@gmail.com'
                  className='group px-8 py-4 bg-blue-500/5 hover:bg-blue-500/10 text-gray-400 hover:text-gray-300 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500/30'>
                  <span className='group-hover:translate-x-1 inline-block transition-transform duration-300'>Send Email →</span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
