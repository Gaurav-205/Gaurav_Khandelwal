import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Throttle function for performance optimization
export function throttle<T extends (...args: unknown[]) => unknown>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  return function (this: any, ...args: Parameters<T>) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// Debounce function for performance optimization
export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout;
  return function (this: any, ...args: Parameters<T>) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
}

// Check if device supports WebGL
export function checkWebGLSupport(): boolean {
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    return !!gl;
  } catch {
    return false;
  }
}

// Format number with separators
export function formatNumber(
  num: number,
  separator?: string,
  maxDecimals?: number
): string {
  const hasDecimals = maxDecimals && maxDecimals > 0;
  const options: Intl.NumberFormatOptions = {
    useGrouping: !!separator,
    minimumFractionDigits: hasDecimals ? maxDecimals : 0,
    maximumFractionDigits: hasDecimals ? maxDecimals : 0,
  };
  const formattedNumber = Intl.NumberFormat('en-US', options).format(num);
  return separator ? formattedNumber.replace(/,/g, separator) : formattedNumber;
}

// Get decimal places from a number
export function getDecimalPlaces(num: number): number {
  const str = num.toString();
  if (str.includes('.')) {
    const parts = str.split('.');
    if (parts.length > 1 && parts[1]) {
      const decimals = parts[1];
      if (parseInt(decimals) !== 0) {
        return decimals.length;
      }
    }
  }
  return 0;
}

// Generate Gmail compose URL
export function getGmailComposeUrl(email: string, subject?: string, body?: string): string {
  const params = new URLSearchParams();
  params.append('to', email);
  if (subject) params.append('su', subject);
  if (body) params.append('body', body);
  return `https://mail.google.com/mail/?view=cm&fs=1&${params.toString()}`;
}
