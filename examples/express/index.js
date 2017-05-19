const express = require('express');
const about = require('./about');

const app = express();

about(app);

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.listen(3000, () => {
  console.log('Example app listening on port 3000!')
});
