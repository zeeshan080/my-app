import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        // Clear the authentication token cookie
        const response = NextResponse.redirect(new URL("/signIn", request.url));
        
        // Set the token cookie to an empty value with an expiration date in the past
        response.cookies.set("token", "", {
            httpOnly: true,
            expires: new Date(0), // Cookie expiration in the past to clear it
        });
        
        return response;
    } catch (error) {
        console.error('Error during logout:', error);
        return NextResponse.json({ error: 'Failed to logout' }, { status: 500 });
    }
}
