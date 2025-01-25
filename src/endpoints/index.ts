import { ApiConfig, Environment, FeatureFlags } from './types'
import { API_CONFIG } from './config'
import { ENDPOINTS } from './endpoints'
import { RateLimiter } from './rateLimiter'
import { ParentAccountCompletionData } from '@/schemas/parentAccountCompletionSchema'
import { BabysitterAccountCompletionData } from '@/schemas/babysitterAccountCompletionSchema'

class Api {
  private config: ApiConfig
  private rateLimiter: RateLimiter

  constructor() {
    const env = (process.env.NEXT_PUBLIC_ENV || 'development') as Environment
    this.config = API_CONFIG[env]
    this.rateLimiter = new RateLimiter(this.config)
  }

  private getFullUrl(endpoint: string): string {
    return `${this.config.baseUrl}${endpoint}`
  }

  private async handleRequest(endpoint: string, options: RequestInit = {}) {
    if (!this.rateLimiter.canMakeRequest()) {
      const waitTime = this.rateLimiter.getTimeToNextWindow()
      throw new Error(`Rate limit exceeded. Please wait ${Math.ceil(waitTime / 1000)} seconds.`)
    }

    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), this.config.timeout)

    try {
      const response = await fetch(this.getFullUrl(endpoint), {
        ...options,
        signal: controller.signal,
      })
      return response
    } finally {
      clearTimeout(timeoutId)
    }
  }

  get endpoints() {
    return {
      account: {
        login: (data: { email: string; password: string; rememberMe?: boolean }) =>
          this.handleRequest(ENDPOINTS.account.login, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
          }),

        signup: (data: { email: string; password: string; firstName: string; lastName: string }) =>
          this.handleRequest(ENDPOINTS.account.signup, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
          }),

        completeParentAccount: (data: ParentAccountCompletionData) =>
          this.handleRequest(ENDPOINTS.account.completeParentAccount, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
          }),

        completeBabysitterAccount: (data: BabysitterAccountCompletionData) =>
          this.handleRequest(ENDPOINTS.account.completeBabysitterAccount, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
          }),

        logout: () => this.handleRequest(ENDPOINTS.account.logout),

        resetPassword: () => this.handleRequest(ENDPOINTS.account.resetPassword),

        get: () => this.handleRequest(ENDPOINTS.account.get),

        getByEmail: (data: { email: string }) =>
          this.handleRequest(ENDPOINTS.account.getByEmail(data.email), {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
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
    }
  }

  isFeatureEnabled<K extends keyof FeatureFlags>(feature: K): boolean {
    return this.config.features[feature]
  }

  getConfig(): Readonly<ApiConfig> {
    return Object.freeze({ ...this.config })
  }
}

export const api = new Api()
