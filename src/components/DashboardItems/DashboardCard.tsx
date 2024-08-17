"use client"
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CardType,} from "@/lib/type";

type Props = {
  cards: CardType[];
};

export default function DashboardCard({ cards }: Props) {
  const [cardDasboard, setCards] = useState<CardType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const   fetchDashboardData = async ()=> {
    try {
      // Fetch customer and order data
      const [customerResponse, orderResponse] = await Promise.all([
        fetch('/api/viewCustomer'), // Assuming this endpoint returns customers
        fetch('/api/addOrder')    // Assuming this endpoint returns orders
      ]);
  
      if (!customerResponse.ok || !orderResponse.ok) {
        throw new Error('Failed to fetch data');
      }
  
      const { customers } = await customerResponse.json();
      const { orders ,totalRevenue} = await orderResponse.json();
  
      return { customers, orders,totalRevenue };
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
      throw error;
    }
  }
  useEffect(() => {
    async function loadData() {
      try {
        const { customers, orders,totalRevenue } = await fetchDashboardData();
        const updatedCards: CardType[] = [
          {
            id: 1,
            heading: 'Total Customers',
            value: customers.length,
           // update: 'Updated at ' + new Date().toLocaleDateString()
          },
          {
            id: 2,
            heading: 'Total Orders',
            value: orders.length,
           // update: 'Updated at ' + new Date().toLocaleDateString()
          },
          {
            id: 3,
            heading: 'Total Revenue',
            value: `${totalRevenue.toFixed(2)} PKR`, 
           // update: 'Updated at ' + new Date().toLocaleDateString()
          }
        ];
        setCards(updatedCards);
      } catch (error) {
        setError('Failed to load data');
      } finally {
        setIsLoading(false);
      }
    }

    loadData();
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

 


  return (
    <section>
      
    
      <div className="grid md:grid-cols-2 gap-4 mt-6">
        {cardDasboard.map((card) => (
          <Card key={card.id}>
            <CardHeader>
              <CardTitle>{card.heading}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-bold text-[20px]">{card.value}</p>
              <hr className="mb-3"/>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
