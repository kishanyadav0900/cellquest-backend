const { Client } = require('pg');

const client = new Client({
  connectionString: 'postgresql://postgres.rfpqwypgpminypfukarq:cellquest!23@aws-1-ap-northeast-1.pooler.supabase.com:5432/postgres',
  ssl: { rejectUnauthorized: false }
});

const sql = `
-- 1. Update admin_users table for RBAC
ALTER TABLE public.admin_users ADD COLUMN IF NOT EXISTS role TEXT DEFAULT 'viewer';
UPDATE public.admin_users SET role = 'admin' WHERE email = 'admin@cellquestindia.com';

-- 2. Update test_prices table for comprehensive Test/Package catalog
ALTER TABLE public.test_prices ADD COLUMN IF NOT EXISTS type TEXT DEFAULT 'Test';
ALTER TABLE public.test_prices ADD COLUMN IF NOT EXISTS tags TEXT;
ALTER TABLE public.test_prices ADD COLUMN IF NOT EXISTS included_tests TEXT;
ALTER TABLE public.test_prices ADD COLUMN IF NOT EXISTS fasting_rule TEXT;
ALTER TABLE public.test_prices ADD COLUMN IF NOT EXISTS report_time TEXT;
ALTER TABLE public.test_prices ADD COLUMN IF NOT EXISTS test_count TEXT;
ALTER TABLE public.test_prices ADD COLUMN IF NOT EXISTS is_per_person BOOLEAN DEFAULT false;
ALTER TABLE public.test_prices ADD COLUMN IF NOT EXISTS recommended_for TEXT;
`;

async function main() {
  try {
    await client.connect();
    console.log('Connected to DB');
    await client.query(sql);
    console.log('SQL executed! Schema updated for RBAC and dynamic tests catalog.');
  } catch (err) {
    console.error('Error executing SQL', err);
  } finally {
    await client.end();
  }
}
main();
