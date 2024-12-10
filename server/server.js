const express = require('express');
const bodyParser = require('body-parser');
const db = require('./config/db');
const apiRoutes = require('./routes/api');

const app = express();

app.use(bodyParser.json());
app.use(express.static('public'));
app.use('/api', apiRoutes);

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
