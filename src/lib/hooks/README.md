# 🌍 Locale Preference Hook

Custom React hook untuk manage locale preferences dengan localStorage dan cookie persistence.

## 📍 Priority Order

Hook ini menggunakan priority order sebagai berikut:

1. **localStorage** - User's saved preference (highest priority)
2. **Browser locale** - `navigator.language`
3. **Default locale** - English (`en`) sebagai fallback

## 🎯 Features

- ✅ Automatic localStorage persistence
- ✅ Cookie synchronization untuk SSR compatibility
- ✅ Browser locale detection
- ✅ Type-safe locale management
- ✅ Easy integration dengan next-intl

## 📦 Usage

### Basic Hook Usage

```typescript
import { useLocalePreference } from '@/lib/hooks/useLocalePreference';

function MyComponent() {
  const { 
    locale,              // Current active locale
    changeLocale,        // Function to change locale
    availableLocales,    // All supported locales
    getStoredLocale,     // Get localStorage value
    getBrowserLocale,    // Get browser preference
    getPreferredLocale   // Get preferred based on priority
  } = useLocalePreference();

  return (
    <div>
      <p>Current: {locale}</p>
      <button onClick={() => changeLocale('id')}>
        Switch to Indonesian
      </button>
    </div>
  );
}
```

### Using LocaleSwitcher Component

Contoh component dengan dropdown UI:

```typescript
import { LocaleSwitcher } from '@/components/modules/locale-switcher';

function Header() {
  return (
    <header>
      <nav>
        {/* Other nav items */}
        <LocaleSwitcher showNativeNames={true} />
      </nav>
    </header>
  );
}
```

#### LocaleSwitcher Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `showNativeNames` | `boolean` | `true` | Show native language names (e.g., "Bahasa Indonesia") |
| `className` | `string` | `''` | Custom CSS classes |

## 🔧 How It Works

### Client Side (Hook)

1. User membuka website
2. Hook membaca localStorage: `preferred-locale`
3. Jika tidak ada, cek `navigator.language`
4. Jika browser locale tidak supported, fallback ke `en`
5. Setiap perubahan locale disimpan ke:
   - localStorage
   - Cookie (`NEXT_LOCALE`)

### Server Side (Middleware)

1. Middleware membaca cookie `NEXT_LOCALE`
2. Jika cookie valid, redirect ke locale tersebut
3. Jika tidak, next-intl handle detection (browser → default)

### Flow Diagram

```
User Visit → Middleware Check Cookie → Route to Locale
                                     ↓
                     localStorage ← Hook saves preference
                     Cookie ←
```

## 🎨 Customization

### Adding New Locales

1. **Update config:**
```typescript
// src/i18n/config.ts
export const locales = ["en", "id", "fr"] as const; // Add 'fr'
```

2. **Add translation file:**
```
messages/fr.json
```

3. **Update LocaleSwitcher config:**
```typescript
// src/components/modules/locale-switcher.tsx
const LOCALE_CONFIG = {
  en: { name: 'English', flag: '🇺🇸', nativeName: 'English' },
  id: { name: 'Indonesian', flag: '🇮🇩', nativeName: 'Bahasa Indonesia' },
  fr: { name: 'French', flag: '🇫🇷', nativeName: 'Français' }, // Add this
};
```

4. **Update middleware matcher:**
```typescript
// src/middleware.ts
matcher: ["/", "/(id|en|fr)/:path*"], // Add 'fr'
```

### Custom Locale Switcher UI

Buat component sendiri menggunakan hook:

```typescript
'use client';

import { useLocalePreference } from '@/lib/hooks/useLocalePreference';

export function CustomLocaleSwitcher() {
  const { locale, changeLocale, availableLocales } = useLocalePreference();

  return (
    <div className="flex gap-2">
      {availableLocales.map((loc) => (
        <button
          key={loc}
          onClick={() => changeLocale(loc)}
          className={locale === loc ? 'active' : ''}
        >
          {loc.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
```

## 🧪 Testing

### Test Priority Order

```typescript
// 1. Clear localStorage
localStorage.removeItem('preferred-locale');

// 2. Visit site - should use browser locale or default

// 3. Change locale via switcher
changeLocale('id');

// 4. Refresh page - should remember 'id' from localStorage

// 5. Clear localStorage and change browser language
// Should use new browser language
```

## 📝 API Reference

### `useLocalePreference()`

Returns:

```typescript
{
  locale: Locale;                    // Current active locale
  changeLocale: (locale: Locale) => void;  // Change and persist locale
  getStoredLocale: () => Locale | null;    // Get from localStorage
  getBrowserLocale: () => Locale | null;   // Get from navigator
  getPreferredLocale: () => Locale;        // Get based on priority
  availableLocales: readonly Locale[];     // All supported locales
  defaultLocale: Locale;                   // Default fallback locale
}
```

## 🚨 Important Notes

- **SSR Safe**: Hook uses `typeof window !== 'undefined'` checks
- **Cookie Sync**: Locale persisted to both localStorage AND cookies
- **Type Safety**: Full TypeScript support with `Locale` type
- **Performance**: Minimal re-renders, uses `useCallback` for stability

## 🔗 Related Files

- Hook: `src/lib/hooks/useLocalePreference.ts`
- Component: `src/components/modules/locale-switcher.tsx`
- Middleware: `src/middleware.ts`
- Config: `src/i18n/config.ts`
- Messages: `messages/*.json`
