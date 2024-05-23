import crypto from 'crypto';

const token: string = crypto.randomBytes(64).toString('hex');
const secret_token: any = token || process.env.SECRET_TOKEN;

if (!secret_token) {
    throw new Error('secret token is not defined in the environment variables');
}

export default secret_token;