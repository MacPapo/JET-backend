import { JWTVerifyResult, JWTPayload, SignJWT, jwtVerify } from 'jose';
import { JWT_SECRET } from '../config/config';

class JwtService {
    private secretKey = new TextEncoder().encode(JWT_SECRET);

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

export default new JwtService();
