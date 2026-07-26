import { request } from '@playwright/test';
import * as dotenv from 'dotenv';

dotenv.config();

let cachedToken: string = '';
let tokenExpiry: number = 0;

interface AuthResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}

export async function getValidToken(): Promise<string> {
  const now = Math.floor(Date.now() / 1000);

  // reuse cached token if still valid
  if (cachedToken && now < tokenExpiry - 30) {
    return cachedToken;
  }

  const context = await request.newContext({
    baseURL: process.env.API_BASE_URL,
    extraHTTPHeaders: { 'Content-Type': 'application/json' },
  });

  const response = await context.post('/users/login', {
    data: {
      email: process.env.EMAIL,
      password: process.env.PASSWORD,
    },
  });

  if (!response.ok()) {
    throw new Error(`Login failed: ${response.status()} ${response.statusText()}`);
  }

  const body = await response.json() as AuthResponse;

  if (!body.access_token) {
    throw new Error('Token not found in response');
  }

  // cache token + expiry
  cachedToken = body.access_token;
  tokenExpiry = now + body.expires_in;

  await context.dispose();
  return cachedToken;
}

