import React from 'react';

const CardSkeleton = () => {
  return (
    <article className='w-fit animate-pulse rounded-2xl border border-gray-700 p-4'>
      <div>
        <div className='mb-5 h-5 w-[150px] rounded-full bg-slate-700'></div>
        <div className='my-2 h-5 w-[310px] rounded-full bg-slate-700'></div>
        <div className='my-5 h-[200px] w-[310px] rounded-lg bg-slate-700'></div>
      </div>

      <div>
        <ul className='flex items-start gap-4'>
          <li className='my-2 h-7 w-[80px] rounded-full bg-slate-700'></li>
          <li className='my-2 h-7 w-[80px] rounded-full bg-slate-700'></li>
          <li className='my-2 h-7 w-[80px] rounded-full bg-slate-700'></li>
        </ul>
      </div>
    </article>
  );
};

export const LoadingSkeleton = ({ num = 3 }) => {
  return (
    <div className='mx-auto max-w-[1200px]'>
      <div className='grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3'>
        {[...Array(num)].map((_it, index) => {
          return <CardSkeleton key={index} />;
        })}
      </div>
    </div>
  );
};
