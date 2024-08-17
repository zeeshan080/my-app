"use client"
import * as React from 'react';
import Image from 'next/image';
import { aboutUsTextType} from '@/lib/type';
import Link from 'next/link';

type Props = {
  aboutText:aboutUsTextType[]
}

export default function AboutTextSection ({aboutText}:Props) {
  return (
    <section>
     <div className='text-center mt-24'> 
    <h1 className='font-bold text-[42px]'>About Us</h1>
    <p>Tailoring Perfection, One Thread at a Time</p>
    <div className='mt-16 items-center'>
    {aboutText.map((aboutTexts) => (
        <div key={aboutTexts.id} className='flex p-3 m-auto items-center relative lg:w-[80%] lg:p-0'>
            <div className='absolute left-[0px] z-10 overflow-hidden'>
                <Image src={aboutTexts.image_url} alt={''} width={400} height={400} className='hidden md:flex'/>
            </div>
            <div className='bg-[#c9c1ec] p-3 relative md:ml-[200px] md:pl-[200px] lg:[100vh] xl:h-[80vh]'>
                <div className='lg:w-[80%] lg:ml-[50px] text-left'>
                    <h1 className='text-[27px] font-bold my-3 lg:w-[100%] xl:w-[60%] lg:text-[42px] lg:my-6'>{aboutTexts.heading}</h1>
                    <p className='text-[16px] md:mb-6 lg:text-[16px] xl:text-[18px]'>{aboutTexts.text}</p>
                    <p className='text-[14px]'>{aboutTexts.paragraph}</p>
                    <Link href={"/"} className='flex items-center justify-center w-[80%] md:w-[40%] mt-5 text-gray-50 bg-slate-950 py-3'>
                        <span>{aboutTexts.link}</span>
                    </Link>
                </div>
            </div>
        </div>
    ))}
</div>

     </div>
    </section>
        
  );
}
