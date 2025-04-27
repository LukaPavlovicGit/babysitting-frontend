import { FeatureFlags } from './FeatureFlags'
import { RateLimitConfig } from './RateLimitConfig'

export interface ApiConfig {
  baseUrl: string
  timeout: number
  rateLimit: RateLimitConfig
  features: FeatureFlags
}
