export type Environment = 'development' | 'production';

export interface RateLimitConfig {
  maxRequests: number;
  timeWindow: number;
}

export interface FeatureFlags {
  enableWebsockets: boolean;
  enableAnalytics: boolean;
  enablePushNotifications: boolean;
}

export interface ApiConfig {
  baseUrl: string;
  timeout: number;
  rateLimit: RateLimitConfig;
  features: FeatureFlags;
}