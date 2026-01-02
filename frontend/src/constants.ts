// Client-side URL (used in browser)
export const BASE_BACKEND_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

// Server-side URL (used in Next.js server components)
// This uses API_URL which is only available at runtime, not build time
export const SERVER_BACKEND_URL =
  process.env.API_URL || BASE_BACKEND_URL;
