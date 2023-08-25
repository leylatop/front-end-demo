const express = require('express');
const app = express();

app.use('/', express.static('public'));
app.listen(1999, () => console.log('chatgtp server is build on port 1999'));