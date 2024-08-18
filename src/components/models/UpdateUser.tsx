import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Loader2 } from 'lucide-react'; // Import the loader icon
import { userFormType } from '@/lib/type';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';


type UpdateUserProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  initialData: userFormType & { id: string }; // Include the ID with UserFormType
  onUpdate: (id: string, data: userFormType) => void; // Use UserFormType for the data parameter
  mode: 'view' | 'edit'; 
};

export default function UpdateUser({
  open,
  setOpen,
  initialData,
  onUpdate,
  mode
}: UpdateUserProps) {
  const [formData, setFormData] = useState<userFormType>(initialData);
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
        <DialogTitle>{mode === 'view' ? 'User Details' : 'Edit User'}</DialogTitle>
        <DialogDescription>
          {mode === 'view' ? 'View the details of the User.' : 'Edit the details of the User.'}
          </DialogDescription>
        </DialogHeader>
     <div>
        <div>
            <Label>User Name(نام)</Label>
            <Input
            value={formData.username}
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            className='my-3'
            readOnly={mode === 'view'} // Set readOnly based on mode
          />
          <Label>Password(فون نمبر)</Label>
          <Input
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
             className='my-2'
             readOnly={mode === 'view'} // Set readOnly based on mode
          />
          
          
         
        </div>
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
