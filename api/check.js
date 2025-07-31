export default async function handler(req, res) {
  // ✅ CORS headers (very important)
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Origin", "https://mondrop-frontend.vercel.app");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,PATCH,DELETE,POST,PUT");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Content-Type, Authorization"
  );

  // ✅ OPTIONS request handling (for preflight)
  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  // ✅ Main logic
  const { address } = req.query;

  if (!address) {
    return res.status(400).json({ error: "Wallet address missing" });
  }

  // 👉 (Abhi ke liye dummy eligibility, baad me real logic daal denge)
  return res.status(200).json({
    address,
    eligible: true,
    tier: "Tier 1 (OG User)",
    reason: "Met all airdrop criteria",
  });
}
