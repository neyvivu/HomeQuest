import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://wdvmwrzooeumxowgloua.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indkdm13cnpvb2V1bXhvd2dsb3VhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQwMTI0OTEsImV4cCI6MjA1OTU4ODQ5MX0.gghjo19sAVNQfjKerjWzYAEVIXMFe1gumVPAd7TmzQ0";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);