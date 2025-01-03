import { ApiConfig, Environment, FeatureFlags } from './types';
import { API_CONFIG } from './config';
import { ENDPOINTS } from './endpoints';
import { RateLimiter } from './rateLimiter'; 

class Api {
  private config: ApiConfig;
  private rateLimiter: RateLimiter;

  constructor() {
    const env = (process.env.NEXT_PUBLIC_ENV || 'development') as Environment;
    this.config = API_CONFIG[env];
    this.rateLimiter = new RateLimiter(this.config);
  }

  private getFullUrl(endpoint: string): string {
    return `${this.config.baseUrl}${endpoint}`;
  }

  private async handleRequest(endpoint: string, options: RequestInit = {}) {
    if (!this.rateLimiter.canMakeRequest()) {
      const waitTime = this.rateLimiter.getTimeToNextWindow();
      throw new Error(`Rate limit exceeded. Please wait ${Math.ceil(waitTime / 1000)} seconds.`);
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.config.timeout);

    try {
      const response = await fetch(this.getFullUrl(endpoint), {
        ...options,
        signal: controller.signal,
      });
      return response;
    } finally {
      clearTimeout(timeoutId);
    }
  }

  get endpoints() {
    return {
      auth: {
        login: () => this.handleRequest(ENDPOINTS.auth.login),
        register: () => this.handleRequest(ENDPOINTS.auth.register),
        logout: () => this.handleRequest(ENDPOINTS.auth.logout),
        resetPassword: () => this.handleRequest(ENDPOINTS.auth.resetPassword),
      },
      account: {
        get: () => this.handleRequest(ENDPOINTS.account.get),
        getByEmail: (email: string) => 
          this.handleRequest(ENDPOINTS.account.getByEmail(email), {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
          }),
        update: () => this.handleRequest(ENDPOINTS.account.update),
        settings: () => this.handleRequest(ENDPOINTS.account.settings),
      },
      bookings: {
        list: () => this.handleRequest(ENDPOINTS.bookings.list),
        create: () => this.handleRequest(ENDPOINTS.bookings.create),
        cancel: (id: string) => this.handleRequest(ENDPOINTS.bookings.cancel(id)),
        details: (id: string) => this.handleRequest(ENDPOINTS.bookings.details(id)),
      },
    };
  }

  isFeatureEnabled<K extends keyof FeatureFlags>(feature: K): boolean {
    return this.config.features[feature];
  }

  getConfig(): Readonly<ApiConfig> {
    return Object.freeze({ ...this.config });
  }
}

export const api = new Api();