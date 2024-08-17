import { NextRequest, NextResponse } from "next/server";
import { database } from "../../../../drizzle/database"; // Adjust the path as necessary
import {  mySchemaCustomer, mySchemaOrder } from "../../../../drizzle/schema"; // Adjust the path as necessary
import { and, eq } from "drizzle-orm";



{/*export async function GET(request: NextRequest) {
  const userId = JSON.parse(request.headers.get("userId") as string);
  console.log("userId from API route:", userId);

  try {
    // Fetch orders
    const orders = await database
      .select()
      .from(mySchemaOrder)

    // Calculate total revenue
    const totalRevenue = orders.reduce((sum, order) => sum + ((order.payment) || 0), 0);

    console.log('Orders:', orders);
    console.log('Total Revenue:', totalRevenue);
    // Return orders and total revenue
    return NextResponse.json({ orders, totalRevenue});
  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json({ error: 'Failed to retrieve data' }, { status: 500 });
  }
}*/}

 export async function GET(request: NextRequest) {
    const userId = JSON.parse(request.headers.get('userId') as string);
    console.log("userId from API route:", userId);

    try {
        console.log('Received request for orders');
  
        // Fetch orders with customer details
        const orders = await database
            .select({
                orderId: mySchemaOrder.id,
                customerId: mySchemaOrder.customerId,
                payment: mySchemaOrder.payment,
                quantity: mySchemaOrder.quantity,
                delivedDate: mySchemaOrder.delivedDate,
                name: mySchemaCustomer.name 
            })
            .from(mySchemaOrder)
            .innerJoin(
                mySchemaCustomer,
                eq(mySchemaOrder.customerId, mySchemaCustomer.id) // Correct join condition
            );

        // Format the orders data with customer names
        const formattedOrders = orders.map(order => ({
            id: order.orderId,
            customerId: order.customerId,
            name: order.name,
            payment: order.payment,
            quantity: order.quantity,
            delivedDate: order.delivedDate
        }));
        console.log('Formatted Orders:', formattedOrders);

        // Calculate total revenue
        const totalRevenue = formattedOrders.reduce((sum, order) => sum + (order.payment || 0), 0);
        console.log('Total Revenue:', totalRevenue);

        // Return both orders and total revenue
        return NextResponse.json({ orders: formattedOrders, totalRevenue });
    } catch (error) {
        console.error('Error fetching orders:', error);
        return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 });
    }
}

  
export async function POST(request: NextRequest) {
    const userId = JSON.parse(request.headers.get("userId") as string);
    console.log("userId from API route:", userId);
    try {
        // Parse the request body
        const {
            customerId,
            payment,
            quantity,
            delivedDate
        } = await request.json();
        console.log("Received data:", {
            customerId,
            payment,
            userId:userId,
            quantity,
            delivedDate
        });
        // Insert order data
        const [newOrder] = await database
            .insert(mySchemaOrder)
            .values({
                customerId,
                payment,
                userId:userId,
                quantity,
                delivedDate,
                createdat: new Date().toISOString(),
                updatedat: new Date().toISOString()
            })
            .returning(); // Return the inserted order

        return NextResponse.json({
            message: "Order added successfully",
            order: newOrder
        });
    } catch (error) {
        console.error('Error adding order:', error);
        return NextResponse.json({ error: 'Failed to add order' }, { status: 500 });
    }
}


export async function PUT(request: NextRequest) {
    const userId = JSON.parse(request.headers.get("userId") as string);
    console.log("userId from API route:", userId);

    try {
        // Parse the request body to get order details
        const {
            id,
            customerId,
            payment,
            quantity,
            delivedDate
        } = await request.json();
        console.log("Received data for update:", {
            id,
            customerId,
            payment,
            quantity,
            delivedDate
        });

        const updatedOrder = await database
            .update(mySchemaOrder)
            .set({
                id,
                customerId,
                payment,
                quantity,
                delivedDate,
                updatedat: new Date().toISOString() // Update the timestamp
            })
            .where(
                and(
                    eq(mySchemaOrder.id, id), // Ensure you're updating the correct order
                    eq(mySchemaOrder.userId, userId), // Ensure the user owns the order recordx
                )
            )
            .returning(); // Return the updated order
            
      
        console.log("updatedOrder------->",updatedOrder)
        return NextResponse.json({
            message: 'Order updated successfully',
            order: updatedOrder
        });
    } catch (error) {
        console.error('Error updating order:', error);
        return NextResponse.json({ error: 'Failed to update order' }, { status: 500 });
    }
}


export async function DELETE(request: NextRequest) {
    const userId = JSON.parse(request.headers.get("userId") as string);
    console.log("userId from API route:", userId);

    try {
        // Parse the request body to get the order ID
        const { orderId} = await request.json();
        console.log("Received data for deletion:", { orderId });

        // Ensure the order belongs to the user and delete the order
        await database
            .delete(mySchemaOrder)
            .where(
                and(
                    eq(mySchemaOrder.id, orderId), // Ensure you're deleting the correct order
                    eq(mySchemaOrder.userId, userId), // Ensure the user owns the order record
                )
            );

        return NextResponse.json({ message: 'Order deleted successfully' });
    } catch (error) {
        console.error('Error deleting order:', error);
        return NextResponse.json({ error: 'Failed to delete order' }, { status: 500 });
    }
}
