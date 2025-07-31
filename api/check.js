export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*"); // CORS allow
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  const { address } = req.query;

  if (!address) {
    return res.status(400).json({ error: "Wallet address is required" });
  }

  // Dummy data - baad me actual logic.js se connect karo
  return res.status(200).json({
    eligible: true,
    tier: "OG",
    reward: 2000,
    reason: "All criteria met.",
    sybil: false
  });
}
