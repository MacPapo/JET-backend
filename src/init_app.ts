import express from 'express';
import { APP_PORT } from './common/config/config';
import cors from 'cors';
import compression from "compression";

const app = express();
const port = APP_PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(compression());
app.use(cors());

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

export default app;
