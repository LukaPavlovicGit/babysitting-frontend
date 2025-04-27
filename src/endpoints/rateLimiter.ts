import { ApiConfig } from '@/types'

export class RateLimiter {
  private requests: number[] = []
  private config: ApiConfig

  constructor(config: ApiConfig) {
    this.config = config
  }

  canMakeRequest(): boolean {
    const now = Date.now()
    this.requests = this.requests.filter((time) => now - time < this.config.rateLimit.timeWindow)

    if (this.requests.length >= this.config.rateLimit.maxRequests) {
      return false
    }

    this.requests.push(now)
    return true
  }

  getTimeToNextWindow(): number {
    if (this.requests.length === 0) return 0
    const oldestRequest = Math.min(...this.requests)
    return Math.max(0, this.config.rateLimit.timeWindow - (Date.now() - oldestRequest))
  }
}
