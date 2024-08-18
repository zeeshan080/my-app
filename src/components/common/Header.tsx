"use client";
import Link from "next/link";
import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "../ui/button";
import Navitems from "../NavItems";
import { Playball } from "next/font/google";
import Image from 'next/image';

const play = Playball({
  weight: "400",
  subsets: ["latin"],
});

type Props = {};

export default function Header({}: Props) {
  const [open, setOpen] = useState(false);

  return (
    <header>
      <div className="md:min-w-[768px] lg: max-w-[1140px] m-auto">
        <div className="flex flex-col lg:flex-row bg-white lg:items-center justify-between">
        <div className="flex items-center">
          <Link href={"/"} className='flex items-center text-[16px] lg:text-[20px]  lg:text-center relative'>
            <Image src="/images/logo.png" alt="logo" width={110} height={20} className="" />
                 <div className="absolute top-[29px] left-[120px]">
                 <h1 className={`${play.className} text-[#621940] flex gap-2`}>S.S<span
                    className={`${play.className} text-[#0b032d] `}>Tailors<span className="text-[#621940] mx-2">&</span>Garments</span>
                 </h1>
                  <p className={`${play.className} text-[#0b032d] text-sm`} >Bring your ideas to vision</p>
                 </div>
             </Link>
            
          </div>
          <div className="py-4 flex flex-col items-start bg-slate-900 lg:flex-row lg:justify-center  lg:bg-white  lg:items-center">
            <div className="lg:hidden">
              {open ? (
                <Button
                  className="bg-transparent hover:bg-transparent"
                  onClick={() => setOpen(false)}
                >
                  <X className="absolute right-5 text-white" />
                </Button>
              ) : (
                <Button className="bg-transparent hover:bg-transparent">
                  <Menu
                    className="absolute right-5 text-white"
                    onClick={() => setOpen(true)}
                  />
                </Button>
              )}
            </div>

            <div
              className={`${
                open ? "flex" : "hidden"
              } lg:flex flex-col text-white gap-5 ml-2 lg:flex-row md:gap-10 lg:text-black lg:items-center`}
            >
              <Navitems
                link={"/"}
                text={"Home"}
                setopen={setOpen}
                open={open}
              />

              <Navitems
                link={"/aboutUs"}
                text={"About Us"}
                setopen={setOpen}
                open={open}
              />

              <Navitems
                link={"/contactUs"}
                text={"Contact"}
                setopen={setOpen}
                open={open}
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}