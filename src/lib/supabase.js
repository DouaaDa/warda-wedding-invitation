import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Guard: createClient throws a fatal error if the URL is empty/invalid.
// When Supabase is not configured yet, export null so callers can skip gracefully.
let supabase = null;
if (supabaseUrl && supabaseAnonKey) {
  try {
    supabase = createClient(supabaseUrl, supabaseAnonKey);
  } catch (err) {
    console.warn('[supabase] Failed to initialise Supabase client:', err.message);
  }
}

export { supabase };
