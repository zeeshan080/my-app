"use client";
import React from "react";
import { Carousel, CarouselContent, CarouselItem } from "./ui/carousel";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import { Poppins } from "next/font/google";
import Link from "next/link";
import { bannerType } from "@/lib/type";

const poppins = Poppins({
    weight: ["100", "200", "300", "400", "500", "600", "700"],
    subsets: ["latin"],
});

type Props = { bannerdata: bannerType[] };

export default function Hero({ bannerdata }: Props) {
    return (
        <div className="hero lg:h-[80vh]">
            <Carousel
                opts={{ loop: true }}
                plugins={[
                    Autoplay({
                        delay: 3000,
                    }),
                ]}
            >
                <CarouselContent>
                    {bannerdata.map((bannerdatas) => {
                        return (
                            <CarouselItem key={bannerdatas.id}>
                                <section className={`${poppins.className} text-white lg:h-screen flex lg:justify-evenly px-6  gap-10 lg:px-0`}>
                                    <div className="mt-0 py-6 lg:mt-24 lg:w-[50%] lg:px-12 lg:py-0"  >
                                        <h1 className={`text-[54px]  font-extrabold`}>{bannerdatas.heading}</h1>
                                        <p>{bannerdatas.paragraph}</p>
                                        <Link href={"/aboutUs"} className={`flex items-center justify-center w-[80%] md:w-[30%] mt-5 text-gray-50 bg-slate-950 py-3 `}>
                                            <span>{bannerdatas.button}</span>
                                        </Link>
                                    </div>
                                    <div className="md:flex hidden">
                                        <Image
                                            className="w-[100%] h-[80vh]"
                                            src={bannerdatas.image_url}
                                            alt={""}
                                            width={500}
                                            height={200}
                                        />

                                    </div>
                                </section>

                            </CarouselItem>
                        );
                    })}
                </CarouselContent>
            </Carousel>
        </div>
    );
}
