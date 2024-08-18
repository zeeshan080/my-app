// File: app/api/customer/add/route.ts
import { NextRequest, NextResponse } from "next/server";
import { mySchemaCustomer, mySchemaMeasurements } from "../../../../drizzle/schema";
import { database } from "../../../../drizzle/database";
import { and, eq } from "drizzle-orm";

   


export async function GET(request:NextRequest) {
    const userId = JSON.parse(request.headers.get("userId") as string);
    console.log("userId from API route:", userId);
    
    try {
        // Fetch customers from the database
        const customers = await database
            .select()
            .from(mySchemaCustomer)

        // Map the customer data to the format expected by your select component
        console.log(customers)
        const customerOptions = customers.map(customer => ({
            value: customer.id,
            label: customer.name
        }));

        return NextResponse.json(customerOptions);
    } catch (error) {
        console.error('Error fetching customers:', error);
        return NextResponse.json({ error: 'Failed to fetch customers' }, { status: 500 });
    }
}



export async function POST(request: NextRequest) {
    const userId = JSON.parse(request.headers.get("userId") as string);
    console.log("userId from API route:", userId);

    let newCustomer; // Declare newCustomer outside the try block

    try {
        // Parse the request body
        const {
            name,
            phoneNumber,
            ShirtLength,
            Sleeve,
            Thigh,
            Chest,
            HemLength,
            HemType,
            CollarLength,
            CollarType,
            TrouserLength,
            PantLeg,
            Shoulder,
            PocketSide,
            PockectFront,
            PocketTrouser,
            AdditionalNotes
        } = await request.json();

        // Insert customer data
        [newCustomer] = await database
            .insert(mySchemaCustomer)
            .values({
                name,
                phoneNumber,
                userId,
                createdat: new Date().toISOString(),
                updatedat: new Date().toISOString(),
            })
            .returning(); // Return the inserted customer

        // Generate codeId based on the new customer's id
        const nextCodeId = String(newCustomer.id).padStart(4, '0');
        console.log(nextCodeId);

        // Update the customer record with the generated codeId
        await database
            .update(mySchemaCustomer)
            .set({ codeId: nextCodeId })
            .where(eq(mySchemaCustomer.id, newCustomer.id));

        // Prepare measurements data
        const measurements = {
            customerId: newCustomer.id, // Associate measurements with the new customer
            ShirtLength,
            Sleeve,
            Thigh,
            Chest,
            HemLength,
            HemType,
            CollarLength,
            CollarType,
            TrouserLength,
            PantLeg,
            Shoulder,
            PocketSide,
            PockectFront,
            PocketTrouser,
            AdditionalNotes
        };

        // Insert measurements data
        const [newMeasurement] = await database
            .insert(mySchemaMeasurements)
            .values(measurements)
            .returning(); // Return the inserted measurements

        return NextResponse.json({
            message: "Customer and measurements added successfully",
            customer: { ...newCustomer, codeId: nextCodeId },
            measurement: newMeasurement,
        });
    } catch (error) {
        console.error('Error adding customer and measurements:', error);

        // If any error occurs, delete the customer to simulate a rollback
        if (newCustomer && newCustomer.id) {
            try {
                await database
                    .delete(mySchemaCustomer)
                    .where(eq(mySchemaCustomer.id, newCustomer.id));
                console.log(`Rolled back customer creation for customerId: ${newCustomer.id}`);
            } catch (rollbackError) {
                console.error('Error rolling back customer creation:', rollbackError);
            }
        }

        return NextResponse.json({ error: 'Failed to add customer and measurements' }, { status: 500 });
    }
}



export async function PUT(request: NextRequest) {
    const userId = JSON.parse(request.headers.get("userId") as string);
    console.log("userId from API route:", userId);

    try {
        // Parse the request body
        const {
            id,
            customerId,
            name,
            phoneNumber,
            ShirtLength,
            Sleeve,
            Thigh,
            Chest,
            HemLength,
            HemType,
            CollarLength,
            CollarType,
            TrouserLength,
            PantLeg,
            Shoulder,
            PocketSide,
            PockectFront,
            PocketTrouser,
            AdditionalNotes
        } = await request.json();
        console.log(
          " measurementid------ ",id,
           " customerId-----",customerId,
           name,
            phoneNumber,
            ShirtLength,
            Sleeve,
            Thigh,
            Chest,
            HemLength,
            HemType,
            CollarLength,
            CollarType,
            TrouserLength,
            PantLeg,
            Shoulder,
            PocketSide,
            PockectFront,
            PocketTrouser,
            AdditionalNotes

        )

        // Update the customer details
        const [updatedCustomer] = await database
            .update(mySchemaCustomer)
            .set({
                name,
                phoneNumber,
                updatedat: new Date().toISOString()
            })
            .where(
                and(
                    eq(mySchemaCustomer.id, customerId), // Ensure you're updating the correct customer
                    eq(mySchemaCustomer.userId, userId) // Ensure the user owns the customer record
                )
            )
            .returning(); // Return the updated customer


        // Update the measurements
        const [updatedMeasurement] = await database
            .update(mySchemaMeasurements)
            .set({
                ShirtLength,
                Sleeve,
                Thigh,
                Chest,
                HemLength,
                HemType,
                CollarLength,
                CollarType,
                TrouserLength,
                PantLeg,
                Shoulder,
                PocketSide,
                PockectFront,
                PocketTrouser,
                AdditionalNotes
            })
            .where(
                and(
                    eq(mySchemaMeasurements.id,id),
                )
            )
            .returning(); // Return the updated measurements

        return NextResponse.json({
            message: 'Customer and measurements updated successfully',
            customer: updatedCustomer,
            measurement: updatedMeasurement
        });
    } catch (error) {
        console.error('Error updating customer and measurements:', error);
        return NextResponse.json({ error: 'Failed to update customer and measurements' }, { status: 500 });
    }
}



export async function DELETE(request: NextRequest) {
    const userId = JSON.parse(request.headers.get("userId") as string);
    console.log("userId from API route:", userId);

    try {
        const { measurementId, customerId } = await request.json();
        console.log("Measurement ID:", measurementId, "Customer ID:", customerId);

      
        // Delete measurements
        const deleteMeasurementResult = await database
            .delete(mySchemaMeasurements)
            .where(
                and(
                    eq(mySchemaMeasurements.customerId, measurementId),
                )
            );

        console.log("Delete measurement result:", deleteMeasurementResult);
          // Delete customer
          const deleteCustomerResult = await database
          .delete(mySchemaCustomer)
          .where(
              and(
                  eq(mySchemaCustomer.id, measurementId),
                  eq(mySchemaCustomer.userId, userId) // Optional if needed
              )
          );

        

        console.log("Delete customer result:", deleteCustomerResult);

        if (deleteCustomerResult.rowCount === 0) {
            throw new Error('No customer found with the provided ID.');
        }

        return NextResponse.json({
            message: 'Customer and associated measurements deleted successfully',
            measurement: deleteMeasurementResult,
            customer: deleteCustomerResult
        });
    } catch (error) {
        console.error('Error deleting customer and measurements:', error);
        return NextResponse.json({
            error: 'Failed to delete customer and measurements',
        }, { status: 500 });
    }
}




