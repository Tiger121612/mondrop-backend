// /api/check/index.js
export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method !== "GET") {
    return res.status(405).json({ error: "Only GET method is allowed" });
  }

  const address = req.query.address;

  // Validate address format
  if (!/^0x[a-fA-F0-9]{40}$/.test(address)) {
    return res.status(400).json({ error: "Invalid wallet address format" });
  }

  try {
    // 🧠 Step 1: Fetch real Monad testnet data from RPC/indexer (you need to use your own real fetch logic here)
    // For now, we use mock data - replace this with actual logic
    const walletStats = await getWalletStats(address); // Placeholder

    // 🧮 Step 2: Eligibility Rules (change thresholds as per your logic)
    const eligible = (
      walletStats.totalTxns >= 500 &&
      walletStats.activeDays >= 40 &&
      walletStats.verifiedNFTs >= 5 &&
      walletStats.mainnetEthTxns >= 3
    );

    const tier = eligible
      ? "OG"
      : (walletStats.totalTxns >= 250 && walletStats.verifiedNFTs >= 2)
      ? "Power"
      : (walletStats.totalTxns >= 50 && walletStats.activeDays >= 10)
      ? "Basic"
      : "Ineligible";

    const reasons = [];

    if (walletStats.totalTxns >= 500) reasons.push("500+ transactions");
    if (walletStats.activeDays >= 40) reasons.push("40 active days");
    if (walletStats.verifiedNFTs >= 5) reasons.push("5+ verified NFTs");
    if (walletStats.mainnetEthTxns >= 3) reasons.push("3+ mainnet Ethereum txns");

    // 🕵️ Sybil Detection
    const sybil = detectSybil(walletStats);

    // 🎁 Bonus Tokens
    const bonusTokens = calculateBonus(walletStats);

    // 🪙 Total Tokens
    const base = tier === "OG" ? 500 : tier === "Power" ? 250 : tier === "Basic" ? 100 : 0;
    const totalTokens = sybil ? 0 : base + bonusTokens;

    // 📊 Rank placeholder (replace with real leaderboard logic)
    const rank = sybil ? null : Math.floor(Math.random() * 1000) + 1;

    return res.status(200).json({
      address,
      eligible: tier !== "Ineligible" && !sybil,
      tier: tier !== "Ineligible" ? tier : null,
      reasons,
      sybil,
      bonusTokens,
      totalTokens,
      rank,
    });
  } catch (err) {
    console.error("Error checking address:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}

// 🧩 MOCK function (replace with real data fetching from Monad RPC / indexer)
async function getWalletStats(address) {
  // Replace this mock with real API calls
  return {
    totalTxns: 623,
    verifiedNFTs: 6,
    activeDays: 42,
    mainnetEthTxns: 4,
    walletAgeDays: 100,
    firstTxTime: Date.now() - 90 * 86400000,
    funderCluster: false,
  };
}

// 🚨 Sybil detection logic
function detectSybil(stats) {
  return (
    stats.walletAgeDays < 15 ||
    stats.funderCluster === true ||
    stats.activeDays < 10 ||
    stats.totalTxns < 30
  );
}

// 🎁 Bonus token calculation logic
function calculateBonus(stats) {
  let bonus = 0;
  if (stats.totalTxns > 1000) bonus += 100;
  if (stats.activeDays > 60) bonus += 100;
  if (stats.verifiedNFTs > 10) bonus += 100;
  return bonus;
}
