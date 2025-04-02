export const APP_CONFIG = {
  name: 'Next.js App',
  description: 'A modern Next.js application',
  version: '1.0.0',
  apiBaseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
  environment: process.env.NODE_ENV || 'development',
} as const;

export const API_ENDPOINTS = {
  auth: {
    login: '/auth/login',
    register: '/auth/register',
    logout: '/auth/logout',
    refresh: '/auth/refresh',
  },
  users: {
    profile: '/users/profile',
    update: '/users/update',
  },
} as const;

export const ROUTES = {
  home: '/',
  login: '/login',
  register: '/register',
  dashboard: '/dashboard',
  profile: '/profile',
} as const;

export const STORAGE_KEYS = {
  token: 'auth_token',
  user: 'user_data',
} as const;
