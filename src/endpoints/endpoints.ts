export const ENDPOINTS = {
  account: {
    login: '/account/login',
    signup: '/account/register',
    completeAccount: '/account/complete',
    logout: '/account/logout',
    resetPassword: '/account/reset-password',
    get: '/account',
    getByEmail: (email: string) => `/account/get-account-by-email/${email}`,
    getByCriteria: '/account/get-by-criteria',
    update: '/account/update',
    settings: '/account/settings',
  },
  bookings: {
    list: '/bookings',
    create: '/bookings/create',
    cancel: (id: string) => `/bookings/${id}/cancel`,
    details: (id: string) => `/bookings/${id}`,
  },
} as const
