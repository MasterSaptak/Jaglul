import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ddqlowfealialoxuhfje.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRkcWxvd2ZlYWxpYWxveHVoZmplIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgzNjA1NTQsImV4cCI6MjA5MzkzNjU1NH0.cVE33wMAqdVxhlBaRbdGumejQRz8oyclNuyxqAqmeH4';

console.log('Connecting to:', supabaseUrl);

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function check() {
  try {
    console.log('Fetching session...');
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    if (sessionError) {
       console.error('Session error:', sessionError);
    } else {
       console.log('Session:', session ? 'Found' : 'Not found');
    }

    console.log('Fetching profiles count...');
    const { data, error } = await supabase
      .from('profiles')
      .select('count')
      .limit(1);
    
    if (error) {
      console.error('Error fetching profiles:', error);
    } else {
      console.log('Profiles table accessible. Count check passed.');
    }
  } catch (err) {
    console.error('Check failed with exception:', err);
  }
}

check();
