import express from 'express';
import router from './routes/routes';
import auth_router from './routes/auth.routes';
import cors from 'cors';
import compression from "compression";
import authenticate from './common/utils/authenticate_helper';
import { APP_PORT } from './common/config/config';

const app = express();
const port = APP_PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(compression());
app.use(cors());

app.use('/api/auth', auth_router);
app.use('/api', authenticate, router);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
