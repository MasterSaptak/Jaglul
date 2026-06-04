import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

// Parse .env.local
const envPath = path.resolve(process.cwd(), '.env.local');
const envContent = fs.readFileSync(envPath, 'utf-8');
const envConfig = envContent.split('\n').reduce((acc: Record<string, string>, line) => {
  const [key, ...values] = line.split('=');
  if (key && values.length > 0) {
    acc[key.trim()] = values.join('=').trim().replace(/(^"|"$)/g, '').replace(/(^'|'$)/g, '');
  }
  return acc;
}, {});

const supabaseUrl = envConfig['VITE_SUPABASE_URL'];
const supabaseKey = envConfig['VITE_SUPABASE_ANON_KEY'];

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase credentials in .env.local");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const initialVisions = [
  {
    title: 'Fostering Bangladeshi Nationalism',
    slug: 'fostering-bangladeshi-nationalism',
    short_description: 'Building a unified national identity through shared values, cultural pride, and inclusive citizenship.',
    status: 'published',
    sort_order: 0
  },
  {
    title: 'Advancing Equal Rights',
    slug: 'advancing-equal-rights',
    short_description: 'Fighting for social justice, equal opportunities, and the protection of fundamental human rights for all citizens.',
    status: 'published',
    sort_order: 1
  },
  {
    title: 'Promoting Sustainable Development',
    slug: 'promoting-sustainable-development',
    short_description: 'Advocating for economic growth that respects environmental limits and ensures long-term prosperity.',
    status: 'published',
    sort_order: 2
  },
  {
    title: 'Strengthening Global Alliances',
    slug: 'strengthening-global-alliances',
    short_description: 'Building strategic international partnerships based on mutual respect and shared interests.',
    status: 'published',
    sort_order: 3
  }
];

async function seed() {
  console.log("Seeding visions...");
  const { data, error } = await supabase.from('visions').upsert(initialVisions, { onConflict: 'slug' });
  
  if (error) {
    console.error("Error seeding visions:", error);
  } else {
    console.log("Visions seeded successfully!");
  }
}

seed();
