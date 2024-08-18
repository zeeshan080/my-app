import { NextRequest, NextResponse } from "next/server";
import { database } from "../../../../drizzle/database"; // Adjust the path as necessary
import {  mySchemaContact } from "../../../../drizzle/schema"; // Adjust the path as necessary
import { and, eq } from "drizzle-orm";



export async function GET(request: NextRequest) {

  try {
    // Fetch orders
    const contact = await database
      .select()
      .from(mySchemaContact)
    console.log('contact:', contact);
    return NextResponse.json({ contact});
  } catch (error) {
    console.error('Error fetching contact:', error);
    return NextResponse.json({ error: 'Failed to retrieve data' }, { status: 500 });
  }
}



  
export async function POST(request: NextRequest) {
    try {
        // Parse the request body
        const {
            message,
            name,
            email,
            subject,
        } = await request.json();
        console.log("Received data:", {
            message,
            name,
            email,
            subject,
        });
        // Insert order data
        const [newContact] = await database
            .insert(mySchemaContact)
            .values({
                message,
                name,
                email,
                subject,
                createdat: new Date().toISOString(),
                updatedat: new Date().toISOString()
            })
            .returning(); // Return the inserted order

        return NextResponse.json({
            message: "contact added successfully",
            contact: newContact
        });
    } catch (error) {
        console.error('Error adding contact:', error);
        return NextResponse.json({ error: 'Failed to add contact' }, { status: 500 });
    }
}




export async function DELETE(request: NextRequest) {
    try {
        // Parse the request body to get the order ID
        const { id} = await request.json();
        console.log("Received data for deletion:", { id });

        // Ensure the order belongs to the user and delete the order
        await database
            .delete(mySchemaContact)
            .where(
                and(
                    eq(mySchemaContact.id, id), // Ensure you're deleting the correct order
                )
            );
        return NextResponse.json({ message: 'feedback deleted successfully' });
    } catch (error) {
        console.error('Error deleting feedback:', error);
        return NextResponse.json({ error: 'Failed to delete feedback' }, { status: 500 });
    }
}
