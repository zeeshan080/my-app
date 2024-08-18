"use client";
import { useEffect, useState } from 'react';
import { Loader2Icon } from 'lucide-react'; // Ensure you have this icon installed
import { orderFormType} from '@/lib/type';
import Crumbs from '@/components/Crumbs';
import FeedbackDatatable from '@/components/ViewFeedback/FeedbackDatatable';
import { feedbackColumns } from '@/components/ViewFeedback/FeedbackColumn';

export interface IPageProps {}




async function fetchContactData() {
  try {
    const response = await fetch('/api/Contact');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const contact = await response.json();
    console.log(contact)
    return contact;
  } catch (error) {
    console.error('Failed to fetch data:', error);
    throw error;
  }
}

export default function Page(props: IPageProps) {
  const [feedback, setFeedback] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    
    try {
        const response = await fetch('/api/Contact', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({id }),
        });
  
        if (!response.ok) {
            throw new Error('Failed to delete Contact');
        }
  
        setFeedback(prevData => prevData.filter(contact => contact.id !== id));
    } catch (error) {
        console.error('Failed to delete Contact:', error);
    }
  };
 
  useEffect(() => {
    async function getOrders() {
      try {
        const data = await fetchContactData(); 
        console.log("data ------>",data)
        setFeedback(data.contact); 
      } catch (error) {
        console.error('Failed to fetch data:', error);
        setError('Failed to load data');
      } finally {
        setIsLoading(false);
      }
    }

    getOrders(); // Call the async function
  }, []);

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
      <Crumbs link={'/admin/feedback'} text={'Feedback'}/>

      </div>
      <div>
        <FeedbackDatatable columns={feedbackColumns} data={feedback} onDelete={handleDelete}/>
      </div>
    </div>
  );
}
