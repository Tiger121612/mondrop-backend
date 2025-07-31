// api/check.js
export default async function handler(req, res) {
  const { address } = req.query;

  if (!address || !/^0x[a-fA-F0-9]{40}$/.test(address)) {
    return res.status(400).json({ error: 'Invalid address' });
  }

  try {
    // --- Replace this with actual Monad RPC or Indexer integration ---
    const dummyData = {
      totalTxns: 623,
      uniqueTxns: 58,
      verifiedNFTs: 5,
      SBT: true,
      dAppsUsed: 11,
      activeDays: 45,
      activeWeeks: 6,
      activeMonths: 3,
      ethTxns: 5,
      sybil: false,
      leaderboardScore: 8792,
    };

    // --- Tiers Logic ---
    let tier = 'Tier 3';
    if (dummyData.totalTxns >= 500 && dummyData.dAppsUsed >= 10 && dummyData.activeDays >= 40) {
      tier = 'Tier 1';
    } else if (dummyData.totalTxns >= 250 && dummyData.dAppsUsed >= 5 && dummyData.activeDays >= 20) {
      tier = 'Tier 2';
    }

    const eligibility = {
      ...dummyData,
      eligible: tier !== 'Tier 0' && !dummyData.sybil,
      tier,
    };

    return res.status(200).json(eligibility);
  } catch (err) {
    return res.status(500).json({ error: 'Server error', details: err.message });
  }
}
