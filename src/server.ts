const express = require('express');
import { Request, Response } from 'express';

const app = express();
const port = 4000;

app.use(express.json({ extended: true }));
app.use('/api/users', require('./api/user.api'));

app.get('/api', (req: Request, res: Response) => {
    console.log(req.body);
    res.send('The sedulous hyena ate the antelope!');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
