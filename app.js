import express from 'express';
import users from './routes/users.js';

const app = express();
const port = 3000

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.send('Hello Worrldddd!');
});

app.use('/users', users);

app.listen(port, () => {
    console.log(`Project app listening at http://localhost:${port}`)
});