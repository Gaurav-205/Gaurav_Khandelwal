// Environment variable validation and defaults

export const ENV = {
  BASE_URL: process.env.NEXT_PUBLIC_BASE_URL || 'https://gauravkhandelwal.com',
  NODE_ENV: process.env.NODE_ENV || 'development',
  IS_PRODUCTION: process.env.NODE_ENV === 'production',
  IS_DEVELOPMENT: process.env.NODE_ENV === 'development',
} as const;

// Validate required environment variables
export function validateEnv() {
  const warnings: string[] = [];

  if (!process.env.NEXT_PUBLIC_BASE_URL) {
    warnings.push('NEXT_PUBLIC_BASE_URL is not set. Using default: https://gauravkhandelwal.com');
  }

  if (warnings.length > 0 && ENV.IS_DEVELOPMENT) {
    console.warn('Environment warnings:', warnings);
  }

  return warnings;
}

// Run validation on import in development
if (ENV.IS_DEVELOPMENT && typeof window === 'undefined') {
  validateEnv();
}
