import fetch from 'node-fetch';

export default async function handler(req, res) {
  const { address } = req.query;

  if (!address || !/^0x[a-fA-F0-9]{40}$/.test(address)) {
    return res.status(400).json({ error: 'Invalid address' });
  }

  // Sample: fetch Monad data (later update karo)
  const dummyData = { txCount: 521, activeDays: 35 };

  res.status(200).json({
    message: 'Address is valid',
    address,
    data: dummyData
  });
}
