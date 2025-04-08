export default function ChatLoader() {
  return (
    <div className='flex justify-start'>
      <div className='bg-gray-100 rounded-lg p-3 max-w-[80%]'>
        <div className='flex gap-2'>
          <div className='w-2 h-2 bg-gray-400 rounded-full animate-bounce' />
          <div className='w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-.3s]' />
          <div className='w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-.5s]' />
        </div>
      </div>
    </div>
  );
}
