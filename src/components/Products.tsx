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
           <div className='mb-14'> <h1 className='text-[42px]  font-semibold text-center'>New Arrivals</h1>
           <p className='text-center'>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
           </div>
            <div className='md:grid-cols-3 lg:grid-cols-4  grid-cols-1 grid  gap-5'>
                {products.map((product) => (

                    <Card key={product.id} className='lg:h-[70vh] h-[50vh] w-full shadow-lg relative'>
                        <CardContent>
                            <Link href={`/single_product/${product.id}`}>
                                <div >
                                    <div className='absolute top-0 left-0 w-full h-[35vh] lg:h-[45vh]'>
                                    <Image
                                        src={product.image_url}
                                        className='w-full h-[35vh] lg:h-[45vh]  rounded-sm' 
                                        fill
                                        style={{ objectFit: 'cover' }}
                                        alt={product.Productname}
                                        />
                                    </div> 
                                    <div className='my-4 relative z-10 lg:top-[300px] top-[450px]'>
                                        <h1 className='text-[24px] font-bold'>{product.Productname}</h1>
                                        <p className='font-bold text-[grey] text-[18px]'>{product.catagory}</p>
                                        <span className='text-[20px]'>{product.symbol} {product.price}</span>
                                    </div>
                                </div>
                            </Link>
                        </CardContent>
                    </Card>

                ))
                }

            </div>
        </section >
    );
}