"use client"
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Poppins } from 'next/font/google';
import { orderFormType, orderSchema } from '@/lib/type';
import SelectItems from './SelectItems';
import { Loader2 } from 'lucide-react';
import { useState} from 'react';
import useCustomers from '@/lib/constants';

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  subsets: ["latin"],
});



export default function OrderForm() {
    const [isLoading, setIsLoading] = useState(false);
    const { customerOptions, loading } = useCustomers();
    const form = useForm<orderFormType>({
        resolver: zodResolver(orderSchema),
    });

    const addOrder = async (data: orderFormType) => {
        try {
            const response = await fetch("/api/addOrder", {
                method: "POST",
                headers: { "Content-Type": "application/json",
                 },
                
                body: JSON.stringify(data),
            });
    
            if (!response.ok) {
                // Check if the response is not successful
                console.error("Failed to add order:", response.status, response.statusText);
                alert("Failed to add order. Please try again.");
                return;
            }
    
            const { message,order} = await response.json();
            console.log("Result:", message,order);
            // Handle successful response, e.g., update the UI
        } catch (error) {
            console.error("Error during customer addition:", error);
            alert("An error occurred during customer addition. Please try again.");
        }
    };

    const OnSubmit = (data: orderFormType) => {
        setIsLoading(true);
        setTimeout(() => {
            console.log(data);
            addOrder(data)
            setIsLoading(false);
        }, 600);
        if (loading) {
            return <div>Loading...</div>;}
    }



    return (
        <div>
            <div className='flex items-center justify-center mt-8'>
                <Card className='w-[100%] bg-transparent backdrop-blur-lg shadow-lg rounded-md border-[1px] '>
                    <CardContent className='flex flex-col my-8 w-full '>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(OnSubmit)}>
                                <span className={`${poppins.className} text-[32px] flex text-center justify-center font-bold`}>
                                    <h1 className="text-[#621940]">Order</h1>
                                    <h1 className="text-[#0b032d]">Form</h1>
                                </span>
                                <div>
                                    <SelectItems form={form} customers={customerOptions} />
                                    <FormField control={form.control} name='payment' render={({ field }) => (
                                        <FormItem className='my-5'>
                                            <FormControl>
                                                <Input {...field} type='text' placeholder='Enter order payment' required />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )} />
                                    
                                    <FormField control={form.control} name='quantity' render={({ field }) => (
                                        <FormItem className='my-5'>
                                            <FormControl>
                                                <Input {...field} type='text' placeholder='Enter order quantity ' required />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )} />
                                    <FormField control={form.control} name='delivedDate' render={({ field }) => (
                                        <FormItem className='my-5'>
                                            <FormControl>
                                                <Input {...field} type='date' placeholder='Enter delivering date' required />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )} />
                                </div>
                                <div className='flex justify-end items-end'>
                                    {
                                        isLoading ?
                                            <Button
                                                disabled
                                                type="submit"
                                                className="bg-[#A2A1A8E5] font-bold text-[16px] tracking-wider h-12"
                                            >
                                                <Loader2 className='animate-spin mr-2' /> Loading...
                                            </Button>
                                            :
                                            <Button
                                                type="submit"
                                                className="bg-[#621940] font-bold text-[16px] tracking-wider h-12"
                                            >
                                                Submit
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
