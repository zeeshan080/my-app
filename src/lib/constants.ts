export const WEBSITE_NAME='S.S Tailors & Garments'

import { useState, useEffect } from 'react';

const useCustomers = () => {
    const [customerOptions, setCustomerOptions] = useState<{ value: string; label: string }[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchCustomers() {
            try {
                const response = await fetch('/api/addCustomer');
                if (!response.ok) {
                    throw new Error('Failed to fetch customers');
                }
                const data = await response.json();
               console.log("data from contant-->",data)
                setCustomerOptions(data);
            } catch (error) {
                console.error('Error fetching customers:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchCustomers();
    }, []);

    return { customerOptions, loading };
};

export default useCustomers;
