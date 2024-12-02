const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const query = 'SELECT full_name, best_score FROM users WHERE best_score > 0 ORDER BY best_score LIMIT 5';

  try {
    const response = await pool.query(query);
    res.json({ isUpdated: true, topUsers: response.rows });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch top users' });
  }
}