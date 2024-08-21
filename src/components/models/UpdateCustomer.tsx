import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Loader2 } from 'lucide-react'; // Import the loader icon
import { CustomerFormType } from '@/lib/type';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger,  SelectValue } from '../ui/select';
import CustomerForm from '../CustomerForm';


type UpdateCustomerProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  initialData: CustomerFormType & { id: string }; // Include the ID with CustomerFormType
  onUpdate: (id: string, data: CustomerFormType) => void; // Use CustomerFormType for the data parameter
  mode: 'view' | 'edit'; 
};

export default function UpdateCustomer({
  open,
  setOpen,
  initialData,
  onUpdate,
  mode
}: UpdateCustomerProps) {
  const [formData, setFormData] = useState<CustomerFormType>(initialData);
  const [isLoading, setIsLoading] = useState(false);

  // Reset form data when dialog opens with new data
  useEffect(() => {
    setFormData(initialData);
  }, [initialData, open]);

  const handleUpdate = () => {
    setIsLoading(true);
    onUpdate(initialData.id, formData); // Pass the form data to the onUpdate callback
    setTimeout(() => {
      setIsLoading(false);
      setOpen(false);
    }, 2000);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen} >
      <DialogContent className='w-[700px] my-6 max-h-screen overflow-y-auto'>
        <DialogHeader>
        <DialogTitle>{mode === 'view' ? 'Customer Details' : 'Edit Customer'}</DialogTitle>
        <DialogDescription>
          {mode === 'view' ? 'View the details of the customer.' : 'Edit the details of the customer.'}
          </DialogDescription>
        </DialogHeader>
     <div>
      <div className="grid md:grid-cols-2 gap-4">
            <div>
            <Label>CodeId (کوڈ آئی ڈی)</Label>
            <Input
            value={formData.codeId}
            onChange={(e) => setFormData({ ...formData, codeId: e.target.value })}
            className='my-3'
            readOnly
          />
            <Label>Customer Name(نام)</Label>
            <Input
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className='my-3'
            readOnly={mode === 'view'} // Set readOnly based on mode
          />
          <Label>Phone Number(فون نمبر)</Label>
          <Input
            value={formData.phoneNumber}
            onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
             className='my-2'
             readOnly={mode === 'view'} // Set readOnly based on mode
          />
           <Label>Shirt Length(قمیض کی لمبائی)</Label>
          <Input
            value={formData.ShirtLength}
            onChange={(e) => setFormData({ ...formData, ShirtLength: e.target.value })}
             className='my-3'
             readOnly={mode === 'view'} // Set readOnly based on mode
          />
            <Label>Sleeve (آستین)</Label>
           <Input
            value={formData.Sleeve}
            onChange={(e) => setFormData({ ...formData, Sleeve: e.target.value })}
            className='my-3'
            readOnly={mode === 'view'} // Set readOnly based on mode
          />
          <Label>Chest(چھاتی)</Label>
           <Input
            value={formData.Chest}
            onChange={(e) => setFormData({ ...formData, Chest: e.target.value })}
            className='my-3'
            readOnly={mode === 'view'} // Set readOnly based on mode
          />
            <Label>Hem (گھیر)</Label>
            <Input
            value={formData.HemLength}
            onChange={(e) => setFormData({ ...formData, HemLength: e.target.value })}
            className='my-3'
            readOnly={mode === 'view'} // Set readOnly based on mode
          />
           <Label>Hem Type(گھیر کی قسم)</Label>
              <Select
              key={formData.HemType} 
                value={formData.HemType}
                onValueChange={(value) => setFormData({ ...formData, HemType: value })}
                disabled={mode === 'view'}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem  value="circlehem">Circle(گول گھیر)</SelectItem>
                  <SelectItem  value="squarehem">Square(چوراس گھیر)</SelectItem>
                </SelectContent>
              </Select>
            <Label>Shirt Side Pocket(قمیض سائیڈ کی جیب)</Label>
            <Input
            value={formData.PocketSide}
            onChange={(e) => setFormData({ ...formData, PocketSide: e.target.value })}
            className='my-3'
            readOnly={mode === 'view'} // Set readOnly based on mode
          />
           <Label>Shirt Front Pocket(قمیض سائیڈ کی جیب)</Label>
            <Input
            value={formData.PockectFront}
            onChange={(e) => setFormData({ ...formData, PockectFront: e.target.value })}
            className='my-3'
            readOnly={mode === 'view'} // Set readOnly based on mode
          />
           <Label>Trouser Pocket(شلوار کی جیب)</Label>
            <Input
            value={formData.PocketTrouser}
            onChange={(e) => setFormData({ ...formData, PocketTrouser: e.target.value })}
            className='my-3'
            readOnly={mode === 'view'} // Set readOnly based on mode
          />
            </div>
            <div>
            <Label>Trouser Length (شلوار کی لمبائی)</Label>
            <Input
            value={formData.TrouserLength}
            onChange={(e) => setFormData({ ...formData, TrouserLength: e.target.value })}
            className='my-3'
            readOnly={mode === 'view'} // Set readOnly based on mode
          />
          <Label>Pant Leg  (پائنچہ)</Label>
            <Input
            value={formData.PantLeg}
            onChange={(e) => setFormData({ ...formData, PantLeg: e.target.value })}
            className='my-3'
            readOnly={mode === 'view'} // Set readOnly based on mode
          />
          <Label>Shoulder (کندھا)</Label>
            <Input
            value={formData.Shoulder}
            onChange={(e) => setFormData({ ...formData, Shoulder: e.target.value })}
            className='my-3'
            readOnly={mode === 'view'} // Set readOnly based on mode
          />
            <Label>Thigh(تیرا)</Label>
            <Input
            value={formData.Thigh}
            onChange={(e) => setFormData({ ...formData, Thigh : e.target.value })}
             className='my-3'
             readOnly={mode === 'view'} // Set readOnly based on mode
          />
           <Label>Collar(کالر)</Label>
           <Input
            value={formData.CollarLength}
            onChange={(e) => setFormData({ ...formData, CollarLength : e.target.value })}
            className='my-3'
            readOnly={mode === 'view'} // Set readOnly based on mode
          />
              <Label>Collar Type(کالر کی قسم)</Label>
              <Select
                key={formData.CollarType} 
                value={formData.CollarType}
                onValueChange={(value) => setFormData({ ...formData, CollarType: value })}
                disabled={mode === 'view'}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="banCollar">Ban Collar(بان کالر)</SelectItem>
                  <SelectItem value="simpleCollar">Simple Collar(سادہ کالر)</SelectItem>
                </SelectContent>
              </Select>
          </div>
          
        </div>
        <Label>Additional Notes(اضافی نوٹس)</Label>
        <Textarea
            value={formData.AdditionalNotes}
            onChange={(e) => setFormData({ ...formData, AdditionalNotes: e.target.value })}
            className='my-3 w-[100%]'
            readOnly={mode === 'view'} // Set readOnly based on mode
          />
      </div>
      <DialogFooter>
      {isLoading ? (
                <Button type='button' disabled>
                  <Loader2 className='animate-spin' />
                </Button>
              ) : mode === 'edit' ? (
                <Button type='button' onClick={handleUpdate}>
                  Update
                </Button>
              ) : null} {/* Only show Update button in edit mode */}
      </DialogFooter>
      
      </DialogContent>
    </Dialog>
  );
}
