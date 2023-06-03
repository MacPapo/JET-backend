import { Request, Response, Router } from "express";
import MongoQueryService from "../services/mongo.service";
import jwtService from '../common/services/jwt.service';
import StatusCode from "../common/utils/status_code";
import RedisManager from "../common/services/redis.service";

const auth_router = Router();

auth_router.post('/login', async (req: Request, res: Response) => {
  // Assuming you have a user authentication mechanism
  const { email, password } = req.body;

  const { user, category } = await MongoQueryService.findUserByEmail(email);

  // Validate the user and password
  if (user != null && password === user.password) {
    // Generate a token
    const token = await jwtService.generateToken({ email });

    const userRedis = { user, category, token };
    RedisManager.set('user', userRedis);
    RedisManager.expire('user', 60 * 15);

    // Return the token to the client
    res.json({ token });
  } else {
    res.status(StatusCode.AUTH_ERROR).json({ message: 'Invalid credentials' });
  }
});

export default auth_router;
