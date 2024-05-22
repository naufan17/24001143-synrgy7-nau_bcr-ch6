import jwt from 'jsonwebtoken';
import crypto from 'crypto';

const token = crypto.randomBytes(64).toString('hex');
const secret_token = token || process.env.SECRET_TOKEN;

if (!secret_token) {
    throw new Error('secret token is not defined in the environment variables');
}

export const generateToken = (payload: object) => {
    return jwt.sign(payload, secret_token, { expiresIn: '24h' });
};

export const verifyToken = (token: string) => {
    return jwt.verify(token, secret_token);
};