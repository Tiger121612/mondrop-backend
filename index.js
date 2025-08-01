const express = require("express");
const cors = require("cors");
const app = express();
const { checkEligibility } = require("./logic");

app.use(cors());

app.get("/api/check", async (req, res) => {
  const address = req.query.address;
  if (!address) {
    return res.status(400).json({ error: "Address is required" });
  }

  try {
    const result = await checkEligibility(address);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});