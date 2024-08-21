"use client"
import Link from "next/link";
import React from "react";
import { Poppins } from "next/font/google";
import { Facebook, Instagram, Twitter } from "lucide-react";
import { Playball } from "next/font/google";
import FooterLinks from "../FooterLinks";
import Image from "next/image";
import { WEBSITE_NAME } from "@/lib/constants";


const play = Playball({
    weight: "400",
    subsets: ["latin"],
});
const poppins = Poppins({
    weight: ["100", "200", "300", "400", "500", "600", "700"],
    subsets: ["latin"],
});


export default function Footer() {
    return (
        <footer className={`${poppins.className}  md:py-6 hero text-white mt-24`}>
            <div className="grid grid-cols-1 pl-4 gap-6 md:grid-cols-5">
                <div className="md:col-span-2">
                <div className="flex items-center">
          <Link href={"/"} className='flex items-center relative text-[16px]  mt-3 lg:text-[20px]  lg:text-center lg:m-0 '>
            <Image src="/images/logo.png" alt="logo" width={110} height={20} className="" />
                 <div className="absolute top-[29px] left-[120px] text-[#c9c1ec] ">
                 <h1 className={`${play.className}   flex lg:gap-2`}>S.S<span
                    className={`${play.className}  `}>Tailors<span className="mx-2">&</span>Garments</span>
                 </h1>
                  <p className={`${play.className} text-sm`} >Bring your ideas to vision</p>
                 </div>
             </Link>
            
          </div>
                    <p className="mt-8 xl:w-[60%]">
                        Small, artisan label that offers a thoughtfully curated collection
                        of high quality everyday essentials made.
                    </p>

                    <div className="flex items-center gap-3 my-4">
                        <Link href={""} className="p-2 rounded-[5px] bg-gray-300">
                            <Twitter className="w-5 h-5 text-slate-950" />
                        </Link>
                        <Link href={""} className="p-2 rounded-[5px] bg-gray-300">
                            <Facebook className="w-5 h-5 text-slate-950" />
                        </Link>{" "}
                        <Link href={""} className="p-2 rounded-[5px] bg-gray-300">
                            <Instagram className="w-5 h-5 text-slate-950" />
                        </Link>
                    </div>
                </div>

                <div>
                    <h3 className="text-lg font-bold text-[#c9c1ec] ">Company</h3>
                    <ul>
                        <FooterLinks href={"about"} title={"About"} />
                        <FooterLinks href={""} title={"Terms of Use"} />
                        <FooterLinks href={""} title={"Privacy Ploicy"} />
                        <FooterLinks href={""} title={"How it Works"} />
                        <FooterLinks href={"contact"} title={"Contact Us"} />
                    </ul>
                </div>

                <div>
                    <h3 className="text-lg font-bold text-[#c9c1ec] ">Support</h3>
                    <ul>
                        <FooterLinks href={""} title={"Support Carrer"} />
                        <FooterLinks href={""} title={"24h Service"} />
                        <FooterLinks href={""} title={"Quick Chat"} />
                    </ul>
                </div>

                <div>
                    <h3 className="text-lg font-bold text-[#c9c1ec] ">Contact</h3>
                    <ul>
                        <FooterLinks href={""} title={"Whatsapp"} />
                        <FooterLinks href={""} title={"Support 24h"} />
                    </ul>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 p-4 gap-2 lg:p-9 border-t-[1px] border-[#c9c1ec]">
                <div>Copyright © 2024 <b>{WEBSITE_NAME}</b></div>
            </div>
        </footer>
    );
}