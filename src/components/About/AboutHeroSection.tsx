"use client"
import * as React from 'react';
import Image from 'next/image';
import { aboutUsType, } from '@/lib/type';
type Props = {
  aboutdata:aboutUsType[]
}

export default function AboutHeroSection ({aboutdata}:Props) {
  return (
    <section>
     <div className='hero'>
     {aboutdata.map((about)=>(
      <div key={about.id} className='flex flex-col items-center p-3 lg:w-[80%]  lg:p-0 m-auto md:flex-row'>
        <div className='text-white'>
        <h1 className='text-[20px] lg:text-[27px] font-bold'>{about.heading}</h1>
        <h2 className=' text-[16px]   m-auto mb-2 w-[65%] lg:text-[18px]'>{about.title}</h2>
        <p className=''>{about.paragraph}</p>
        </div>
        <Image src={about.image_url} alt={""} width={300} height={200} className='py-6'/>
      </div>
     ))}
     </div>
    </section>
        
  );
}
