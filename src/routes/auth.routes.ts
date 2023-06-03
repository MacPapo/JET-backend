import { Request, Response, Router } from "express";
import { HashHandler } from '../common/utils/hash.handler';
import MongoQueryService from "../services/mongo.service";
import jwtService from '../common/services/jwt.service';
import StatusCode from "../common/utils/status_code";
import RedisManager from "../common/services/redis.service";

const auth_router = Router();


auth_router.post('/login', async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const { user, category } = await MongoQueryService.findUserByEmail(email);
        
        if (user != null && category != null) {
            
            // Validate the user and password
            await HashHandler.verify(user.password, password)
                .then(async (match) => {
                    if (match) {
                        // Generate a token
                        const token = await jwtService.generateToken({ email });

                        const userRedis = { user, category, token };
                        RedisManager.set('user', userRedis);
                        RedisManager.expire('user', 60 * 15);

                        // Return the token to the client
                        return res.status(StatusCode.SUCCESS).json({ token });
                    } else {
                        return res.status(StatusCode.AUTH_ERROR).json({ message: 'Invalid credentials' });
                    }
                })
                .catch((error) => {
                    return res.status(StatusCode.SERVER_ERROR).json({ message: 'Internal Error XD' });
                });
        } else {
            return res.status(StatusCode.AUTH_ERROR).json({ message: 'Invalid credentials' });
        }
    } catch (error) {
        return res.status(StatusCode.SERVER_ERROR).json({ message: 'Internal Error XD' });
    }
});

auth_router.post('/register', async (req: Request, res: Response) => {
    const { firstName, lastName, email, password, userCategory } = req.body;
    const { user, category } = await MongoQueryService.findUserByEmail(email);

    if (user != null && user.email == email) {
        return res.status(StatusCode.AUTH_ERROR).json({ message: 'Email already exists' });
    }

    // Encrypt the password
    await HashHandler.encrypt(password)
        .then(async (hash) => {
            const newUser = {
                firstName,
                lastName,
                email,
                password: hash,
                category: userCategory
            }

            const registeredUser = await MongoQueryService.registerUser(newUser);
            if (registeredUser != null) {
                return res.status(StatusCode.AUTH_ERROR).json({ message: 'Registration failed' });
            } else {
                return res.status(StatusCode.CREATED).json({ message: 'Registration successful' });
            }
        })
        .catch((error) => {
            return res.status(StatusCode.SERVER_ERROR).json({ message: 'Encryption failed' });
        });
});

export default auth_router;
