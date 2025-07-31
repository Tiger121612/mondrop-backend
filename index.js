const express = require('express');
const cors = require('cors');
const checkRoute = require('./api/check');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use('/api/check', checkRoute);

app.get('/', (req, res) => {
  res.send('Mondrop backend is live');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
