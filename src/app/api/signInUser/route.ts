import { NextRequest, NextResponse } from "next/server";
import { database } from "../../../../drizzle/database";
import { mySchemaUsers } from "../../../../drizzle/schema";
import { eq,and } from "drizzle-orm";
import { cookies } from "next/headers";
import * as jose from "jose";




export async function GET(request: NextRequest) {
  try {
    // Get the token from cookies
    const cookieStore = cookies();
    const tokenCookie = cookieStore.get("token");

    if (!tokenCookie) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    // Extract the token as a string
    const token = tokenCookie.value;

    // Verify the JWT token
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error("JWT_SECRET is not defined");
    }

    const { payload } = await jose.jwtVerify(token, new TextEncoder().encode(secret));

    // Extract the user ID from the token payload
    const userId = Number(payload.id); // Ensure userId is a number

    // Fetch user details from the database
    const user = await database
      .select()
      .from(mySchemaUsers)
      .where(eq(mySchemaUsers.id, userId)) // Use `eq` correctly

      console.log("user---->",user)

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    // Return user details
    return NextResponse.json(user);

  } catch (error) {
    console.error("Error fetching user details:", error);
    return NextResponse.json({ error: "Failed to fetch user details" }, { status: 500 });
  }
}


export async function POST(request: NextRequest) {
    try {
      const { password ,username } = await request.json();
      
      console.log("Login attempt for:", username);
  
      // Log the beginning of the query execution
      console.log("Executing database query...");
  
      const users = await database
        .select()
        .from(mySchemaUsers)
        .where(
          and(eq(mySchemaUsers.username, username), eq(mySchemaUsers.password, password))
        );
  
      // Log the result of the query
      console.log("Database query result:", users);
  
      if (users.length > 0) {
        const secret = process.env.JWT_SECRET;
        if (!secret) {
          throw new Error("JWT_SECRET is not defined");
        }
  
        const alg = "HS256";
        const jwt = await new jose.SignJWT({
          username: users[0].username,
          id: users[0].id,
        })
          .setProtectedHeader({ alg })
          .setIssuedAt()
          .setExpirationTime("2h")
          .sign(new TextEncoder().encode(secret));
  
        cookies().set("token", jwt, {
          httpOnly: true,
        });
  
        console.log("User logged in successfully:", users[0]);
  
        return NextResponse.json({ message: "User logged in successfully", user: users[0] });
      }
  
      console.warn("Invalid login attempt for:", username);
      return NextResponse.json({ message: "Wrong username or password" }, { status: 401 });
    } catch (error) {
      console.error("Error processing login request:", error);
      return NextResponse.json({ error: "Failed to process request" }, { status: 500 });
    }
  }