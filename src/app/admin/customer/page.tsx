"use client"
import CustomerDataTable from '@/components/ViewCustomer/CustomerDataTable';
import * as React from 'react';
import { customerColumns} from '@/components/ViewCustomer/CutomerColumn';
import { useEffect, useState } from 'react';
import { Loader2Icon } from 'lucide-react';
import { CustomerFormType } from '@/lib/type';
import Crumbs from '@/components/Crumbs';

export interface ICustomerProps {}

export async function fetchCustomerAndMeasurementData() {
  try {
    const response = await fetch('/api/viewCustomer', {
      method: 'GET',
      headers: { "Content-Type": "application/json", 
        
      },
     
    })
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch data:', error);
    throw error;
  }
}
export function mergeCustomerAndMeasurementData(customers: any[], measurements: any[]) {
  return measurements.map(measurement => {
    const customer = customers.find(cust => cust.id === measurement.customerId);
    return {
      ...measurement,
      codeId: customer ? customer.codeId : 'Unknown',
      name: customer ? customer.name : 'Unknown',
      phoneNumber: customer ? customer.phoneNumber : 'Unknown',
    };
  });
}




export default function Customer(props: ICustomerProps) {
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleUpdate = async (id: string, customerData: CustomerFormType) => {
    console.log(id, customerData);
    try {
        const response = await fetch('/api/addCustomer', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({id, ...customerData }),
        });

        if (!response.ok) {
            throw new Error('Failed to update customer');
        }

        const { customer, measurement } = await response.json(); // Correctly destructure response
        console.log(customer, measurement);

        setData(prevData =>
            prevData.map(item =>
                item.id === id ? { ...item, ...customer, measurements: measurement } : item
            )
        );
    } catch (error) {
        console.error('Failed to update customer:', error);
    }
};

  
const handleDelete = async (customerId: string, measurementId: string) => {
  console.log("customerId ------>", customerId, "measurementId----->", measurementId);
  try {
      const response = await fetch('/api/addCustomer', { // Ensure this matches your API route
          method: 'DELETE',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ measurementId, customerId }),
      });

      if (!response.ok) {
          throw new Error('Failed to delete customer and measurement');
      }
      const { customer, measurement } = await response.json();
      console.log(customer, measurement);

      // Update state to remove the deleted customer and measurement
      setData(prevData => prevData.filter(item => item.id !== customerId));
  } catch (error) {
      console.error('Failed to delete customer and measurement:', error);
  }
};

  
  
  useEffect(() => {
    async function getData() {
      try {
        const { customers, measurements } = await fetchCustomerAndMeasurementData();
        const combinedData = mergeCustomerAndMeasurementData(customers, measurements);
        setData(combinedData);
      } catch (error) {
        setError('Failed to load data');
      } finally {
        setIsLoading(false);
      }
    }
    getData();
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
        <Crumbs link={'/admin/customer'} text={'Customer'}/>
      </div>
      <div>
        <CustomerDataTable columns={customerColumns} data={data}  onDelete={handleDelete} onUpdate={handleUpdate}/> 
      </div>
    </div>
  );
}
