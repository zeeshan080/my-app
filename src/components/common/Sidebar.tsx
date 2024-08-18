"use client";
import {
  Bookmark,
  Building2Icon,
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  ListChecks,
  ListOrdered,
  Menu,
  MessageCircle,
  Users,
  Users2,
  X,
} from "lucide-react";
import * as React from "react";
import { useState } from "react";
import { Button } from "../ui/button";
import Sidebaritems from "../Sidebaritems";
import { WEBSITE_NAME } from "@/lib/constants";

export interface ISidebarProps {}

export default function Sidebar(props: ISidebarProps) {
  const [open, setOpen] = useState(false);


  return (
    <div
      className={`bg-[#A2A1A8]/20 lg:min-h-screen p-4 rounded-md my-4 ml-4 lg:w-[18%] flex flex-col`}
    >
      <aside className="w-full">
        <div className="flex justify-between items-center relative">
            <div>
              <div className="lg:pb-8 font-semibold">{WEBSITE_NAME}</div>
            </div>
           
          <div className="lg:hidden">
            {open ? (
              <Button
                className="bg-[#fcf9f9] text-black hover:bg-[#fcf9f9]"
                onClick={() => setOpen(false)}
              >
                <X />
              </Button>
            ) : (
              <Button
                className="bg-[#fcf9f9] text-black hover:bg-[#fcf9f9]"
                onClick={() => setOpen(true)}
              >
                <Menu />
              </Button>
            )}
          </div>
        </div>

        <div className={`${open ? "flex" : "hidden"} lg:flex`}>
          <ul>
            <Sidebaritems
              link={"/admin"}
              className="flex gap-3 py-4 pl-6 pr-2 whitespace-nowrap"
              icons={<LayoutDashboard size={22} />}
              text="Dashboard"
              open={open}
              setopen={setOpen}
            />
            <Sidebaritems
              link={"/admin/customer"}
              className="flex gap-3 py-4 pl-6 pr-2"
              icons={<Users size={22} />}
              text="Customers"
              open={open}
              setopen={setOpen}
            />
            <Sidebaritems
              link={"/admin/order"}
              className="flex gap-3 py-4 pl-6 pr-2"
              icons={<ListChecks size={22} />}
              text={"Orders"}
              open={open}
              setopen={setOpen}
            />
             <Sidebaritems
              link={"/admin/user"}
              className="flex gap-3 py-4 pl-6 pr-2"
              icons={<Users2 size={22} />}
              text={"Users"}
              open={open}
              setopen={setOpen}
            />
            <Sidebaritems
              link={"/admin/feedback"}
              className="flex gap-3 py-4 pl-6 pr-2"
              icons={<MessageCircle size={22} />}
              text={"Feedback"}
              open={open}
              setopen={setOpen}
            />
          </ul>
        </div>
      </aside>
    </div>
  );
}