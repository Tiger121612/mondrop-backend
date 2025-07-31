export default async function handler(req, res) {
  const { address } = req.query;

  if (!address) {
    return res.status(400).json({ error: "Address is required" });
  }

  return res.status(200).json({
    eligible: true,
    message: `Address ${address} is eligible.`,
  });
}
