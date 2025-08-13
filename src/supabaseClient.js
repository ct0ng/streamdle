import { createBrowserClient } from "@supabase/ssr";

const supabaseUrl = 'https://xykluxzysodpropszpvf.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh5a2x1eHp5c29kcHJvcHN6cHZmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg5MDcxMDUsImV4cCI6MjA2NDQ4MzEwNX0.X5zxb3sbSn3W5Z-WtMMsBQ9PaLzp2FpX7V3SwibO9Qc';

export function supabaseClient() {
  return createBrowserClient(supabaseUrl, supabaseAnonKey);
}
