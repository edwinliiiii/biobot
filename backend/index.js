require('dotenv').config()
const cors = require('cors')
const express = require('express');
//var bodyParser = require('body-parser'); we'll see if i end up passing data thru the body
const PORT = 8000;
const app = express();
app.use(express.json());
app.use(cors());

const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE_URI, { useNewUrlparser: true});
const db = mongoose.connection;
db.on('error', (error) => console.log(error)); // log DB errors
db.once('open', () => console.log('DB connected'));

const kitRouter = require('./routes/kits.js');
app.use('/kit', kitRouter);

app.get("/healthcheck", (req, res) => {
    res.send('Healthcheck success.');
});

app.listen(PORT, () => console.log(`Server is now running on http://localhost:${PORT}`));
