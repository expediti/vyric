import { createClient } from '@supabase/supabase-js'

// You'll need to add these to your Vercel environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'YOUR_SUPABASE_URL_HERE'
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'YOUR_SUPABASE_ANON_KEY_HERE'

export const supabase = createClient(supabaseUrl, supabaseKey)
