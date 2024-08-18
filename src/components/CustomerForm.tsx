"use client"
import * as React from 'react';
import { useForm } from 'react-hook-form';
import {zodResolver} from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Poppins } from 'next/font/google';
import { CustomerFormType, customerSchema} from '@/lib/type';
import { Textarea } from './ui/textarea';
import { useState } from 'react';
import { Loader2} from 'lucide-react';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from './ui/select';
const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  subsets: ["latin"],
});
export interface ICustomerFormProps {
    
    
}

export default function CustomerForm (props: ICustomerFormProps) {
    const [isLoading, setisLoading] = useState(false);
    const form = useForm<CustomerFormType>({
        resolver:zodResolver(customerSchema),
    });


    const addCustomer = async (data: CustomerFormType) => {
        console.log("datainadding",data)
        try {
            const response = await fetch("/api/addCustomer", {
                method: "POST",
                headers: { "Content-Type": "application/json", 
                 },
                
                body: JSON.stringify(data),
            });
    
            if (!response.ok) {
                // Check if the response is not successful
                console.error("Failed to add customer:", response.status, response.statusText);
                alert("Failed to add customer. Please try again.");
                return;
            }
            const { message, customer, measurement } = await response.json();
            console.log("Result:", message, customer, measurement);
            if (customer.codeId) {
                form.setValue('codeId', customer.codeId);
            } else {
                console.error("CodeId is undefined:", customer);
            }
        } catch (error) {
            console.error("Error during customer addition:", error);
            alert("An error occurred during customer addition. Please try again.");
        }
    };
    


    const OnSubmit = (data: CustomerFormType) => {
     setisLoading(true)
        setTimeout(() => {
            addCustomer(data)
            setisLoading(false);
        }, 600);
 
    }
  return (
    <div >
        <div className=' flex items-center justify-center mt-8'>
        <Card className='w-[100%]  bg-transparent  backdrop-blur-lg  shadow-lg rounded-md border-[1px] '>
            <CardContent className='flex flex-col  my-8 w-full '>
            <Form {...form}>
            <form onSubmit={form.handleSubmit(OnSubmit)}>
            <span className={`${poppins.className} text-[32px] flex text-center justify-center font-bold`}>
                <h1 className=" text-[#621940] ">Customer</h1>
               <h1 className= "text-[#0b032d]">Form</h1>
               </span>
               <div className='grid md:grid-cols-2 md:gap-4'>
               <div>
                <FormField control={form.control} name='codeId' render={({field})=>(
                    <FormItem className='my-5'>
                    <FormLabel>CodeId (کوڈ آئی ڈی)</FormLabel>
                        <FormControl>
                            <Input {...field} type='text' placeholder='0000' readOnly/>
                        </FormControl>
                    </FormItem>
                )}/>
                 <FormField control={form.control} name='phoneNumber' render={({field})=>(
                    <FormItem className='my-5'>
                    <FormLabel>Phone Number(فون نمبر)</FormLabel>
                        <FormControl>
                            <Input {...field} type='number'  required/>
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                )}/>
                  <FormField control={form.control} name='ShirtLength' render={({field})=>(
                    <FormItem className='my-5'>
                    <FormLabel>Shirt Length(قمیض کی لمبائی)</FormLabel>
                        <FormControl>
                            <Input {...field} type='number' required/>
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                )}/>
                 <FormField control={form.control} name='Sleeve' render={({field})=>(
                    <FormItem className='my-5'>
                    <FormLabel>Sleeve (آستین)</FormLabel>
                        <FormControl>
                            <Input {...field} type='number' required/>
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                )}/>
                     <FormField control={form.control} name='Thigh' render={({field})=>(
                    <FormItem className='my-5'>
                    <FormLabel>Thigh (تیرا)</FormLabel>
                        <FormControl>
                            <Input {...field} type='number' required/>
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                )}/>
                  <FormField control={form.control} name='Chest' render={({field})=>(
                    <FormItem className='my-5'>
                    <FormLabel>Chest (چھاتی)</FormLabel>
                        <FormControl>
                            <Input {...field} type='number' required/>
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                )}/>
                  <FormField control={form.control} name='PocketSide' render={({field})=>(
                    <FormItem className='my-5'>
                    <FormLabel>Shirt Side Pocket(قمیض سائیڈ کی جیب)</FormLabel>
                        <FormControl>
                            <Input {...field} type='number' defaultValue={0}/>
                        </FormControl>
                    </FormItem>
                )}/>
                  <FormField control={form.control} name='PockectFront' render={({field})=>(
                    <FormItem className='my-5'>
                    <FormLabel>Shirt Front Pocket(قمیض سائیڈ کی جیب)</FormLabel>
                        <FormControl>
                            <Input {...field} type='number' defaultValue={0}/>
                        </FormControl>
                    </FormItem>
                )}/>
                   <FormField control={form.control} name='PocketTrouser' render={({field})=>(
                    <FormItem className='my-5'>
                    <FormLabel>Trouser Pocket(شلوار کی جیب)</FormLabel>
                        <FormControl>
                            <Input {...field} type='number' defaultValue={0}/>
                        </FormControl>
                    </FormItem>
                )}/>
                </div>
                <div>
                <FormField control={form.control} name='name' render={({field})=>(
                    <FormItem className='my-5'>
                    <FormLabel>Name(نام)</FormLabel>
                        <FormControl>
                            <Input {...field} type='text' required/>
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                )}/>
                    <FormField control={form.control} name='HemLength' render={({field})=>(
                    <FormItem className='my-5'>
                    <FormLabel>Hem(گھیر کی لمبائی)</FormLabel>
                        <FormControl>
                            <Input {...field} type='number'  required/>
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                )}/>
                 <FormField
                    control={form.control}
                    name="HemType"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Hem Type(گھیر کی قسم)</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value} >
                            <FormControl >
                            <SelectTrigger>
                                <SelectValue placeholder="Select a Type" />
                            </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                            <SelectItem value="Cilcle">Circle(گول گھیر)</SelectItem>
                            <SelectItem value="Square">Square(چوراس گھیر)</SelectItem>
                            </SelectContent>
                        </Select>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                   <FormField control={form.control} name='CollarLength' render={({field})=>(
                    <FormItem className='my-5'>
                    <FormLabel>Collar(کالر کی لمبائی)</FormLabel>
                        <FormControl>
                            <Input {...field} type='number' required/>
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                )}/>
                 <FormField
                    control={form.control}
                    name="CollarType"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Collar Type(کالر کی قسم)</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                            <SelectTrigger>
                                <SelectValue placeholder="Select a Type" />
                            </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                            <SelectItem value="Ban">Ban Collar(بان کالر)</SelectItem>
                            <SelectItem value="colllar">Simple Collar(سادہ کالر)</SelectItem>
                            </SelectContent>
                        </Select>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                 <FormField control={form.control} name='TrouserLength' render={({field})=>(
                    <FormItem className='my-5'>
                    <FormLabel>Trouser Length (شلوار کی لمبائی)</FormLabel>
                        <FormControl>
                            <Input {...field} type='number' required/>
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                )}/>
                 <FormField control={form.control} name='PantLeg' render={({field})=>(
                    <FormItem className='my-5'>
                    <FormLabel>Pant Leg (پائنچہ)</FormLabel>
                        <FormControl>
                            <Input {...field} type='number' required/>
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                )}/>
                   <FormField control={form.control} name='Shoulder' render={({field})=>(
                    <FormItem className='my-5'>
                    <FormLabel>Shoulder (کندھا)</FormLabel>
                        <FormControl>
                            <Input {...field} type='number' required/>
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                )}/>
                </div>
               </div>
               <FormField control={form.control} name='AdditionalNotes' render={({field})=>(
                    <FormItem className='my-5'>
                    <FormLabel>Additional Notes(اضافی نوٹس)</FormLabel>
                        <FormControl>
                            <Textarea {...field}/>
                        </FormControl>
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

                            <Loader2 className='animate-spin mr-2' /> Submiting...
                            </Button>
                             :
                            <Button
                                 type="submit"
                                 className="bg-[#621940]   font-bold text-[16px] tracking-wider  h-12"
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
