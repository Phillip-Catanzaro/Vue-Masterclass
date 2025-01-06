import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
export const supabase = createClient(
  'https://zjrzldajzkeozzpfqivo.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpqcnpsZGFqemtlb3p6cGZxaXZvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzYxOTcxMjIsImV4cCI6MjA1MTc3MzEyMn0.WSnZ5U37pRqFfQ8Hb08qIO36MJrN8DtrX6rp4qY4Uec'
)
