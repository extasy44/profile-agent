'use client';

interface SideNavigationProps {
  sections: string[];
}

export function SideNavigation({ sections }: SideNavigationProps) {
  return (
    <nav className='fixed left-8 top-1/2 -translate-y-1/2 z-40 hidden lg:block' aria-label='Main navigation'>
      <ul className='space-y-6'>
        {sections.map((section) => (
          <li key={section}>
            <a
              href={`#${section.toLowerCase()}`}
              className='flex items-center gap-4 text-muted-foreground hover:text-primary transition-colors group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-md'
              aria-label={`Navigate to ${section} section`}>
              <span className='w-8 h-[1px] bg-muted-foreground group-hover:bg-primary group-hover:w-16 transition-all duration-300'></span>
              <span className='text-sm font-medium tracking-wider'>{section}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
