'use client';

import BusinessProfile from '@/components/BusinessProfile';
import StarRating from '@/components/StarRating';

const sampleData = {
  business_name: 'Bunnings',
  company_overview: {
    name: 'Bunnings',
    industry: 'home improvement and outdoor living retail',
  },
  business_data: {
    number_of_locations:
      'Over 513 locations, including 282 large warehouse stores, 67 smaller format stores, and 32 trade centres across Australia and New Zealand. Additionally, it owns 31 Tool Kit Depot stores and 115 Beaumont Tiles stores.',
    number_of_employees: 'Nearly 53,000',
    revenue: 'AUD 17.8 billion for the 2022 financial year',
    parent_company: 'Wesfarmers',
    key_executives: [
      {
        name: 'Michael Schneider',
        role: 'Managing Director',
      },
    ],
  },
  anzsic_classification: {
    anzsic_codes_with_description: [
      {
        code: '42310',
        description: 'Hardware and Building Supplies Retailing',
      },
      {
        code: '42310010',
        description: 'Bathroom Or Toilet Fittings Retailing',
      },
      {
        code: '42310035',
        description: 'Ceramic Floor Or Wall Tile Retailing',
      },
      {
        code: '42310045',
        description: 'Domestic Hardware Retailing',
      },
      {
        code: '42310062',
        description: 'Garden Tool Retailing',
      },
      {
        code: '42310100',
        description: 'Hardware Retailing',
      },
      {
        code: '42310125',
        description: 'Lawn Mower Retailing',
      },
    ],
  },
};

export default function BusinessPage() {
  return (
    <div className='min-h-screen bg-gray-100 py-8'>
      <div className='max-w-4xl mx-auto mb-4 px-6'>
        <StarRating rating={4.5} className='mb-2' />
        <p className='text-sm text-gray-600'>Business Rating</p>
      </div>
      <BusinessProfile data={sampleData} />
    </div>
  );
}
