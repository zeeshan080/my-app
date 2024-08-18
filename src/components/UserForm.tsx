"use client"
import * as React from 'react';
import { useForm } from 'react-hook-form';
import {zodResolver} from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Poppins } from 'next/font/google';
import { userFormType, userSchema } from '@/lib/type';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';
const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  subsets: ["latin"],
});
export interface IUserFormProps {
}

export default function UserForm (props: IUserFormProps) {
    const [isLoading, setisLoading] = useState(false);
    const form = useForm<userFormType>({
        resolver:zodResolver(userSchema),
    });
    const addUser = async (data: userFormType) => {
        if (data.password == data.confirmpassword) {
        try {
          const res = await fetch("/api/addUser", {
            method: "POST",
            headers: { "Content-Type": "application/json" }, // Include headers to indicate JSON payload
            body: JSON.stringify(data),

          });
      
          if (res.ok) {
            // Response is successful, proceed with redirection
            const response = await res.json(); // Parse the response body
            console.log(response);
            alert(response.message); // Show any message from the server (optional)
          } else {
            // Response is not successful, handle the error
            console.error("Failed to add user:", res.status, res.statusText);
            alert("Failed to add user. Please check your credentials.");
          }
        } catch (error) {
          // Handle any errors that occurred during fetch
          console.error("Error during add user:", error);
          alert("An error occurred during add user. Please try again.");
        }
      };
    }
      
    const OnSubmit = (data: userFormType) => {
        
        setisLoading(true)

        setTimeout(() => {
            console.log(data);
            addUser(data)
            setisLoading(false);
        },600);
       
    }
  return (
    <div >
        <div className='flex items-center justify-center w-[100%] mt-12'>
        <Card className=' md:w-[500px] lg:w-[700px] bg-transparent  backdrop-blur-lg  shadow-lg rounded-md border-[1px] '>
            <CardContent className='my-8'>
            <Form {...form}>
            <form className=" w-full"onSubmit={form.handleSubmit(OnSubmit)}>
            <span className={`${poppins.className} text-[32px] flex text-center justify-center font-bold`}>
                <h1 className=" text-[#621940] ">Add</h1>
               <h1 className= "text-[#0b032d]">User</h1>
               </span>
                <FormField control={form.control} name='username' render={({field})=>(
                    <FormItem className='my-5'>
                        <FormControl>
                            <Input {...field} type='text' placeholder='Enter your username' required/>
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                )}/>
                 <FormField control={form.control} name='password' render={({field})=>(
                    <FormItem className='my-5'>
                        <FormControl>
                            <Input {...field} type='password' placeholder='Enter your password' required/>
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                )}/>
                    <FormField control={form.control} name='confirmpassword' render={({field})=>(
                    <FormItem className='my-5'>
                        <FormControl>
                            <Input {...field} type='confirmpassword' placeholder='Enter your confirmpassword' required/>
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                )}/>
                <div className='flex justify-end items-end'>
               {
                    isLoading ?
                        <Button
                            disabled
                            type="submit"
                            className="bg-[#A2A1A8E5] font-bold text-[16px] tracking-wider  h-12"
                            >

                            <Loader2 className='animate-spin mr-2' /> Adding...
                            </Button>
                             :
                            <Button
                                 type="submit"
                                 className="bg-[#621940]   font-bold text-[16px] tracking-wider  h-12"
                                >
                                Add
                            </Button>
                            } 
                </div>      
            </form>
           </Form>
            </CardContent>
        </Card>
        </div>
    </div>
  );
}
