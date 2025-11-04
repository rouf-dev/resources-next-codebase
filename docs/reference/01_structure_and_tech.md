# 🚀 01_structure_and_tech.md: Core Project Setup

## Framework and Technologies

| Category | Technology | Rationale |
| :--- | :--- | :--- |
| **Framework** | **Next.js Newest (App Router)** | Excellent for SEO, server-side rendering, and dynamic routing. |
| **Language** | **TypeScript** | Ensures type safety, which is critical for a large-scale application. |
| **Styling** | **Tailwind CSS** | Utility-first approach for rapid, consistent styling. |
| **Primitives** | **Radix UI Primitives** | Provides accessible, unstyled component behavior for full customization. |
| **Animation** | **Framer Motion** | Used for rich, complex, and performant UI animations. |
| **i18n** | **Next-Intl** | Seamless internationalization integration with the App Router. |
| **Theming** | **next-themes** | Handles seamless dark/light mode switching using CSS variables. |
| **Documentation** | **Storybook** | Essential for documenting, isolating, and testing components in development. |

## 📦 Directory Structure & Modular Architecture

The project uses a **Layout-Based Modular Structure**, strictly separating UI from logic (hooks).

* **`app/[locale]`**: The primary dynamic route segment for all localized pages.
* **`components/`**: The entire UI layer.
    * **`components/ui`**: **Global Base UI.** Generic, unopinionated primitives (e.g., `Button`, `Input`).
    * **`components/modules`**: **Feature/Module-Specific Components.** Components grouped by feature (e.g., `/auth/SignInForm`).
    * **`components/layouts`**: **The Reusable Layout Layer.** Components that define a page's structure (e.g., `LeftSidebarLayout`).
* **`lib/`**: Houses all non-UI logic.
    * **`lib/utils.ts`**: Helper functions (e.g., `cn`).
    * **`lib/hooks/`**: **Critical:** Dedicated directory for all reusable custom React hooks (state management, API calls).
* **`messages/`**: Directory for i18n JSON message files (e.g., `en.json`).
* **`docs/reference`**: Folder where all project documentation and these **`.md` files** reside.
* **`stories/` or `components/**.stories.tsx`**: Storybook files for component documentation and testing.