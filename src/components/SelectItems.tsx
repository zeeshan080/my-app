"use client"
import * as React from 'react';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from './ui/select';
import { Input } from './ui/input';
import { FormControl, FormField, FormItem, FormMessage } from './ui/form';
import { UseFormReturn } from 'react-hook-form';
import { orderFormType } from '@/lib/type';
import { useEffect, useState } from 'react';

// Define types
type Customer = {
  value: string;
  label: string;
};

type Props = {
  customers: Customer[];
  form: UseFormReturn<orderFormType>;
};

// Searchable Select component
export default function SelectItems({ customers, form }: Props) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const filteredCustomers = customers.filter(customer =>
    customer.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    // When the value in the form changes, update the selectedCustomer state
    const customer = customers.find(cust => cust.value === form.getValues('customerId'));
    if (customer) {
      setSelectedCustomer(customer);
    }
  }, [form.getValues('customerId'), customers,form])
 
  return (
    <FormField control={form.control} name='customerId' render={({ field }) => (
      <FormItem>
        <FormControl>
          <Select
            value={field.value} 
            onValueChange={(value) => {
            console.log('Selected value in SelectItems:', value);
            const customer = customers.find(cust => cust.value === value);
            if (customer) {
              setSelectedCustomer(customer); // Update the state with the selected customer
            }
            console.log(selectedCustomer)
            form.setValue('customerId', value, { shouldValidate: true });
            field.onChange(value); 
            field.onBlur(); 
            }}
          >
            <SelectTrigger>
            <SelectValue placeholder="Select a Customer">
            {selectedCustomer ? selectedCustomer.label : "Select a customer"}
            </SelectValue>
            </SelectTrigger>
            <SelectContent>
              <div className="p-2">
                <Input
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="mb-2"
                />
                {filteredCustomers.length > 0 ? (
                  filteredCustomers.map((customer) => (
                    <SelectItem key={customer.value} value={customer.value}>
                      {customer.label}
                    </SelectItem>
                  ))
                ) : (
                  <SelectItem disabled value="no-customers-found">
                    No customers found
                  </SelectItem>
                )}
              </div>
            </SelectContent>
          </Select>
        </FormControl>
        <FormMessage />
      </FormItem>
    )} />
  );
}
