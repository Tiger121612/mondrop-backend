export default async function handler(req, res) {
  const { address } = req.query;

  if (!address || !address.startsWith("0x") || address.length !== 42) {
    return res.status(400).json({ error: "Invalid address." });
  }

  try {
    // 🟡 Replace the mock data below with real Monad RPC or indexer logic
    const userData = {
      txCount: 600,
      verifiedNFTs: 5,
      sbtOwned: true,
      dappsUsed: 11,
      uniqueTxns: 72,
      activeDays: 45,
      activeWeeks: 5,
      activeMonths: 3,
      ethTxns: 4,
      createdAt: "2024-12-01",
      firstSeen: "2025-01-05",
      lastActive: "2025-07-30"
    };

    // 🧠 Tiers logic
    let tier = "Ineligible";
    if (
      userData.txCount >= 500 &&
      userData.verifiedNFTs >= 5 &&
      userData.sbtOwned &&
      userData.dappsUsed >= 10 &&
      userData.uniqueTxns >= 50 &&
      userData.activeDays >= 40 &&
      userData.activeWeeks >= 4 &&
      userData.activeMonths >= 3 &&
      userData.ethTxns >= 3
    ) {
      tier = "Tier 1 (OG)";
    } else if (
      userData.txCount >= 250 &&
      userData.verifiedNFTs >= 2 &&
      userData.dappsUsed >= 5
    ) {
      tier = "Tier 2 (Power)";
    } else if (
      userData.txCount >= 50 &&
      userData.verifiedNFTs >= 1 &&
      userData.activeDays >= 10
    ) {
      tier = "Tier 3 (Basic)";
    }

    // 🕵️ Sybil detection (example)
    const isSybil =
      (new Date(userData.lastActive) - new Date(userData.firstSeen)) / (1000 * 3600 * 24) < 15 ||
      userData.createdAt > "2025-06-01";

    return res.status(200).json({
      address,
      tier,
      isSybil,
      ...userData,
    });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error." });
  }
}
