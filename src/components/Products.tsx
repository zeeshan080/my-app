import { Card, CardContent } from '@/components/ui/card';
import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Allproduct } from '@/lib/type';

type Props = {
    products: Allproduct[]
}

export default function Product({ products }: Props) {
    return (
        <section className='w-[90%] mt-16 m-auto'>
            <div className='mb-14'>
                <h1 className='text-[42px] font-semibold text-center'>New Arrivals</h1>
                <p className='text-center'>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            </div>
            <div className='md:grid-cols-3 lg:grid-cols-4 grid-cols-1 grid gap-5'>
                {products.map((product) => (
                    <Card key={product.id} className='h-[50vh] w-full shadow-lg p-0  lg:h-[70vh] '>
                        <CardContent className='p-0'>
                            <Link href={`/single_product/${product.id}`}>
                                <div className='h-full  flex flex-col'>
                                    <div className=' relative w-full h-[35vh] lg:h-[45vh]'>
                                        <Image
                                            src={product.image_url}
                                            className='rounded-sm object-cover'
                                            alt={product.Productname}
                                            fill
                                        />
                                    </div>
                                    <div className='p-4'>
                                        <h1 className='text-[24px] font-bold'>{product.Productname}</h1>
                                        <p className='font-bold text-[grey] text-[18px]'>{product.catagory}</p>
                                        <span className='text-[20px]'>{product.symbol} {product.price}</span>
                                    </div>
                                </div>
                            </Link>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </section>
    );
}
