import jwt from 'jsonwebtoken';
import secret_token from '../config/secretToken';

export const generateToken = (payload: object) => {
    return jwt.sign(payload, secret_token, { expiresIn: '24h' });
};

export const verifyToken = (token: string) => {
    return jwt.verify(token, secret_token);
};