# 🧭 PROJECT FOLDER EXPLANATION GUIDE

This document explains the purpose and rules for each core directory in the project's **Layout-Based Modular Architecture**.

## 📂 Core Structure

| Folder | Responsibility | Key Rule |
| :--- | :--- | :--- |
| **`app/[locale]`** | **Routing and Pages** | The **composition layer** where data is fetched and modules are assembled into layouts. |
| **`messages`** | **Localization Files** | Stores all JSON files for translation strings (e.g., `en.json`, `fr.json`). |
| **`lib/hooks`** | **Application Logic** | **CRITICAL:** Dedicated location for all reusable custom React hooks (state management, API calls, business logic). |
| **`lib/utils.ts`** | **Utilities and Helpers** | Contains non-hook logic like the **`cn`** class merging function and type definitions. |
| **`docs/reference`** | **Project Documentation** | Where all these setup and reference files are permanently stored. |
| **`stories/`** | **Component Documentation** | Houses the Storybook files for visual component documentation and isolated testing. |

## 🧩 The `components` Directory (UI Layers)

### `components/ui` (Base UI / Primitives)
* **Purpose:** The smallest, most generic building blocks. Unopinionated presentation components.
* **Rules:** Must be **stateless**. Styling is strictly managed by **Tailwind CSS and `cva` variants**.

### `components/modules` (Feature/Module Components)
* **Purpose:** Functional components that represent a specific feature or section of the UI.
* **Rules:** The **primary layer for consuming application logic**. Modules import and utilize hooks from `lib/hooks`. Group modules logically by feature (e.g., `/modules/auth`).

### `components/layouts` (Page Structure)
* **Purpose:** Defines reusable page structures and organization.
* **Rules:** **Strictly content/data-agnostic.** They only handle the positioning (grid, flex) of components passed into them via props (e.g., `Sidebar`) or `children`.