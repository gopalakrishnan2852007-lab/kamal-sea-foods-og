const SUPABASE_URL = "https://chalkwwwdkzvlamhxpzh.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNoYWxrd3d3ZGt6dmxhbWh4cHpoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU5MDE0MzMsImV4cCI6MjA5MTQ3NzQzM30.gPyIXhOOYWzxKPOsu6v4Bw44FYToxxsfoonfbrAXFqo";

async function testAuth() {
    console.log("[Node] Attempting Signup...");
    const email = `testuser_${Date.now()}@kamal.com`;
    
    try {
        const response = await fetch(`${SUPABASE_URL}/auth/v1/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'apikey': SUPABASE_ANON_KEY
            },
            body: JSON.stringify({ email, password: 'Kamal12345!' })
        });
        
        const text = await response.text();
        console.log("STATUS:", response.status);
        console.log("RESPONSE:", text);
    } catch(e) {
        console.log("[Node] FATAL EXCEPTION:", e);
    }
}

testAuth();
