export default async function handler(req, res) {
  const { address } = req.query;

  if (!address) {
    return res.status(400).json({ error: 'Wallet address is required' });
  }

  try {
    const result = {
      eligible: true,
      tier: "OG",
      rewards: 8800,
      reason: "You meet all the criteria"
    };

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: 'Something went wrong' });
  }
}
