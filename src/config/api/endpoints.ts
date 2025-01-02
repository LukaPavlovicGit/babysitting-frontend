export const ENDPOINTS = {
    auth: {
      login: '/account/login',
      register: '/account/register',
      logout: '/account/logout',
      resetPassword: '/account/reset-password',
    },
    account: {
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
  } as const;