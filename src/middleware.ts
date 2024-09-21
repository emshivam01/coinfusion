import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Middleware function to handle authentication logic
export function middleware(request: NextRequest) {
    // Get the current pathname from the request
    const pathname = request.nextUrl.pathname

    // Determine if the current path is public (login or signup)
    const publicPath = pathname === '/login' || pathname === '/signup'

    // Get the token from cookies
    const token = request.cookies.get('token')?.value || ""

    // If the user is on a public path but has a token, redirect to the home page
    if (publicPath && token) {
        return NextResponse.redirect(new URL('/profile', request.url))
    }
    // If the user is not on a public path and doesn't have a token, redirect to the login page
    else if (!publicPath && !token) {
        return NextResponse.redirect(new URL('/login', request.url))
    }

    // If none of the above conditions are met, continue with the request
    return NextResponse.next();
}

// Path where middleware will be executed
export const config = {
    matcher: [
        '/',        // Home page
        '/signup',  // Signup page
        '/login',   // Login page
        '/profile'  // Profile page
    ]
}
