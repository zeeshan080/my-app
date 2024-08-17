import LoginForm from '@/components/LoginForm';
import * as React from 'react';

export interface IPageProps {
}

export default function Page (props: IPageProps) {
  return (
    <main className='bg-[url(/images/login.jpeg)]'>
     <section className='hero'>
     <LoginForm/>
     </section>
    </main>
  );
}
