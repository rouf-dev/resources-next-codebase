import createMiddleware from "next-intl/middleware";
import { locales, defaultLocale } from "./i18n/config";
import { NextRequest } from "next/server";

// Create the next-intl middleware with custom locale detection
const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,
  
  // Custom locale detection function
  localeDetection: true,
  
  // Use locale prefix strategy
  localePrefix: 'always' as const,
});

export default function middleware(request: NextRequest) {
  // Check for stored locale preference in cookie (set by client)
  const storedLocale = request.cookies.get('NEXT_LOCALE')?.value;
  
  // If we have a stored preference and it's valid, use it
  if (storedLocale && locales.includes(storedLocale as any)) {
    const response = intlMiddleware(request);
    
    // Ensure cookie persists
    response.cookies.set('NEXT_LOCALE', storedLocale, {
      maxAge: 31536000, // 1 year
      path: '/',
    });
    
    return response;
  }
  
  // Otherwise, let next-intl handle detection (browser locale -> default)
  return intlMiddleware(request);
}

export const config = {
  // Match only internationalized pathnames
  matcher: ["/", "/(id|en)/:path*"],
};
