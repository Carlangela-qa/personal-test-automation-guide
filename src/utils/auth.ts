import { request } from '@playwright/test';
import * as dotenv from 'dotenv';

const envFile = process.env.ENV === 'production'
  ? './src/config/.env.prod'
  : './src/config/.env';
dotenv.config({ path: envFile });

let cachedToken: string = '';
let tokenExpiry: number = 0;

interface AuthResponse {
  access_token: string;
  token_type: string;
  expires_in: number; // seconds
}

export async function getValidToken(): Promise<string> {
  const now = Math.floor(Date.now() / 1000);

  // ✅ If we already have a token and it's not expired, reuse it
  if (cachedToken && now < tokenExpiry - 30) {
    return cachedToken;
  }

  const context = await request.newContext({
    baseURL: process.env.API_BASE_URL,
    extraHTTPHeaders: {
      'Content-Type': 'application/json',
    },
  });

  const response = await context.post('/users/login', {
    data: {
      email: process.env.email,
      password: process.env.password,
    },
  });

  const body = await response.json() as AuthResponse;
  console.log('Login response:', body);

  if (!body.access_token || typeof body.access_token !== 'string') {
    throw new Error('Token not found or invalid in response');
  }

  // ✅ Cache token and expiry
  cachedToken = body.access_token;
  tokenExpiry = now + body.expires_in;

  await context.dispose();
  return cachedToken;
}

export function clearAuthCache(): void {
  cachedToken = '';
  tokenExpiry = 0;
}

export async function logoutApi(): Promise<void> {
  const token = cachedToken;
  if (!token) {
    clearAuthCache();
    return;
  }

  const context = await request.newContext({
    baseURL: process.env.API_BASE_URL,
    extraHTTPHeaders: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  try {
    const response = await context.post('/users/logout', {
      data: { token },
    });

    if (!response.ok()) {
      console.warn(`Logout request failed: ${response.status()} ${response.statusText()}`);
    }
  } finally {
    clearAuthCache();
    await context.dispose();
  }
}
