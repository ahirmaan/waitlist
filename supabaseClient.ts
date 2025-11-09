import { createClient } from '@supabase/supabase-js';

// IMPORTANT: Replace with your project's URL and anon key.
const supabaseUrl = 'https://wvfzbsmryxzqbrgyksyd.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind2Znpic21yeXh6cWJyZ3lrc3lkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI2NzA3NzcsImV4cCI6MjA3ODI0Njc3N30.hu3-S_kMV2Ubph2gZeSl8vzovWSPeZQJyMVu_2rSMaQ';

// Create and export the Supabase client directly.
// If the URL or key are incorrect, Supabase will log a specific error.
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
