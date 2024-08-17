"use client"
import * as React from 'react';
import Image from 'next/image';
import {  serviceType } from '@/lib/type';


type Props = {
  serivces:serviceType[]
}

export default function AboutServices ({serivces}:Props) {
  return (
    <section>
     <div className=' text-center mt-24'>
           <h1 className='font-bold text-[42px]'>Why use our service?</h1>
            <p className='  text-[14px] m-auto md:w-[50%] md:text-[16px]'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros.
            </p>
     </div>
     <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-10 my-24 w-[90%] m-auto'>
       {serivces.map((serivce)=>(
                    <div key={serivce.id} >
                        <Image src={serivce.image} alt='' width={60} height={60}/>
                        <h1 className='font-semibold text-[27px] mt-3'>{serivce.heading}</h1>
                        <p className='mt-3'>{serivce.paragraph}</p>
                    </div>
         ))}
    </div>
    </section>
  );
}
