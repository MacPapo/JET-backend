import express from 'express';
import { Request, Response } from 'express';

const app = express();
const port = 4000;

app.get('/api', (req: Request, res: Response) => {
    res.send('Hello TypeScript and Node.js!');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
