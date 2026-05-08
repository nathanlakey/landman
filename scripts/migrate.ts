/**
 * Migration: Create auction_alerts table
 * Run with: npx tsx scripts/migrate.ts
 *
 * Requires SUPABASE_ACCESS_TOKEN in .env.local
 * Get yours at: https://supabase.com/dashboard/account/tokens
 */
import { config } from 'dotenv'
config({ path: '.env.local' })

const PROJECT_REF = 'qsqngmwueyfsokdzxxhy'
const ACCESS_TOKEN = process.env.SUPABASE_ACCESS_TOKEN

const SQL = `
CREATE TABLE IF NOT EXISTS auction_alerts (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  email text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE auction_alerts ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'auction_alerts' AND policyname = 'Anyone can insert auction_alerts'
  ) THEN
    CREATE POLICY "Anyone can insert auction_alerts" ON auction_alerts
      FOR INSERT WITH CHECK (true);
  END IF;
END $$;
`

async function main() {
  if (!ACCESS_TOKEN) {
    console.log('\n⚠️  SUPABASE_ACCESS_TOKEN not set in .env.local')
    console.log('\nTo run this migration automatically:')
    console.log('  1. Go to https://supabase.com/dashboard/account/tokens')
    console.log('  2. Create a new Personal Access Token')
    console.log('  3. Add SUPABASE_ACCESS_TOKEN=your_token to .env.local')
    console.log('  4. Re-run: npx tsx scripts/migrate.ts')
    console.log('\nOR — run this SQL directly in your Supabase SQL Editor:')
    console.log('  https://supabase.com/dashboard/project/' + PROJECT_REF + '/sql/new')
    console.log('\n' + SQL)
    process.exit(0)
  }

  console.log('Running migration...')
  const res = await fetch(
    `https://api.supabase.com/v1/projects/${PROJECT_REF}/database/query`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query: SQL }),
    }
  )

  if (res.ok) {
    console.log('✅ auction_alerts table created successfully')
  } else {
    const text = await res.text()
    console.error('❌ Migration failed:', text)
    process.exit(1)
  }
}

main()
