import { createClient } from '@supabase/supabase-js'; 
const supabase = createClient('https://ddqlowfealialoxuhfje.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRkcWxvd2ZlYWxpYWxveHVoZmplIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgzNjA1NTQsImV4cCI6MjA5MzkzNjU1NH0.cVE33wMAqdVxhlBaRbdGumejQRz8oyclNuyxqAqmeH4'); 
async function main() { 
  const { error } = await supabase.from('messages').select('count').limit(1); 
  console.log('messages:', error ? error.message : 'exists'); 
  const res2 = await supabase.from('contacts').select('count').limit(1); 
  console.log('contacts:', res2.error ? res2.error.message : 'exists'); 
} 
main();
