import { NextRequest, NextResponse } from 'next/server';
import { database } from '../../../../drizzle/database';
import { mySchemaCustomer, mySchemaMeasurements } from '../../../../drizzle/schema';

export async function GET(request: NextRequest) {
  const userId = JSON.parse(request.headers.get("userId") as string);
  console.log("userId from API route:", userId)
  try {
    // Fetch customer details
    const customers = await database
      .select()
      .from(mySchemaCustomer);

    // Fetch measurement details
    const measurements = await database
      .select()
      .from(mySchemaMeasurements);
    return NextResponse.json({ customers, measurements });
  } catch (error) {
    console.error('Error fetching data:', error);
    return NextResponse.json({ error: 'Failed to retrieve data' }, { status: 500 });
  }
}
