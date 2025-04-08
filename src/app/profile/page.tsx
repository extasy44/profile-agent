import ProfileChat from '@/components/ProfileChat';

export default function ProfilePage() {
  return (
    <div className='min-h-screen bg-gray-50'>
      <div className='max-w-4xl mx-auto py-8 px-4'>
        <div className='mb-8 text-center'>
          <h1 className='text-3xl font-bold mb-2'>Heejun Seo</h1>
          <p className='text-gray-600 mb-4'>Senior Front-End / Web Developer</p>
          <p>
            Experienced front-end developer with 6+ years in JavaScript (ES6+), TypeScript, React.js, and modern web technologies.
            Passionate about building scalable, high-performance applications with a strong focus on user experience, accessibility, and
            security. Skilled in cloud computing and Agile methodologies, with a track record of optimizing codebases and delivering
            impactful solutions. Enthusiastic about AI programming and its implementation in front-end development to enhance automation,
            personalization, and intelligent user interactions. Adept at collaborating with cross-functional teams to integrate AI-driven
            features, improving efficiency and decision-making in web applications.
          </p>
          <p className='text-gray-700 max-w-2xl mx-auto'>
            Welcome! Feel free to chat with my AI assistant to learn more about my experience, skills, and projects. The AI has been trained
            on my background and can answer questions about my work history, technical expertise, and professional achievements.
          </p>
        </div>
        <ProfileChat />
      </div>
    </div>
  );
}
