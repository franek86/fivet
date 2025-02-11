import { createClient } from "@supabase/supabase-js";

// Create a single supabase client for interacting with your database
export const baseUrl = import.meta.env.VITE_BASE_API_URL;
const apiKey = import.meta.env.VITE_API_KEY;
const supabase = createClient(baseUrl, apiKey);

export default supabase;
