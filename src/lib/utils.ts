import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
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

// Generate Gmail compose URL
export function getGmailComposeUrl(email: string, subject?: string, body?: string): string {
  const params = new URLSearchParams();
  params.append('to', email);
  if (subject) params.append('su', subject);
  if (body) params.append('body', body);
  return `https://mail.google.com/mail/?view=cm&fs=1&${params.toString()}`;
}
