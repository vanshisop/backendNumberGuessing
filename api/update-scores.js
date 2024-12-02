const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { score, phoneNumber } = req.body;
  const query = 'UPDATE users SET best_score = $1 WHERE phone = $2';
  const values = [score, phoneNumber];

  try {
    await pool.query(query, values);
    res.json({ isUpdated: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update score' });
  }
}
