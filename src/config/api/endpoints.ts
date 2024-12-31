export const ENDPOINTS = {
    auth: {
      login: '/account/login',
      register: '/account/register',
      logout: '/account/logout',
      resetPassword: '/account/reset-password',
    },
    profile: {
      get: '/profile',
      update: '/profile/update',
      settings: '/profile/settings',
    },
    bookings: {
      list: '/bookings',
      create: '/bookings/create',
      cancel: (id: string) => `/bookings/${id}/cancel`,
      details: (id: string) => `/bookings/${id}`,
    },
  } as const;