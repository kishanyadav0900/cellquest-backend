// This script reads ServicesContent.js, extracts all test titles/prices,
// and inserts them into the test_prices Supabase table.
const { Client } = require('pg');
const fs = require('fs');
const path = require('path');

const client = new Client({
  connectionString: 'postgresql://postgres.rfpqwypgpminypfukarq:cellquest!23@aws-1-ap-northeast-1.pooler.supabase.com:5432/postgres',
  ssl: { rejectUnauthorized: false }
});

async function main() {
  // Read the ServicesContent.js file
  const filePath = path.join(__dirname, 'src', 'appmodules', 'service-page-components', 'ServicesContent.js');
  const content = fs.readFileSync(filePath, 'utf8');

  // Extract all test objects using regex
  const tests = [];
  const seen = new Set();

  // Match title, currentPrice, oldPrice, discount patterns
  const titleRegex = /title:\s*"([^"]+)"/g;
  const priceRegex = /currentPrice:\s*"([^"]+)"/g;
  const oldPriceRegex = /oldPrice:\s*"([^"]+)"/g;
  const discountRegex = /discount:\s*"([^"]+)"/g;

  // Find category blocks and extract tests
  const categoryRegex = /"([^"]+)":\s*\[/g;
  let categories = [];
  let m;
  while ((m = categoryRegex.exec(content)) !== null) {
    if (!m[1].includes('subtest') && !m[1].includes('name')) {
      categories.push({ name: m[1], index: m.index });
    }
  }

  // Simpler approach: find each test block by matching id/title/currentPrice patterns
  const testBlockRegex = /\{\s*\n\s*id:\s*\d+,\s*\n\s*title:\s*"([^"]+)",[\s\S]*?currentPrice:\s*"([^"]+)"[\s\S]*?oldPrice:\s*"([^"]*)"(?:[\s\S]*?discount:\s*"([^"]*)")?/g;

  let match;
  while ((match = testBlockRegex.exec(content)) !== null) {
    const title = match[1];
    const currentPrice = match[2];
    const oldPrice = match[3] || '';
    const discount = match[4] || '';

    if (!seen.has(title)) {
      seen.add(title);
      tests.push({ title, currentPrice, oldPrice, discount });
    }
  }

  console.log(`Found ${tests.length} unique tests`);

  // Connect and insert
  await client.connect();
  console.log('Connected to DB');

  // Clear existing test_prices
  await client.query('DELETE FROM public.test_prices');

  // Insert all
  for (const t of tests) {
    const escaped = (s) => s.replace(/'/g, "''");
    await client.query(`
      INSERT INTO public.test_prices (test_name, current_price, old_price, discount, updated_at)
      VALUES ('${escaped(t.title)}', '${escaped(t.currentPrice)}', '${escaped(t.oldPrice)}', '${escaped(t.discount)}', NOW())
      ON CONFLICT (test_name) DO UPDATE SET current_price = EXCLUDED.current_price, old_price = EXCLUDED.old_price, discount = EXCLUDED.discount
    `);
  }

  console.log(`Inserted ${tests.length} test prices into Supabase!`);
  await client.end();
}

main().catch(console.error);
