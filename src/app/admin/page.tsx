"use client"
import { DashboardCalender } from '@/components/DashboardItems/DashboardCalender';
import DashboardCard from '@/components/DashboardItems/DashboardCard';
import { CardItems } from '@/lib/db';
import { CardType } from '@/lib/type';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import * as React from 'react';
import { useEffect, useState } from 'react';

export interface IPageProps {
}
const handleLogout = async () => {
  try {
    const response = await fetch("/api/signOutUser", {
      method: "POST",
    });

    if (response.ok) {
      window.location.href = "/signIn";
    } else {
      console.error('Failed to logout');
      alert("Failed to logout. Please try again.");
    }
  } catch (error) {
    console.error('Error during logout:', error);
    alert("An error occurred during logout. Please try again.");
  }
};
const card : CardType[]=CardItems
export default function Page (props: IPageProps) {
  const [userName, setUserName] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await fetch('/api/signInUser');
        if (!response.ok) {
          throw new Error('Failed to fetch user');
        }
        const {user} = await response.json(); // This is an array of users
        console.log("user----->", user);
        // Ensure that there is at least one user in the array
        if (user && Array.isArray(user) && user.length > 0) {
          setUserName(user[0].username); // Access the first user
        } else {
          console.warn('No user found');
        }
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user:', error);
        setLoading(false);
      }
    }
  
    fetchUser();
  }, []);
  
  return (
    <main className=" w-[95%] m-auto mt-8">
     <div className='flex  items-center justify-between'>
     <div>
        <h1 >Hello  {loading ? "Loading..." : userName || "UserName"} </h1>
      </div>
       <div className='flex p-2'>
        <Select onValueChange={(value) => {
          if (value === "logout") {
            handleLogout();
          }
        }}>
          <SelectTrigger className="w-[150px]">
          <SelectValue placeholder={loading ? "Loading..." : userName || "UserName"} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="logout">Logout</SelectItem>
          </SelectContent>
        </Select>
      </div>
     </div>
      <section className="flex  gap-6">
        <div className="flex-grow">
          <DashboardCard cards={card} />
        </div>
        <div className=' hidden md:flex'>
          <DashboardCalender />
        </div>
      </section>
    </main>
  );
}
