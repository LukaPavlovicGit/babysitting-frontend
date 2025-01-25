export const ENDPOINTS = {
  account: {
    login: '/account/login',
    signup: '/account/register',
    completeParentAccount: '/account/parent-account-complete',
    completeBabysitterAccount: '/account/babysitter-account-complete',
    logout: '/account/logout',
    resetPassword: '/account/reset-password',
    get: '/account',
    getByEmail: (email: string) => `/account/get-account-by-email/${email}`,
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
