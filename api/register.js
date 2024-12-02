const { Pool } = require('pg');

const pool = new Pool({
  connectionString: 'postgres://postgres.wewkjwtalqhjugzwrcql:_CPGJypV9RU$Nq-@aws-0-us-west-1.pooler.supabase.com:6543/postgres',
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { best_score, name, phone } = req.body;
  const query = 'INSERT INTO public.users (best_score, full_name, phone) VALUES ($1, $2, $3)';
  const values = [best_score, name, phone];

  try {
    const response = await pool.query(query, values);
    if (response.rowCount > 0) {
      res.json({ isRegistered: true });
    } else {
      res.json({ isRegistered: false });
    }
  } catch (error) {
    console.error('Error inserting user:', error);
    res.status(500).json({ error: 'Database insert error' });
  }
}
