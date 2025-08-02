import { checkEligibility } from '../logic/logic.js';

export default async function handler(req, res) {
  const { address } = req.query;

  if (!address) {
    return res.status(400).json({ error: 'Wallet address is required' });
  }

  try {
    const result = await checkEligibility(address);
    res.status(200).json({ eligible: result });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
}
