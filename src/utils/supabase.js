import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = "https://chalkwwwdkzvlamhxpzh.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNoYWxrd3d3ZGt6dmxhbWh4cHpoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU5MDE0MzMsImV4cCI6MjA5MTQ3NzQzM30.gPyIXhOOYWzxKPOsu6v4Bw44FYToxxsfoonfbrAXFqo";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  realtime: {
    params: {
      eventsPerSecond: 2
    },
    timeout: 10000, // increase timeout for slow networks
  },
  global: {
    fetch: (...args) => fetch(...args)
  }
});
