# ⚙️ 05_config_and_i18n.md: Configuration and i18n Strategy

## 🌍 Internationalization (i18n)

### 1. Routing Requirement

* **Default Locale:** **`en` (English)**.
* **Localized Paths:** All other locales must use the dynamic segment: **`app/[locale]/page.tsx`**.

### 2. Next-Intl Setup

* **Message Files:** Translation files are stored in the **`./messages`** directory.
* **Root Layout Provider:** The **`NextIntlClientProvider`** must wrap the application in the root `layout.tsx`, initialized with server-fetched messages.
* **Translation Principle:** Translation happens at the **Page** or **Module** level. UI components and Layouts receive the final translated strings as props.

## 🌓 Theming and Customization

### 1. Theme Provider

The **`next-themes`** library manages the active theme.

* **Implementation:** The `<ThemeProvider>` component must wrap the entire application in the **root `layout.tsx`**.
* **Configuration:** Use `attribute="class"` to apply theme classes (`light`/`dark`) to the `<html>` element.

### 2. Storybook Integration

All components (`ui` and `modules`) must have corresponding Storybook files.

* **Purpose:** To visually test components in isolation, document their props (`args`), and demonstrate all available `variants` and states.