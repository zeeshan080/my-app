import Crumbs from '@/components/Crumbs';
import OrderForm from '@/components/OrderForm';
import * as React from 'react';

export interface IPageProps {
}

export default function Page (props: IPageProps) {
  return (
    <div className='w-[95%] m-auto mt-8'>
      <div className='flex gap-1'>
      <Crumbs link={'/admin'} text={'Home'}/>
      <Crumbs link={'/admin/order'} text={'Order'}/>
      <Crumbs link={'/admin/order/create-order'} text={'Add New Order'}/>
      </div>
      <div>
      <OrderForm />
      </div>
    </div>
  );
}
