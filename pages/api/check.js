export default async function handler(req, res) {
  // CORS headers ✅
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Handle preflight request ✅
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  const { address } = req.query;

  // Validate wallet address ✅
  if (!address || !address.startsWith("0x") || address.length !== 42) {
    return res.status(400).json({ error: "Invalid wallet address." });
  }

  try {
    // ✅ Replace this with real Monad logic
    const eligible = true;
    const score = 825;
    const tier = "Tier 1 (OG User)";

    res.status(200).json({
      eligible,
      score,
      tier,
      message: "You are eligible for the ModDrop 🎉",
    });
  } catch (error) {
    console.error("Server Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
