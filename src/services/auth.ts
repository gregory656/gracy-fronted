import { api } from './api';

export type AuthPayload = {
  email: string;
  password: string;
};

/**
 * POST /auth/register
 *
 * Placeholder only (no token storage / no auth state yet).
 * Expected to match NestJS auth controller route once backend is implemented.
 */
export async function register(email: string, password: string) {
  const response = await api.post('/auth/register', { email, password } satisfies AuthPayload);
  return response.data;
}

/**
 * POST /auth/login
 *
 * Placeholder only (no token storage / no auth state yet).
 * Expected to match NestJS auth controller route once backend is implemented.
 */
export async function login(email: string, password: string) {
  const response = await api.post('/auth/login', { email, password } satisfies AuthPayload);
  return response.data;
}
