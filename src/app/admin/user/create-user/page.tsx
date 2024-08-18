import Crumbs from '@/components/Crumbs';
import UserForm from '@/components/UserForm';
import * as React from 'react';

export interface IPageProps {
}

export default function Page (props: IPageProps) {
  return (
    <div className='w-[95%] m-auto mt-8'>
    <div className='flex gap-1'>
    <Crumbs link={'/admin'} text={'Home'}/>
    <Crumbs link={'/admin/user'} text={'User'}/>
    <Crumbs link={'/admin/user/create-user'} text={'Add New User'}/>
    </div>
    <div>
    <UserForm />
    </div>
  </div>
  );
}
