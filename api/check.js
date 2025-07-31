export default function handler(req, res) {
  const { address } = req.query;

  if (!address) {
    return res.status(400).json({ error: "Address required" });
  }

  // Dummy logic – replace with real logic later
  const isOG = address.toLowerCase() === "0xd802650c7c8c0ca2d79ffbb4f2d9fb816c94a4f6";

  if (isOG) {
    return res.status(200).json({
      eligible: true,
      tier: "OG",
      rewards: 8800,
      reason: "You meet all the criteria",
    });
  } else {
    return res.status(200).json({
      eligible: false,
      tier: "None",
      rewards: 0,
      reason: "You do not meet eligibility criteria",
    });
  }
}
