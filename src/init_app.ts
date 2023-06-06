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

app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.status(err.status || 500);
    res.send({
        error: {
            status: err.status || 500,
            message: err.message,
        },
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

export default app;

