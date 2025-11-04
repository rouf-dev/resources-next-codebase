# 🎨 03_styling_and_variants.md: Styling and Variant Definition

## 🛠 Core Styling Utilities

### 1. The `cn` Utility Function

The **`cn`** utility must be used to merge classes, safely resolving Tailwind conflicts using `tailwind-merge`.

```typescript
// lib/utils.ts
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}