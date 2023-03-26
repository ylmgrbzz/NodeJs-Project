import express from 'express';

const app = express();
const port = 3000

app.get('/', (req, res) => {
    res.send('Helloo Worrldddd!');
});

app.listen(port, () => {
    console.log(`Project app listening at http://localhost:${port}`)
});