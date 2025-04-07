'use client';

import StarIcon from './icons/StarIcon';

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function StarRating({ rating, maxRating = 5, size = 'md', className = '' }: StarRatingProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
  };

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      {[...Array(maxRating)].map((_, index) => (
        <StarIcon
          key={index}
          className={`${sizeClasses[size]} ${index < rating ? 'text-yellow-400' : 'text-gray-300'}`}
          filled={index < rating}
        />
      ))}
    </div>
  );
}
