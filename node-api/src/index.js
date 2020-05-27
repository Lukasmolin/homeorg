const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.json({teste: 'teste'});
})

app.listen(3333);