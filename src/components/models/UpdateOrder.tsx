import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Loader2 } from 'lucide-react'; // Import the loader icon
import { orderFormType, orderSchema } from '@/lib/type';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import SelectItems from '../SelectItems';
import useCustomers from '@/lib/constants';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '../ui/form';
import { Label } from '../ui/label';

 type ExtendedOrderFormType = orderFormType & { name?: string };
type UpdateOrderProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  initialData: orderFormType & { id: string };
  onUpdate: (id: string, data: orderFormType) => void;
  mode: 'view' | 'edit'; 
};

export default function UpdateOrder({
  open,
  setOpen,
  initialData,
  onUpdate,
  mode, // Destructure mode prop
}: UpdateOrderProps) {
  const [formData, setFormData] = useState<orderFormType>(initialData);
  const { customerOptions, loading } = useCustomers();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<orderFormType>({
    resolver: zodResolver(orderSchema),
    defaultValues: initialData
  });

  // Reset form data when dialog opens with new data
  useEffect(() => {
    form.reset(initialData);
  }, [initialData, open]);
  const handleUpdate = async () => {
    let updatedData:ExtendedOrderFormType = form.getValues();
    console.log('Form data before update:', updatedData); // Debugging line
  
    // Remove the `name` field from updatedData
    const { name, ...dataToSend } = updatedData;
  
    setIsLoading(true);
    try {
      await onUpdate(initialData.id, dataToSend); // Send data without `name`
    } catch (error) {
      console.error('Failed to update data:', error);
    } finally {
      setIsLoading(false);
      setOpen(false);
    }
  };
  

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{mode === 'view' ? 'Order Details' : 'Edit Order'}</DialogTitle>
          <DialogDescription>
          {mode === 'view' ? 'View the details of the order.' : 'Edit the details of the order.'}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form>
          <div className="flex flex-col gap-4">
              <SelectItems form={form} customers={customerOptions} />
              <Label>Payment</Label>
              <Input
                {...form.register('payment')}
                readOnly={mode === 'view'}
              />
               <Label>Quantity</Label>
              <Input
                {...form.register('quantity')}
                readOnly={mode === 'view'}
              />
               <Label>Delivering Date</Label>
              <Input
                {...form.register('delivedDate')}
                type='date'
                readOnly={mode === 'view'}
              />
              <DialogFooter>
                {isLoading ? (
                  <Button type='button' disabled>
                    <Loader2 className='animate-spin' />
                  </Button>
                ) : mode === 'edit' ? (
                  <Button type='button' onClick={handleUpdate}>
                    Update
                  </Button>
                ) : null} 
              </DialogFooter>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
