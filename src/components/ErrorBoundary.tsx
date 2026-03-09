'use client';

import React, { Component, ReactNode } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log error for debugging
    if (process.env.NODE_ENV === 'development') {
      console.error('ErrorBoundary caught an error:', error, errorInfo);
    }
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
          <motion.div
            className="text-center max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="mb-8 flex items-center justify-center gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-white/20" />
              <span className="text-white/40 font-montserrat text-xs tracking-widest">
                ERROR
              </span>
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-white/20" />
            </motion.div>

            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-montserrat font-normal mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Something went wrong
            </motion.h1>

            <motion.p
              className="text-white/70 font-montserrat font-light text-base md:text-lg leading-relaxed mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              We encountered an unexpected error. Please try refreshing the page or return to the homepage.
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <button
                onClick={() => window.location.reload()}
                className="px-8 py-3 bg-white text-black font-montserrat text-sm tracking-wide hover:bg-white/90 transition-colors duration-300 rounded-full"
              >
                Refresh page
              </button>
              <Link
                href="/"
                className="px-8 py-3 border border-white/20 text-white font-montserrat text-sm tracking-wide hover:bg-white/5 transition-colors duration-300 rounded-full"
              >
                Go home
              </Link>
            </motion.div>
          </motion.div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
