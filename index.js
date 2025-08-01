const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/api/check', async (req, res) => {
  const address = req.query.address;
  if (!address) {
    return res.status(400).json({ error: 'Wallet address is required' });
  }

  // Dummy response (replace with actual eligibility logic)
  const response = {
    address,
    tier: 'Tier 1',
    eligible: true,
    reasons: ['500+ transactions', '5 NFTs', '3 mainnet txns'],
    sybil: false,
    score: 95,
    reward: '1200 MOD',
    badge: 'OG User'
  };

  res.json(response);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
