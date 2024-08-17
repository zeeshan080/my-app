"use client"
import * as React from 'react';
import Image from 'next/image';
import { Poppins } from 'next/font/google';
import {  clientType } from '@/lib/type';
import { Carousel, CarouselContent, CarouselItem } from '../ui/carousel';
import { Card, CardContent } from '../ui/card';
import Autoplay from 'embla-carousel-autoplay';
const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

type Props = {
  clients:clientType[]
}

export default function AboutCustomer ({clients}:Props) {
  return (
    <section className={`${poppins.className} `}>
     <div className='text-center mt-24'>
        <h1 className='text-center text-[42px] font-bold'>What Our Customers Says </h1>
        <p className='text-[14px]'>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</p>
        <div>
        <Carousel opts={{ loop: true }} plugins={[Autoplay({ delay: 3000 })]}>
            <CarouselContent>
              {clients.map((client) => (
                <CarouselItem className="p-4 basis:[100%] lg:basis-1/2 md:p-12 md:basis-[85%]" key={client.id}>
                  <Card
                    className=" shadow-white/60  backdrop-blur-lg bg-transparent border-[1px] border-[grey] shadow-lg m-auto w-[90%] p-2 md:p-4  lg:w-[100%]"
                  >
                    <CardContent className="flex flex-col gap-6">
                      <div className="flex items-center gap-2">
                      <Image
                        src={client.image}
                        alt={""}
                        width={50}
                        height={50}
                        className="rounded-full w-[50px] h-[50px]"
                      />
                        <h1 className="text-[20px] font-bold">
                          {client.name}
                        </h1>
                       
                      </div>
                      <p>{client.review}</p>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
                </div>
        
    </div>

    </section>
        
  );
}
