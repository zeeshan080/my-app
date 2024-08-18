import AboutCustomer from '@/components/About/AboutCustomer';
import AboutHeroSection from '@/components/About/AboutHeroSection';
import AboutServices from '@/components/About/AboutServices';
import AboutTextSection from '@/components/About/AboutTextSection';
import { about, abouttext, client, services } from '@/lib/db';
import { aboutUsTextType, aboutUsType, clientType, serviceType } from '@/lib/type';
import { Poppins } from 'next/font/google';
import * as React from 'react';
const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

export interface IPageProps {
}

const aboutdata:aboutUsType[]=about
const aboutTextdata:aboutUsTextType[]=abouttext
const clientdata:clientType[]=client
const servicedata:serviceType[]=services



export default function Page (props: IPageProps) {
  return (
    <section className={`${poppins.className} `}>
      <AboutHeroSection aboutdata={aboutdata}/>
      <AboutTextSection aboutText={aboutTextdata}/>
      <AboutServices serivces={servicedata}/>
     { /*<AboutCustomer clients={clientdata}/>*/}
      
    </section>
  );
}
