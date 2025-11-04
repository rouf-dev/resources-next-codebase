# ✨ 04_animation_strategy.md: Framer Motion and Richness

## 🧠 Animation Philosophy

1.  **Tailwind for Micro-Interactions:** Use **Tailwind's CSS transitions** for all simple micro-interactions (hover, focus, simple color/size changes).
2.  **Framer Motion for Complexity:** Reserve **Framer Motion** for transitions that require complex state, orchestration, gestures, or physics-based motion (e.g., exit/entrance, view staggering).
3.  **Accessibility:** All complex animations must respect the user's system setting using Framer Motion's `useReducedMotion` hook.

## 🎬 Framer Motion Implementation

### 1. Centralized Variants

All non-trivial animation definitions must be stored in a centralized file: **`./lib/animation-variants.ts`**.

* This promotes reusability and makes it easy to audit and tweak motion across the application.

### 2. Page Transitions

Page-level transitions must be implemented in the root layout using Framer Motion's **`<AnimatePresence mode="wait">`** to wrap the page content.

* The `key={pathname}` prop is essential to force the exit/enter animation sequence on navigation.

### 3. Component Usage

Any module or UI component requiring Framer Motion should be a client component and wrap the relevant DOM element with a `motion.element` (e.g., `motion.div`), referencing the centralized variants.