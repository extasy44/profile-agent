'use client';

import { useState } from 'react';

interface MobileNavigationProps {
  sections: string[];
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
}

export function MobileNavigation({ sections, isOpen, onToggle, onClose }: MobileNavigationProps) {
  return (
    <>
      {/* Mobile Menu Button */}
      <div className='fixed top-6 left-6 z-50 lg:hidden'>
        <button
          onClick={onToggle}
          className='p-2 rounded-md bg-background/80 backdrop-blur-sm border border-border hover:bg-accent transition-colors'
          aria-label='Toggle mobile menu'>
          <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
            {isOpen ? (
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
            ) : (
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 6h16M4 12h16M4 18h16' />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className='fixed inset-0 z-40 lg:hidden'>
          <div className='absolute inset-0 bg-background/80 backdrop-blur-sm' onClick={onClose}></div>
          <nav className='absolute top-20 left-6 right-6 bg-card border border-border rounded-lg shadow-lg p-6'>
            <ul className='space-y-4'>
              {sections.map((section) => (
                <li key={section}>
                  <a
                    href={`#${section.toLowerCase()}`}
                    className='block py-3 px-4 text-foreground hover:bg-accent hover:text-accent-foreground rounded-md transition-colors font-medium'
                    onClick={onClose}>
                    {section}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </>
  );
}
