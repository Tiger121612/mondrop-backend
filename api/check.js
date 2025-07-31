export default async function handler(req, res) {
  const { address } = req.query;

  if (!address || !/^0x[a-fA-F0-9]{40}$/.test(address)) {
    return res.status(400).json({ error: "Invalid address" });
  }

  try {
    // Example mock result — replace with real Monad fetch later
    const result = {
      eligible: true,
      tier: "OG",
      reasons: [
        "500+ transactions",
        "40 active days",
        "5+ verified NFTs",
        "3+ mainnet Ethereum txns"
      ],
      sybil: false,
      bonusTokens: 300,
      totalTokens: 800,
      rank: 42
    };

    return res.status(200).json({ address, ...result });
  } catch (e) {
    console.error("Error:", e);
    return res.status(500).json({ error: "Internal server error" });
  }
}
