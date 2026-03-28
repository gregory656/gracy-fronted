import axios from 'axios';

/**
 * Axios API client for the NestJS backend.
 *
 * Assumptions / notes for local development:
 * - Backend is running on your dev machine at: http://localhost:3000
 * - iOS simulator can usually reach your machine via `localhost`.
 * - Android emulator typically needs `http://10.0.2.2:3000` instead of `localhost`.
 * - Physical devices need your machine's LAN IP (e.g. http://192.168.1.10:3000).
 *
 * When the backend is ready, consider making this configurable via an Expo public env var:
 *   EXPO_PUBLIC_API_URL="http://localhost:3000"
 */
export const API_BASE_URL = 'http://192.168.100.85:3000'

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15_000,
});
