import { icons } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

type Props = {
  link: string;
  text: string;
  open?: boolean;
  icons: React.ReactNode;
  setopen?: (open: boolean) => void;
  className: string;
};

export default function Sidebaritems({ link, text, open, setopen = () => { }, className, icons, }: Props) {
  const currentPath = usePathname();
  let isActive = false;

  if (link === "/admin") {
    isActive = currentPath === link;
  } else {
    isActive = currentPath.startsWith(link);
  }

  return (
    <li className="my-1 list-none">
      <Link
        href={link}
        onClick={() => setopen(!open)}
        className={`${className ? className : ''}
         ${isActive ? 'text-[#4e1734] border-[#4e1734] bg-[#4e1734]/10  border-l-4 rounded-r-md  font-bold' : " border-none bg-none"}`}>
        {icons}
        {text}
      </Link>
    </li>
  );
}