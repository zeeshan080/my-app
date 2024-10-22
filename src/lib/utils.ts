import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function fetchCustomerAndMeasurementData() {
  try {
    const response = await fetch('/api/viewCustomer', {
      method: 'GET',
      headers: { "Content-Type": "application/json", 
        
      },
     
    })
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch data:', error);
    throw error;
  }
}
export function mergeCustomerAndMeasurementData(customers: any[], measurements: any[]) {
  return measurements.map(measurement => {
    const customer = customers.find(cust => cust.id === measurement.customerId);
    return {
      ...measurement,
      codeId: customer ? customer.codeId : 'Unknown',
      name: customer ? customer.name : 'Unknown',
      phoneNumber: customer ? customer.phoneNumber : 'Unknown',
    };
  });
}

