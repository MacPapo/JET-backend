import { JWTVerifyResult, JWTPayload, SignJWT, jwtVerify } from 'jose';
import { JWT_SECRET } from '../config/config';

class JwtService {
    private static instance: JwtService;
    private secretKey = new TextEncoder().encode(JWT_SECRET);

    private constructor() {}

    public static getInstance(): JwtService {
        if (!JwtService.instance) {
            JwtService.instance = new JwtService();
        }
        return JwtService.instance;
    }

    async generateToken(payload: JWTPayload): Promise<string> {
        const token = await new SignJWT(payload)
            .setProtectedHeader({ alg: 'HS256' })
            .setExpirationTime('15m') // Set the token expiration time as needed
            .setIssuedAt()
            .sign(this.secretKey);

        return token;
    }

    async verifyToken(token: string): Promise<JWTVerifyResult> {
        const verifiedToken = await jwtVerify(token, this.secretKey);

        return verifiedToken;
    }
}

export default JwtService.getInstance();
