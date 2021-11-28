require('dotenv').config();
const express = require('express');
const cors = require('cors');
const userApi = require('./routes/api')


const app = express();

app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


const PORT = process.env.PORT || 4000;

app.use('/api', userApi);

app.listen(PORT, () => {
    console.log('Server listning at: ', PORT);
})


