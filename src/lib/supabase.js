import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://unfwwjmpahpgvonspsqt.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVuZnd3am1wYWhwZ3ZvbnNwc3F0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODk3NTY4MzEsImV4cCI6MjEwNTMzMjgzMX0.r8OMzRzlrDziE6rmyevaiOeOZ5iKzQrrWOEgXkhlKmo";

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;