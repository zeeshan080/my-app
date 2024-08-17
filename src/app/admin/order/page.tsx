"use client";
import { orderColumn } from '@/components/ViewOrder/OrderColumn';
import OrderDataTable from '@/components/ViewOrder/OrderDataTable';
import { useEffect, useState } from 'react';
import { Loader2Icon } from 'lucide-react'; // Ensure you have this icon installed
import { orderFormType} from '@/lib/type';
import Crumbs from '@/components/Crumbs';

export interface IPageProps {}




async function fetchOrderData() {
  try {
    const response = await fetch('/api/addOrder');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const orders = await response.json();
    console.log(orders)
    return orders;
  } catch (error) {
    console.error('Failed to fetch data:', error);
    throw error;
  }
}

export default function Page(props: IPageProps) {
  const [order, setOrder] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleDelete = async (orderId: string) => {
    
    try {
        const response = await fetch('/api/addOrder', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({orderId }),
        });
  
        if (!response.ok) {
            throw new Error('Failed to delete customer');
        }
  
        setOrder(prevData => prevData.filter(order => order.id !== orderId));
    } catch (error) {
        console.error('Failed to delete customer:', error);
    }
  };
  const handleUpdate = async (id: string, orderData: orderFormType) => {
    console.log("updateid----->", id, "orderdata----->", orderData);
    try {
        const response = await fetch('/api/addOrder', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id, ...orderData }),
        });

        if (!response.ok) {
            throw new Error('Failed to update order');
        }

        const {order} = await response.json();
        console.log("order------------>", order);

        if (order) {
            setOrder(prevData =>
                prevData.map(item => (item.id === id ? order : item))
            );
        } else {
            console.error("No order returned in response");
        }
    } catch (error) {
        console.error('Failed to update order:', error);
    }
};
  useEffect(() => {
    async function getOrders() {
      try {
        const data = await fetchOrderData(); 
        console.log("data ------>",data)
        setOrder(data.orders); 
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
      <Crumbs link={'/admin/order'} text={'Order'}/>

      </div>
      <div>
        <OrderDataTable columns={orderColumn} data={order} onDelete={handleDelete}  onUpdate={handleUpdate}/>
      </div>
    </div>
  );
}
