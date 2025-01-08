import { Environment, ApiConfig } from './types';

export const API_CONFIG: Record<Environment, ApiConfig> = {
  development: {
    baseUrl: 'https://localhost:5001/api',
    timeout: 10000,
    rateLimit: {
      maxRequests: 10,
      timeWindow: 60000, // 1 minute
    },
    features: {
      enableWebsockets: true,
      enableAnalytics: false,
      enablePushNotifications: true,
    },
  },
  production: {
    baseUrl: 'https://localhost:5001/api',
    timeout: 5000,
    rateLimit: {
      maxRequests: 10,
      timeWindow: 60000,
    },
    features: {
      enableWebsockets: true,
      enableAnalytics: true,
      enablePushNotifications: true,
    },
  },
} as const;