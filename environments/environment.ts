export const environment = {
  production: process.env.NODE_ENV === 'production',
  staticUrl: process.env.NEXT_PUBLIC_STATIC_URL || '',
  adminUrl: process.env.NEXT_PUBLIC_ADMIN_URL || '',
  appUrl: process.env.NEXT_PUBLIC_APP_URL || '',
  authUrl: process.env.NEXT_PUBLIC_AUTH_URL || '',
  apiUrl: process.env.NEXT_PUBLIC_API_URL || '',
  meUrl: process.env.NEXT_PUBLIC_ME_URL || '',
  mediaUrl: process.env.NEXT_PUBLIC_MEDIA_URL || ''
};
