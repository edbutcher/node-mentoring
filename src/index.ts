import express = require('express')

const app: express.Application = express();

app.listen(3000, () => {
    console.log('Example app listening on http://localhost:3000/');
});

app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).send();
});

