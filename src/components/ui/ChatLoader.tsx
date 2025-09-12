export default function ChatLoader() {
  return (
    <div className='flex justify-start'>
      <div className='bg-muted/50 backdrop-blur-sm rounded-lg p-4 max-w-[80%] border border-border/50'>
        <div className='flex items-center gap-3'>
          <div className='flex gap-1'>
            <div className='w-2 h-2 bg-primary/60 rounded-full animate-pulse [animation-delay:0ms] [animation-duration:1.5s]'></div>
            <div className='w-2 h-2 bg-primary/60 rounded-full animate-pulse [animation-delay:200ms] [animation-duration:1.5s]'></div>
            <div className='w-2 h-2 bg-primary/60 rounded-full animate-pulse [animation-delay:400ms] [animation-duration:1.5s]'></div>
          </div>
          <span className='text-sm text-muted-foreground font-medium'>AI is thinking...</span>
        </div>
      </div>
    </div>
  );
}
