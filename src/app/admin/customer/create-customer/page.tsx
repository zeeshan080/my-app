import Crumbs from '@/components/Crumbs';
import CustomerForm from '@/components/CustomerForm';
import * as React from 'react';

export interface IPageProps {
}

export default function Page (props: IPageProps) {
  return (
      
    <div className='w-[95%] m-auto mt-8'>
      <div className='flex gap-1'>
      <Crumbs link={'/admin'} text={'Home'}/>
      <Crumbs link={'/admin/customer'} text={'Customer'}/>
      <Crumbs link={'/admin/customer/create-customer'} text={'Add New Customer'}/>
      </div>
    <div>
      <CustomerForm />
    </div>
    </div>
  );
}
