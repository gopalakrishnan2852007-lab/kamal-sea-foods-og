const SUPABASE_URL = "https://chalkwwwdkzvlamhxpzh.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNoYWxrd3d3ZGt6dmxhbWh4cHpoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU5MDE0MzMsImV4cCI6MjA5MTQ3NzQzM30.gPyIXhOOYWzxKPOsu6v4Bw44FYToxxsfoonfbrAXFqo";

// Avoid naming collision with the global 'supabase' library from CDN
window.supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
