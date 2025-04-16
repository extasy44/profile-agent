'use client';

import ProfileChat from '@/components/ProfileChat';
import Link from 'next/link';

export default function ProfilePage() {
  return (
    <div className='min-h-screen bg-[#0a192f] text-gray-300'>
      <div className='max-w-6xl mx-auto py-16 px-4 sm:px-6 lg:px-8'>
        <div className='text-center mb-16'>
          <div className='inline-block mb-8'>
            <Link
              href='/'
              className='block w-28 h-28 rounded-full bg-blue-500/10 border-2 border-blue-400/20 hover:bg-blue-500/20 hover:border-blue-400/30 transition-all duration-300 flex items-center justify-center text-blue-400 text-3xl font-mono'>
              HS
            </Link>
          </div>
          <h1 className='text-5xl font-bold text-gray-100 mb-4'>Heejun Seo</h1>
          <p className='text-xl text-blue-400 mb-6 font-semibold'>Frontend/Web Developer with Fullstack Capabilities</p>
          {/* <div className='flex justify-center gap-3 mb-8 flex-wrap'>
            {['TypeScript', 'React', 'Next.js', 'Node.js'].map((tech) => (
              <span key={tech} className='px-4 py-2 bg-blue-500/5 text-blue-400 rounded-lg border border-blue-500/10 text-sm font-mono'>
                {tech}
              </span>
            ))}
          </div> */}
          <p className='text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed'>
            Welcome to my interactive profile! Feel free to chat with my AI assistant to learn more about my experience, skills, and
            projects. The AI has been trained on my professional background and can provide detailed information about my work history,
            technical expertise, and achievements.
          </p>
        </div>
        <div className='bg-[#112240] rounded-2xl border border-blue-500/10 overflow-hidden'>
          <div className='p-8 border-b border-blue-500/10'>
            <h2 className='text-2xl font-semibold text-gray-100 mb-2'>Interactive Chat</h2>
            <p className='text-gray-400'>Ask me anything about my professional background</p>
          </div>
          <ProfileChat />
        </div>
      </div>
    </div>
  );
}
