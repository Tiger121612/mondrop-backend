const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  const { address } = req.query;

  if (!address) {
    return res.status(400).json({ error: 'Wallet address is required.' });
  }

  // Dummy logic — replace with real Monad logic
  const eligibility = {
    address,
    tier: 'Tier 1',
    reason: 'Met all eligibility criteria.',
    sybil: false,
    reward: 5000,
    badge: 'OG',
  };

  res.json(eligibility);
});

module.exports = router;
