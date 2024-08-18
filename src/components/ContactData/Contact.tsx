"use client"
import * as React from 'react';
import Image from 'next/image';
import { Poppins } from 'next/font/google';
import { contactSchema, contactType, ContactUsType,} from '@/lib/type';
import {  useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '../ui/button';
import Contactitems from './ContactItems';
import { Calendar, CalendarArrowDown, CalendarArrowUp, Facebook, Home, Instagram, Mail, Phone, Twitter } from 'lucide-react';
import { Form } from '../ui/form';
import Contactinput from './ContactInputs';
const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

type Props = {
  contactbannner:ContactUsType[]
  
}

export default function Contact ({contactbannner}:Props) {
    const form = useForm<contactType>({
        resolver: zodResolver(contactSchema),
    });

    const addContact = async (data: contactType) => {
        try {
            const response = await fetch("/api/Contact", {
                method: "POST",
                headers: { "Content-Type": "application/json",
                 },
                body: JSON.stringify(data),
            });
    
            if (!response.ok) {
                // Check if the response is not successful
                console.error("Failed to add contact:", response.status, response.statusText);
                alert("Failed to add contact. Please try again.");
                return;
            }
    
            const { message,contact} = await response.json();
            console.log("Result:", message,contact);
            // Handle successful response, e.g., update the UI
        } catch (error) {
            console.error("Error during contact addition:", error);
            alert("An error occurred during contact addition. Please try again.");
        }
    };
    const OnSubmit = (data: contactType) => {
        console.log(data);
        addContact(data)
    };
  return (
    <section className={`${poppins.className} `}>
     <div className='hero'>
     {contactbannner.map((banner)=>(
      <div key={banner.id} className='flex flex-col items-center p-5 md:flex-row lg:p-0 m-auto' >
        <div className='text-white lg:w-[50%] lg:m-auto'>
        <h1 className='text-[20px] lg:text-[42px] font-bold'>{banner.heading}</h1>
        <p className=''>{banner.paragraph}</p>
        </div>
        <Image src={banner.image_url} alt={""} width={400} height={400} className='w-[300px] h-[300px] lg:w-[500px] lg:h-[500px]'/>
      </div>
     ))}
     </div>
     <div>
      
        <div className="flex flex-col lg:flex-row p-6 gap-10">
            <div className="grid gap-4 mt-12 md:col-span-8 md:w-[90%]  ">
            <Form {...form}>
                    <form onSubmit={form.handleSubmit(OnSubmit)} >
                    <h1 className='font-bold text-[32px]'>Send Us a Message</h1>
                    <p>Fill out the form below, and we will get back to you as soon as possible!</p>
                        <Contactinput
                            form={form}
                            name="message"
                            placeholder="Enter your message"
                            istextarea={true}
                            type="text"
                        />
                        <div className="grid grid-cols-2 gap-6">
                            <Contactinput
                                form={form}
                                name="name"
                                placeholder="Enter your name"
                                type="text"
                            />

                            <Contactinput
                                form={form}
                                name="email"
                                placeholder="Enter your email"
                                type="email"
                            />
                        </div>

                        <Contactinput
                            form={form}
                            name="subject"
                            placeholder="Enter your subject"
                            type="text"
                        />


                        <Button
                            type="submit"
                            className="rounded-none h-16 border-[1px] border-[#621940] text-[#621940] font-bold hover:bg-white  bg-white w-32"
                        >
                            SEND MESSAGE
                        </Button>
                    </form>
            </Form>
                  <div className='mt-8'>
                  <Contactitems
                        heading1='Follow Us'
                        paragraph1='Stay updated with our latest designs and offers by following us on social media:'
                        icon={<Facebook />}
                        heading="Facebook: "
                        paragraph="Your Tailor House Facebook"
                    />
                    <Contactitems
                        icon={<Instagram />}
                        heading="Instagram:"
                        paragraph="@yourtailorhouse"
                    />
                    <Contactitems
                        icon={<Twitter />}
                        heading="Twitter:"
                        paragraph="@yourtailorhouse"
                    />
                  </div>
                   

            </div>
            <div className="  w-[90%] lg:w-[50%] lg:mt-24 lg:m-auto ">
                    <Contactitems
                        heading1='Visit Us'
                        icon={<Home />}
                        heading=" Address:"
                        paragraph=" 123 Fashion Street Lahore, Punjab, Pakistan"
                    />
                    <Contactitems
                        heading1='How to Reach Us'
                        icon={<Phone />}
                        heading="Phone: "
                        paragraph="+123-456-7890"
                    />
                    <Contactitems
                        heading1=''
                        icon={<Mail />}
                        heading="Email: "
                        paragraph="contact@yourtailorhouse.com"
                    />
                    <Contactitems
                        heading1='Business Hours'
                        icon={<Calendar />}
                        heading="Monday - Friday:"
                        paragraph="9:00 AM - 6:00 PM"
                    />
                    <Contactitems
                        icon={<CalendarArrowUp />}
                        heading="Saturday: "
                        paragraph=" 10:00 AM - 4:00 PM"
                    />
                    <Contactitems
                          icon={<CalendarArrowDown />}
                          heading="Sunday:"
                          paragraph="Closed"                   />
                    </div>
            </div>
     </div>
    </section>
        
  );
}
