import { Request, Response, Router } from "express";

import jwtService from '../common/services/jwt.service';

const auth_router = Router();

auth_router.post('/login', async (req: Request, res: Response) => {
  // Assuming you have a user authentication mechanism
  const { email, password } = req.body;

  // Validate the user and password
  if (email === 'example@gmail.com' && password === 'password') {
    // Generate a token
    const token = await jwtService.generateToken({ email });

    // Return the token to the client
    res.json({ token });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

export default auth_router;
