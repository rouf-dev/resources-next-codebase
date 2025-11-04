'use client';

import * as React from 'react';
import { useLocalePreference } from '@/lib/hooks/useLocalePreference';
import { type Locale } from '@/i18n/config';

// Locale display names and flags
const LOCALE_CONFIG = {
  en: {
    name: 'English',
    flag: '🇺🇸',
    nativeName: 'English',
  },
  id: {
    name: 'Indonesian',
    flag: '🇮🇩',
    nativeName: 'Bahasa Indonesia',
  },
} as const;

interface LocaleSwitcherProps {
  /** Show native language names (e.g., "Bahasa Indonesia" instead of "Indonesian") */
  showNativeNames?: boolean;
  /** Custom className for styling */
  className?: string;
}

/**
 * Dropdown component for switching between available locales
 * Displays country flags and language names
 */
export function LocaleSwitcher({ 
  showNativeNames = true,
  className = '',
}: LocaleSwitcherProps) {
  const { locale, changeLocale, availableLocales } = useLocalePreference();
  const [isOpen, setIsOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLocaleChange = (newLocale: Locale) => {
    changeLocale(newLocale);
    setIsOpen(false);
  };

  const currentLocaleConfig = LOCALE_CONFIG[locale as keyof typeof LOCALE_CONFIG];
  const displayName = showNativeNames 
    ? currentLocaleConfig.nativeName 
    : currentLocaleConfig.name;

  return (
    <div className={`relative inline-block text-left ${className}`} ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <span className="text-xl">{currentLocaleConfig.flag}</span>
        <span>{displayName}</span>
        <svg
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 origin-top-right rounded-md border border-border bg-background shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
          <div className="py-1" role="menu">
            {availableLocales.map((loc) => {
              const config = LOCALE_CONFIG[loc as keyof typeof LOCALE_CONFIG];
              const isActive = loc === locale;
              const name = showNativeNames ? config.nativeName : config.name;

              return (
                <button
                  key={loc}
                  onClick={() => handleLocaleChange(loc)}
                  className={`
                    flex items-center gap-3 w-full px-4 py-2 text-sm transition-colors
                    ${isActive 
                      ? 'bg-accent text-accent-foreground font-medium' 
                      : 'text-foreground hover:bg-accent hover:text-accent-foreground'
                    }
                  `}
                  role="menuitem"
                >
                  <span className="text-xl">{config.flag}</span>
                  <span className="flex-1 text-left">{name}</span>
                  {isActive && (
                    <svg
                      className="w-4 h-4 text-primary"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
