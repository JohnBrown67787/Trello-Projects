// Initialize Supabase Client
// Ensure the Supabase JS library is loaded before this script
// <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>

const SUPABASE_URL = "https://rbfgxynwrjhovpitjnoi.supabase.co";
const SUPABASE_KEY = "sb_publishable_4u06PfapnKI6KUG2uHAUkg_SIVHEmTX";

if (typeof supabase === "undefined") {
  console.error("Supabase JS library not loaded. Please include the CDN link.");
} else {
  window.supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
  console.log("Supabase Client Initialized");
}
