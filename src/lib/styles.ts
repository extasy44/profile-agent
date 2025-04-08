import { cva } from 'class-variance-authority';
import { Message } from 'ai';

type MessageRole = Message['role'];

export const messageVariants = cva('flex', {
  variants: {
    role: {
      user: 'justify-end',
      assistant: 'justify-start',
      system: 'justify-start',
      data: 'justify-start',
    },
  },
  defaultVariants: {
    role: 'assistant',
  },
});

export const messageContentVariants = cva('max-w-[80%] rounded-lg p-4', {
  variants: {
    role: {
      user: 'bg-blue-600 text-white',
      assistant: 'bg-gray-50 text-gray-900',
      system: 'bg-gray-50 text-gray-900',
      data: 'bg-gray-50 text-gray-900',
    },
  },
  defaultVariants: {
    role: 'assistant',
  },
});

export const textVariants = cva('my-3 whitespace-pre-line', {
  variants: {
    role: {
      user: 'text-white',
      assistant: 'text-gray-900',
      system: 'text-gray-900',
      data: 'text-gray-900',
    },
  },
  defaultVariants: {
    role: 'assistant',
  },
});

export const linkVariants = cva('', {
  variants: {
    role: {
      user: 'text-white underline',
      assistant: 'text-blue-600 hover:underline',
      system: 'text-blue-600 hover:underline',
      data: 'text-blue-600 hover:underline',
    },
  },
  defaultVariants: {
    role: 'assistant',
  },
});

export const codeVariants = cva('', {
  variants: {
    inline: {
      true: 'bg-gray-200 dark:bg-gray-800 px-1 py-0.5 rounded',
      false: 'block bg-gray-900 text-gray-100 p-2 rounded-lg overflow-x-auto',
    },
  },
  defaultVariants: {
    inline: false,
  },
});

export const buttonVariants = cva(
  'px-4 py-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
  {
    variants: {
      variant: {
        primary: 'bg-blue-600 text-white hover:bg-blue-700',
        secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300',
        disabled: 'opacity-50 cursor-not-allowed',
      },
    },
    defaultVariants: {
      variant: 'primary',
    },
  }
);

export const inputVariants = cva('flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500');

export const selectVariants = cva('block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm');
