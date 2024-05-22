import jwt from 'jsonwebtoken';

const secret_token = process.env.SECRET_TOKEN || '';

export const generateToken = (payload: object) => {
    return jwt.sign(payload, secret_token, { expiresIn: '24h' });
};

export const verifyToken = (token: string) => {
    return jwt.verify(token, secret_token);
};