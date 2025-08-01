function checkEligibility(address) {
  // Dummy logic; replace with real Monad fetch logic
  const score = Math.floor(Math.random() * 1000);
  const eligible = score > 500;

  return {
    address,
    eligible,
    score,
    tier: eligible ? (score > 800 ? "Tier 1" : "Tier 2") : "Tier 3",
    reason: eligible ? "Eligible by score" : "Not enough activity",
  };
}

module.exports = { checkEligibility };