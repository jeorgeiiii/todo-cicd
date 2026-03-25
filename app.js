const express = require('express');
const sum = require('./sum.js');  // Fixed: .js not /js

const app = express();
const PORT = 3000;

// Use express.json() middleware for parsing JSON bodies
app.use(express.json());



app.get('/', async (req, res) => {
  res.json({
    message: "Hello World"
  });
});

app.get('/getsum/:a/:b', async (req, res) => {
  const { a, b } = req.params;
  res.json({
    ans: sum(parseInt(a), parseInt(b))
  });
});
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
module.exports = app;