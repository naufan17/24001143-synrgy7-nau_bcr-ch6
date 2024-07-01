import jwt, { SignOptions, VerifyOptions, DecodeOptions } from 'jsonwebtoken';
import secret_token from '../config/secretToken';
import { Payload } from '../interfaces/JwtPayload';

export const generateToken = (payload: Payload) => {
    const options: SignOptions = { expiresIn: '24h'}
    return jwt.sign(payload, secret_token, options);
};

export const verifyToken = (token: string) => {
    const options: VerifyOptions = {}
    return jwt.verify(token, secret_token, options);
};

export const decodeToken = (token: string) => {
    const options: DecodeOptions = {}
    return jwt.decode(token, options);
}