import crypto from 'crypto';
import dotenv from 'dotenv';
dotenv.config();

const API_KEY = process.env.API_SECRET_KEY as string

export function verify(eventData: any, signature: string): boolean {
    const hmac = crypto.createHmac('sha512', API_KEY);
    const expectedSignature = hmac.update(JSON.stringify(eventData)).digest('hex');
    return expectedSignature === signature;
}