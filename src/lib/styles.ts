import { cva, type VariantProps } from 'class-variance-authority';

// Button variants with comprehensive design system
export const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-md',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-md',
        outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground shadow-sm',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-sm',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
        brand:
          'bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all duration-300 border border-primary/20',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

// Card variants
export const cardVariants = cva('rounded-lg border bg-card text-card-foreground shadow-sm', {
  variants: {
    variant: {
      default: '',
      elevated: 'shadow-lg hover:shadow-xl transition-shadow duration-300',
      outlined: 'border-2',
      filled: 'bg-muted',
    },
    padding: {
      none: 'p-0',
      sm: 'p-4',
      default: 'p-6',
      lg: 'p-8',
    },
  },
  defaultVariants: {
    variant: 'default',
    padding: 'default',
  },
});

// Input variants
export const inputVariants = cva(
  'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        default: '',
        error: 'border-destructive focus-visible:ring-destructive',
        success: 'border-green-500 focus-visible:ring-green-500',
      },
      size: {
        default: 'h-10',
        sm: 'h-8 text-xs',
        lg: 'h-12 text-base',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

// Badge variants
export const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-primary text-primary-foreground hover:bg-primary/80',
        secondary: 'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
        destructive: 'border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80',
        outline: 'text-foreground',
        brand: 'border-transparent bg-brand-primary text-white hover:bg-brand-primary/80',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

// Alert variants
export const alertVariants = cva(
  'relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground',
  {
    variants: {
      variant: {
        default: 'bg-background text-foreground',
        destructive: 'border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive',
        success: 'border-green-500/50 text-green-700 dark:text-green-400 [&>svg]:text-green-500',
        warning: 'border-yellow-500/50 text-yellow-700 dark:text-yellow-400 [&>svg]:text-yellow-500',
        info: 'border-blue-500/50 text-blue-700 dark:text-blue-400 [&>svg]:text-blue-500',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

// Message variants for chat
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

export const messageContentVariants = cva('max-w-[80%] rounded-lg p-4 shadow-sm', {
  variants: {
    role: {
      user: 'bg-primary text-primary-foreground',
      assistant: 'bg-card text-card-foreground border',
      system: 'bg-muted text-muted-foreground',
      data: 'bg-accent text-accent-foreground',
    },
  },
  defaultVariants: {
    role: 'assistant',
  },
});

export const textVariants = cva('my-3 whitespace-pre-line', {
  variants: {
    role: {
      user: 'text-primary-foreground',
      assistant: 'text-card-foreground',
      system: 'text-muted-foreground',
      data: 'text-accent-foreground',
    },
  },
  defaultVariants: {
    role: 'assistant',
  },
});

export const linkVariants = cva('', {
  variants: {
    role: {
      user: 'text-primary-foreground underline',
      assistant: 'text-primary hover:underline',
      system: 'text-primary hover:underline',
      data: 'text-primary hover:underline',
    },
  },
  defaultVariants: {
    role: 'assistant',
  },
});

export const codeVariants = cva('font-mono text-sm', {
  variants: {
    inline: {
      true: 'bg-muted px-1.5 py-0.5 rounded',
      false: 'block bg-muted p-4 rounded-lg overflow-x-auto',
    },
  },
  defaultVariants: {
    inline: false,
  },
});

// Navigation variants
export const navVariants = cva('flex items-center space-x-1', {
  variants: {
    orientation: {
      horizontal: 'flex-row',
      vertical: 'flex-col space-x-0 space-y-1',
    },
    size: {
      sm: 'text-sm',
      default: 'text-base',
      lg: 'text-lg',
    },
  },
  defaultVariants: {
    orientation: 'horizontal',
    size: 'default',
  },
});

export const navItemVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'hover:bg-accent hover:text-accent-foreground',
        active: 'bg-accent text-accent-foreground',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
      },
      size: {
        sm: 'h-8 px-3',
        default: 'h-10 px-4',
        lg: 'h-12 px-6',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

// Typography variants
export const headingVariants = cva('scroll-m-20 font-semibold tracking-tight', {
  variants: {
    level: {
      1: 'text-4xl lg:text-5xl',
      2: 'text-3xl lg:text-4xl',
      3: 'text-2xl lg:text-3xl',
      4: 'text-xl lg:text-2xl',
      5: 'text-lg lg:text-xl',
      6: 'text-base lg:text-lg',
    },
  },
  defaultVariants: {
    level: 1,
  },
});

export const typographyVariants = cva('leading-7', {
  variants: {
    variant: {
      default: 'text-foreground',
      muted: 'text-muted-foreground',
      destructive: 'text-destructive',
      success: 'text-green-600 dark:text-green-400',
      warning: 'text-yellow-600 dark:text-yellow-400',
      info: 'text-blue-600 dark:text-blue-400',
    },
    size: {
      sm: 'text-sm',
      default: 'text-base',
      lg: 'text-lg',
      xl: 'text-xl',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
});

// Animation variants
export const animationVariants = cva('', {
  variants: {
    type: {
      fadeIn: 'animate-fade-in',
      slideUp: 'animate-slide-up',
      slideDown: 'animate-slide-down',
      scaleIn: 'animate-scale-in',
      bounceSubtle: 'animate-bounce-subtle',
    },
    delay: {
      none: '',
      sm: 'delay-100',
      default: 'delay-200',
      lg: 'delay-300',
    },
  },
  defaultVariants: {
    type: 'fadeIn',
    delay: 'none',
  },
});

// Export types for better TypeScript support
export type ButtonVariants = VariantProps<typeof buttonVariants>;
export type CardVariants = VariantProps<typeof cardVariants>;
export type InputVariants = VariantProps<typeof inputVariants>;
export type BadgeVariants = VariantProps<typeof badgeVariants>;
export type AlertVariants = VariantProps<typeof alertVariants>;
export type MessageVariants = VariantProps<typeof messageVariants>;
export type NavVariants = VariantProps<typeof navVariants>;
export type NavItemVariants = VariantProps<typeof navItemVariants>;
export type HeadingVariants = VariantProps<typeof headingVariants>;
export type TypographyVariants = VariantProps<typeof typographyVariants>;
export type AnimationVariants = VariantProps<typeof animationVariants>;
