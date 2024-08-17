"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";

import React from "react";



type Props = {
  link: string;
  text: string;
  open: boolean;
  setopen(open: boolean): void;

};

export default function Navitems({ link, text, open, setopen, }: Props) {
  const currentPath = usePathname();
  const isActive = currentPath === link;


  return (
    <div>
      <ul>
        <li>
          <Link
            href={link}
            onClick={() => setopen(!open)}
            className={`${isActive ? 'text-white lg:text-[#621940] underline' : 'text-white lg:text-black'}`}
          >
            {text}
          </Link>
        </li>
      </ul>
    </div >
  );
}