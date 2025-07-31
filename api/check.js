export default async function handler(req, res) {
  const { address } = req.query;

  if (!address) {
    return res.status(400).json({ error: "Wallet address is required" });
  }

  // Sample success response (you'll connect Monad data later)
  res.status(200).json({
    eligible: true,
    tier: "Tier 1",
    tokens: 2500,
    reason: "You meet all activity criteria.",
  });
}
