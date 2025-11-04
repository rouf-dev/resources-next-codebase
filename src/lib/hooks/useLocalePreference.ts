'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useCallback } from 'react';
import { locales, defaultLocale, type Locale } from '@/i18n/config';

const LOCALE_STORAGE_KEY = 'preferred-locale';
const LOCALE_COOKIE_KEY = 'NEXT_LOCALE';

/**
 * Set a cookie value
 */
function setCookie(name: string, value: string, days: number = 365) {
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
}

/**
 * Custom hook for managing locale preferences with localStorage persistence
 * 
 * Priority order:
 * 1. localStorage (user's saved preference)
 * 2. Browser locale (navigator.language)
 * 3. Default locale (English)
 * 
 * @returns {object} - Current locale and function to change locale
 */
export function useLocalePreference() {
  const currentLocale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  // Save current locale to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(LOCALE_STORAGE_KEY, currentLocale);
      setCookie(LOCALE_COOKIE_KEY, currentLocale);
    }
  }, [currentLocale]);

  /**
   * Change the current locale and persist to localStorage
   * @param newLocale - The locale code to switch to
   */
  const changeLocale = useCallback((newLocale: Locale) => {
    if (!locales.includes(newLocale)) {
      console.warn(`Locale "${newLocale}" is not supported. Falling back to default.`);
      newLocale = defaultLocale;
    }

    // Save to localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem(LOCALE_STORAGE_KEY, newLocale);
      setCookie(LOCALE_COOKIE_KEY, newLocale);
    }

    // Navigate to new locale path
    const segments = pathname.split('/');
    segments[1] = newLocale; // Replace locale segment
    const newPath = segments.join('/');
    
    router.push(newPath);
    router.refresh();
  }, [pathname, router]);

  /**
   * Get stored locale preference from localStorage
   */
  const getStoredLocale = useCallback((): Locale | null => {
    if (typeof window === 'undefined') return null;
    
    const stored = localStorage.getItem(LOCALE_STORAGE_KEY);
    if (stored && locales.includes(stored as Locale)) {
      return stored as Locale;
    }
    return null;
  }, []);

  /**
   * Get browser locale preference
   */
  const getBrowserLocale = useCallback((): Locale | null => {
    if (typeof window === 'undefined') return null;
    
    const browserLang = navigator.language.split('-')[0]; // e.g., 'en-US' -> 'en'
    if (locales.includes(browserLang as Locale)) {
      return browserLang as Locale;
    }
    return null;
  }, []);

  /**
   * Get preferred locale based on priority:
   * localStorage > browser locale > default
   */
  const getPreferredLocale = useCallback((): Locale => {
    return getStoredLocale() || getBrowserLocale() || defaultLocale;
  }, [getStoredLocale, getBrowserLocale]);

  return {
    /** Current active locale */
    locale: currentLocale as Locale,
    
    /** Change locale and persist preference */
    changeLocale,
    
    /** Get stored locale from localStorage */
    getStoredLocale,
    
    /** Get browser's preferred locale */
    getBrowserLocale,
    
    /** Get preferred locale based on priority */
    getPreferredLocale,
    
    /** All available locales */
    availableLocales: locales,
    
    /** Default fallback locale */
    defaultLocale,
  };
}
