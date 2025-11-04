# 🤝 02_design_system_api.md: Component Contract & Modular API

## 📌 Guiding Principles for Component Layers

| Layer | Responsibility | Key Rule |
| :--- | :--- | :--- |
| **`components/ui`** | **Base UI/Primitives.** The generic building blocks. | **Stateless and Unopinionated.** Styling is defined using `cva`. |
| **`components/modules`** | **Feature/Module Components.** Functional components for specific app features. | **Primary consumer of `lib/hooks`**. Can manage complex feature-specific state/logic via hooks. |
| **`components/layouts`** | **Page Structure/Layout.** Defines *where* content goes. | **Strictly Content/Data-Agnostic.** Accepts modules and content via `children` or explicit props. |
| **Pages** | **The Route Handler** (`app/page.tsx`). | **Handles all data fetching and composition.** Selects the appropriate **Layout** and injects the required `modules`. |

## 🎣 Hook-Based Strategy Mandate

All reusable or complex logic **must** be extracted into custom hooks within **`lib/hooks`**.

1.  **Logic Separation:** All application logic, state management, and side effects (API calls, data mutations) belong in `lib/hooks`.
2.  **UI Component Logic:** `components/ui` must NOT contain logic beyond basic visual state. `components/modules` is the designated layer for connecting hooks to the UI.

## 📜 Mandatory Component Prop API

| Prop Name | Layer Usage | Description |
| :--- | :--- | :--- |
| **`className`** | **All Layers** | Allows external style overrides (safely merged using **`cn`**). |
| **`variant`/`size`** | **`ui` components** | Defines the component's style and dimensions (defined by `cva`). |
| **`asChild`** | **`ui` components** | Renders the component as a child of another element for composition (Radix standard). |
| **i18n Content**| **All Layers** | The consuming Page must pass the final **translated string** or content. **No component should directly call i18n hooks for text translation.** |