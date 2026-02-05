import { redirect } from "next/navigation";

/**
 * Root Page Redirect
 * 
 * Redirects from / to /fr (default locale)
 * This ensures all traffic goes through the locale-based routing structure.
 * 
 * @requirements 3.1
 */
export const dynamic = 'force-dynamic';

export default function RootPage() {
  redirect("/fr");
}
