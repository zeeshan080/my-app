import { NextRequest, NextResponse } from "next/server";
import { database } from "../../../../drizzle/database";
import { mySchemaUsers } from "../../../../drizzle/schema";
import { eq,and } from "drizzle-orm";


export async function GET(request: NextRequest) {

  try {
    // Fetch orders
    const users = await database
    .select()
    .from(mySchemaUsers)
    console.log('users:', users);
    return NextResponse.json({ users});
  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json({ error: 'Failed to retrieve data' }, { status: 500 });
  }
}


export async function POST(request: NextRequest) {
    const {username,password} =await request.json()
    const users =await database.insert(mySchemaUsers).values(
    {
        username: username,
        password:password
    }
    )
    console.log("User add in successfully:", users);
  
    return NextResponse.json({ message: "User logged in successfully", user: users});
  }


  export async function PUT(request: NextRequest) {
    try {
        // Parse the request body to get order details
        const {
            id,
           username,
           password,
        } = await request.json();
        console.log("Received data for update:", {
          id,
          username,
          password,
        });

        const updatedUsers = await database
            .update(mySchemaUsers)
            .set({
              id,
              username,
              password,
              updatedat: new Date().toISOString() // Update the timestamp
            })
            .where(
                and(
                    eq(mySchemaUsers.id, id), // Ensure you're updating the correct order
                )
            )
            .returning(); // Return the updated order
            
      
        console.log("updatedUser------->",updatedUsers)
        return NextResponse.json({
            message: 'user updated successfully',
            user: updatedUsers
        });
    } catch (error) {
        console.error('Error updating user:', error);
        return NextResponse.json({ error: 'Failed to update user' }, { status: 500 });
    }
}


export async function DELETE(request: NextRequest) {
    try {
        // Parse the request body to get the order ID
        const {id} = await request.json();
        console.log("Received data for deletion:", { id });

        // Ensure the order belongs to the user and delete the order
        await database
            .delete(mySchemaUsers)
            .where(
                and(
                    eq(mySchemaUsers.id, id), // Ensure you're deleting the correct order
                )
            );

        return NextResponse.json({ message: 'user deleted successfully' });
    } catch (error) {
        console.error('Error deleting user:', error);
        return NextResponse.json({ error: 'Failed to delete user' }, { status: 500 });
    }
}


  