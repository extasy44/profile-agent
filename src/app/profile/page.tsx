import ProfileChat from '@/components/ProfileChat';
import { tagVariants } from '@/lib/styles';

export default function ProfilePage() {
  return (
    <div className='min-h-screen bg-gradient-to-b from-gray-50 to-white'>
      <div className='max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8'>
        <div className='text-center mb-12'>
          <div className='inline-block mb-6'>
            <div className='w-24 h-24 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white text-3xl font-bold'>
              HS
            </div>
          </div>
          <h1 className='text-4xl font-bold text-gray-900 mb-2'>Heejun Seo</h1>
          <p className='text-xl text-gray-600 mb-4'>Frontend/Web Developer with Fullstack Capabilities</p>
          <div className='flex justify-center gap-4 mb-6'>
            <span className={tagVariants({ variant: 'secondary' })}>TypeScript</span>
            <span className={tagVariants({ variant: 'secondary' })}>React</span>
            <span className={tagVariants({ variant: 'secondary' })}>Next.js</span>
            <span className={tagVariants({ variant: 'secondary' })}>Node.js</span>
          </div>
          <p className='text-gray-700 max-w-2xl mx-auto text-lg leading-relaxed'>
            Welcome to my interactive profile! Feel free to chat with my AI assistant to learn more about my experience, skills, and
            projects. The AI has been trained on my professional background and can provide detailed information about my work history,
            technical expertise, and achievements.
          </p>
        </div>
        <div className='bg-white rounded-2xl shadow-xl overflow-hidden'>
          <div className='p-6 border-b border-gray-200'>
            <h2 className='text-xl font-semibold text-gray-900'>Interactive Chat</h2>
            <p className='text-gray-600 mt-1'>Ask me anything about my professional background</p>
          </div>
          <ProfileChat />
        </div>
      </div>
    </div>
  );
}
