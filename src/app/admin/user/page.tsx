"use client"
import Crumbs from '@/components/Crumbs';
import { userColumns } from '@/components/ViewUser/UserColumn';
import UserDataTable from '@/components/ViewUser/UserDataTable';
import { userFormType } from '@/lib/type';
import { Loader2Icon } from 'lucide-react';
import * as React from 'react';
import { useEffect, useState } from 'react';

export interface IPageProps {
}


async function fetchUserData() {
  try {
    const response = await fetch('/api/addUser');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const users = await response.json();
    console.log(users)
    return users;
  } catch (error) {
    console.error('Failed to fetch data:', error);
    throw error;
  }
}

export default function Page (props: IPageProps) {
  const [user, setUser] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function getUsers() {
      try {
        const data = await fetchUserData(); 
        console.log("data ------>",data)
        setUser(data.users); 
      } catch (error) {
        console.error('Failed to fetch data:', error);
        setError('Failed to load data');
      } finally {
        setIsLoading(false);
      }
    }

    getUsers(); 
  }, []);

  const handleUpdate = async (id: string, userData: userFormType) => {
    console.log("updateid----->", id, "orderdata----->", userData);
    try {
        const response = await fetch('/api/addUser', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id, ...userData }),
        });

        if (!response.ok) {
            throw new Error('Failed to update user');
        }

        const {user} = await response.json();
        console.log("user------------>", user);

        if (user) {
            setUser(prevData =>
                prevData.map(item => (item.id === id ? user : item))
            );
        } else {
            console.error("No user returned in response");
        }
    } catch (error) {
        console.error('Failed to update user:', error);
    }
};
const handleDelete = async (id: string) => {
    
  try {
      const response = await fetch('/api/addUser', {
          method: 'DELETE',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({id }),
      });

      if (!response.ok) {
          throw new Error('Failed to delete user');
      }

      setUser(prevData => prevData.filter(user => user.id !== id));
  } catch (error) {
      console.error('Failed to delete user:', error);
  }
}

if (isLoading) {
  return (
    <main className='min-h-[100vh] flex items-center justify-center'>
      <div className='flex items-center justify-center gap-2'>
        <p>Loading...</p>
        <Loader2Icon className='animate-spin' />
      </div>
    </main>
  );
}

if (error) {
  return <p>{error}</p>;
}
  
  return (
    <div className='w-[95%] m-auto mt-8'>
    <div className='flex gap-1'>
      <Crumbs link={'/admin'} text={'Home'}/>
      <Crumbs link={'/admin/user'} text={'User'}/>
    </div>
    <div>
      <UserDataTable columns={userColumns} data={user}  onDelete={handleDelete} onUpdate={handleUpdate}/> 
    </div>
  </div>
  );
}
