"use client"
import * as React from 'react';
import { useForm } from 'react-hook-form';
import {zodResolver} from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Playball, Poppins } from 'next/font/google';
import { Checkbox } from './ui/checkbox';
import Link from 'next/link';
import { LoginFormSchema, LoginFormType } from '@/lib/type';
import Image from 'next/image';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';
import Forgotpassword from './models/Forgotpassword';
const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  subsets: ["latin"],
});
export interface IloginFormProps {
}

export default function LoginForm (props: IloginFormProps) {
    const [isLoading, setisLoading] = useState(false);
    const [open, setopen] = useState(false);
    const form = useForm<LoginFormType>({
        resolver:zodResolver(LoginFormSchema),
    });
    const addUser = async (data: LoginFormType) => {
        try {
          const res = await fetch("api/signInUser", {
            method: "POST",
            headers: { "Content-Type": "application/json" }, // Include headers to indicate JSON payload
            body: JSON.stringify({  password: data.password,username: data.username }),

          });
      
          if (res.ok) {
            // Response is successful, proceed with redirection
            const response = await res.json(); // Parse the response body
            console.log(response);
            alert(response.message); // Show any message from the server (optional)
            window.location.href = "/admin"; // Redirect to /admin
          } else {
            // Response is not successful, handle the error
            console.error("Failed to login user:", res.status, res.statusText);
            alert("Failed to login user. Please check your credentials.");
          }
        } catch (error) {
          // Handle any errors that occurred during fetch
          console.error("Error during login:", error);
          alert("An error occurred during login. Please try again.");
        }
      };
      
    const OnSubmit = (data: LoginFormType) => {
        
        setisLoading(true)

        setTimeout(() => {
            console.log(data);
            addUser(data)
            setisLoading(false);
        },600);
       
    }
  return (
    <div >
        <div className='flex items-center justify-center w-[100%] h-[100vh]'>
        <Card className=' md:w-[500px] lg:w-[700px] bg-transparent  backdrop-blur-lg  shadow-lg rounded-md border-[1px] '>
            <CardContent className='flex flex-col lg:flex-row items-center my-8'>
            <Form {...form}>
            <form className=" w-full lg:w-[50%] "onSubmit={form.handleSubmit(OnSubmit)}>
            <span className={`${poppins.className} text-[32px] flex text-center justify-center font-bold`}>
                <h1 className=" text-[#621940] ">Sign</h1>
               <h1 className= "text-[#0b032d]">In</h1>
               </span>
               <p className="text-center  text-[#c9c1ec]  mb-[16px]"> Enter SignIn details to get access</p>

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
                <div className='flex justify-between'>
                <FormField control={form.control} name='remember' render={({field})=>(
                    <FormItem className='flex items-center gap-1'>
                        <FormControl>
                        <Checkbox
                        className='mt-2'
                        checked={field.value}
                         onCheckedChange={(checked: boolean) => field.onChange(checked)}
                            />
                        </FormControl>
                        <FormLabel className='text-[#c9c1ec] '>Remember me</FormLabel>
                        <FormMessage/>
                    </FormItem>
                )}/>
              <Link href={""} onClick={() => { setopen(true) }} className='text-[#c9c1ec] '>
                    Forgot Password?
                </Link>
                </div>
                <Forgotpassword open={open} setopen={setopen} />
                {
                    isLoading ?
                        <Button
                            disabled
                            type="submit"
                            className="bg-[#A2A1A8E5] font-bold text-[16px] rounded-full tracking-wider  mt-3 w-full  h-12"
                            >

                            <Loader2 className='animate-spin mr-2' /> Loging in...
                            </Button>
                             :
                            <Button
                                 type="submit"
                                 className="bg-[#621940]   font-bold text-[16px] rounded-full tracking-wider  mt-3 w-full  h-12"
                                >
                                SignIn
                            </Button>
                            }       
            </form>
        </Form>
        <div className='w-[50%] hidden lg:flex '>
        <Image src={"/images/form2.png"} alt='image'width={400} height={500}/>
        </div>
            </CardContent>
        </Card>
        </div>
    </div>
  );
}
