import app from './init_app';
import router from './routes/routes';
import auth_router from './routes/auth.routes';
import AuthHandler from './common/utils/auth.handler';

app.use('/api/auth', auth_router);
app.use('/api', AuthHandler.authenticate, router);
