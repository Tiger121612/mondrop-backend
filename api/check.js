export default async function handler(req, res) {
  const { address } = req.query;

  if (!address || !/^0x[a-fA-F0-9]{40}$/.test(address)) {
    return res.status(400).json({ error: 'Invalid or missing address' });
  }

  // Dummy Data (replace later with real fetch)
  const user = {
    address,
    txnCount: 600,
    nftCount: 6,
    sbtOwned: true,
    dappsUsed: 12,
    uniqueTxns: 55,
    activeDays: 42,
    activeWeeks: 5,
    activeMonths: 3,
    ethTxns: 3,
    createdAtDaysAgo: 120,
    fundedBy: null,
  };

  // --- Sybil Detection ---
  const sybilReasons = [];
  if (user.createdAtDaysAgo < 15) sybilReasons.push("New wallet (under 15 days)");
  if (user.fundedBy !== null) sybilReasons.push("Funded by known cluster");
  const isSybil = sybilReasons.length > 0;

  // --- Tier Logic ---
  let tier = "Ineligible", base = 0;
  if (
    user.txnCount >= 500 && user.nftCount >= 5 && user.sbtOwned &&
    user.dappsUsed >= 10 && user.uniqueTxns >= 50 &&
    user.activeDays >= 40 && user.activeWeeks >= 4 &&
    user.activeMonths >= 3 && user.ethTxns >= 3
  ) {
    tier = "OG";
    base = 1000;
  } else if (
    user.txnCount >= 250 && user.nftCount >= 2 &&
    user.dappsUsed >= 5
  ) {
    tier = "Power";
    base = 500;
  } else if (
    user.txnCount >= 50 && user.nftCount >= 1 && user.activeDays >= 10
  ) {
    tier = "Basic";
    base = 200;
  }

  // --- Bonus Logic ---
  let bonus = 0;
  if (user.activeMonths >= 3) bonus += 100;
  if (user.uniqueTxns >= 50) bonus += 100;

  // --- Leaderboard ---
  const leaderboardRank = user.txnCount >= 500 ? Math.floor(Math.random() * 100) + 1 : null;
  const badgeEligible = tier === "OG" && !isSybil;

  // --- Final Response ---
  return res.json({
    address,
    tier,
    eligible: tier !== "Ineligible" && !isSybil,
    sybil: isSybil,
    rewards: {
      base,
      bonus,
      total: base + bonus
    },
    badgeEligible,
    leaderboardRank,
    reasons: [
      `Over ${user.txnCount} transactions`,
      `${user.nftCount} verified NFTs`,
      `${user.dappsUsed} dApps used`,
      `${user.activeDays} active days`,
      `${user.activeWeeks} active weeks`,
      `${user.activeMonths} active months`,
      `${user.ethTxns} Ethereum txns`
    ],
    sybilReasons
  });
}
