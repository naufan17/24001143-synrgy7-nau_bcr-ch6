import crypto from 'crypto';

const token: string = crypto.randomBytes(64).toString('hex');
export const secret_token: string = token || process.env.SECRET_TOKEN || '';