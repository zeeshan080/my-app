import Contact from '@/components/ContactData/Contact';
import { contactUs } from '@/lib/db';
import { ContactUsType } from '@/lib/type';
import * as React from 'react';

export interface IPageProps {
}
const contact:ContactUsType[]=contactUs
export default function Page (props: IPageProps) {
  return (
    <div>
      <Contact contactbannner={contact}/>
      
    </div>
  );
}
