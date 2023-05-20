import jwtService from '../services/jwt.service';
import { Request, Response } from 'express';

// Extend Request interface to include user property
interface CustomRequest extends Request {
  user?: any;
}

class AuthHandler {

  static async authenticate(req: CustomRequest, res: Response, next: Function) {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
      const decodedToken = await jwtService.verifyToken(token);
      req.user = decodedToken.payload; // Set the decoded token payload in the request object for future use
      next();
    } catch (error) {
      return res.status(403).json({ message: 'Invalid token' });
    }
  }

}

export default AuthHandler;
