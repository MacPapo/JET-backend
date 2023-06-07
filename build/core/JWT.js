"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtPayload = void 0;
const util_1 = require("util");
const jsonwebtoken_1 = require("jsonwebtoken");
const ApiError_1 = require("./ApiError");
const Logger_1 = __importDefault(require("./Logger"));
/*
 * issuer 		— Software organization who issues the token.
 * subject 		— Intended user of the token.
 * audience 	— Basically identity of the intended recipient of the token.
 * expiresIn	— Expiration time after which the token will be invalid.
 * algorithm 	— Encryption algorithm to be used to protect the token.
 */
class JwtPayload {
    aud;
    sub;
    iss;
    iat;
    exp;
    prm;
    constructor(issuer, audience, subject, param, validity) {
        this.iss = issuer;
        this.aud = audience;
        this.sub = subject;
        this.iat = Math.floor(Date.now() / 1000);
        this.exp = this.iat + validity;
        this.prm = param;
    }
}
exports.JwtPayload = JwtPayload;
async function encode(payload) {
    const secret = process.env.JWT_SECRET;
    if (!secret)
        throw new ApiError_1.InternalError('Token generation failure');
    // @ts-ignore
    return (0, util_1.promisify)(jsonwebtoken_1.sign)({ ...payload }, secret);
}
/**
 * This method checks the token and returns the decoded data when token is valid in all respect
 */
async function validate(token) {
    const secret = process.env.JWT_SECRET;
    try {
        // @ts-ignore
        return (await (0, util_1.promisify)(jsonwebtoken_1.verify)(token, secret));
    }
    catch (e) {
        Logger_1.default.debug(e);
        if (e && e.name === 'TokenExpiredError')
            throw new ApiError_1.TokenExpiredError();
        // throws error if the token has not been encrypted by the private key
        throw new ApiError_1.BadTokenError();
    }
}
/**
 * Returns the decoded payload if the signature is valid even if it is expired
 */
async function decode(token) {
    const secret = process.env.JWT_SECRET;
    try {
        // @ts-ignore
        return (await (0, util_1.promisify)(jsonwebtoken_1.verify)(token, secret, {
            ignoreExpiration: true,
        }));
    }
    catch (e) {
        Logger_1.default.debug(e);
        throw new ApiError_1.BadTokenError();
    }
}
exports.default = {
    encode,
    validate,
    decode,
};
//# sourceMappingURL=JWT.js.map