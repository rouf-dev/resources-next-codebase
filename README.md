# Resources Next Codebase

A modern, scalable Next.js application built with TypeScript, featuring a modular architecture with internationalization support.

## 🚀 Features

- **Next.js 14** with App Router for optimal performance and SEO
- **TypeScript** for type-safe development
- **Tailwind CSS** with custom design system and dark/light themes
- **Framer Motion** for rich animations
- **next-intl** for internationalization (English and Indonesian)
- **Radix UI** primitives for accessible components
- **Class Variance Authority (CVA)** for variant management
- **Modular Architecture** separating UI, logic, and layouts

## 📁 Project Structure

```
├── src/                          # Source code directory
│   ├── app/                      # Next.js App Router pages
│   │   ├── [locale]/             # Internationalized routes
│   │   │   ├── layout.tsx        # Locale layout with NextIntlClientProvider
│   │   │   └── page.tsx          # Homepage
│   │   ├── globals.css           # Global styles and CSS variables
│   │   └── layout.tsx            # Root layout with ThemeProvider
│   ├── components/               # UI components
│   │   ├── ui/                   # Base UI primitives (Button, Container)
│   │   ├── modules/              # Feature-specific components (Hero, Features)
│   │   ├── layouts/              # Page layout components
│   │   └── theme-provider.tsx    # Theme provider component
│   ├── lib/                      # Utilities and hooks
│   │   ├── hooks/                # Custom React hooks
│   │   ├── animation-variants.ts # Centralized Framer Motion variants
│   │   └── utils.ts              # Utility functions (cn helper)
│   ├── i18n/                     # Internationalization config
│   │   ├── config.ts             # Shared i18n configuration
│   │   └── request.ts            # Request-based i18n setup
│   └── middleware.ts             # Next.js middleware for i18n routing
├── messages/                     # i18n translation files
│   ├── en.json                   # English translations
│   └── id.json                   # Indonesian translations
├── docs/reference/               # Project documentation
├── public/                       # Static assets
└── stories/                      # Storybook stories

```

## 🏗️ Architecture Principles

### Component Layers

1. **`components/ui`** - Generic, stateless UI primitives with variants
2. **`components/modules`** - Feature-specific components that consume hooks
3. **`components/layouts`** - Data-agnostic page structure components
4. **Pages** - Composition layer that fetches data and assembles modules

### Styling Strategy

- **Tailwind CSS** for all styling with utility classes
- **CSS Variables** for theme customization (light/dark mode)
- **CVA (Class Variance Authority)** for component variants
- **cn utility** for safe class merging with `tailwind-merge`

### Animation Strategy

- **Tailwind transitions** for simple micro-interactions
- **Framer Motion** for complex animations, page transitions, and orchestration
- **Centralized variants** in `lib/animation-variants.ts` for consistency

### Internationalization

- **Default locale:** English (`en`)
- **Supported locales:** English (`en`), Indonesian (`id`)
- **Translation files:** JSON files in `messages/` directory
- **Routing:** Automatic locale detection and routing via middleware

## 🚀 Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

The app will automatically redirect to `/en` (English) or use your preferred locale.

### Build

```bash
npm run build
```

### Start Production Server

```bash
npm start
```

### Run Storybook

```bash
npm run storybook
```

## 🌍 Available Routes

- `/` - Redirects to default locale
- `/en` - English homepage
- `/id` - Indonesian homepage (Bahasa Indonesia)

## 🎨 Customization

### Adding New Colors

Edit `tailwind.config.ts` and `src/app/globals.css` to add new color variables for both light and dark themes.

### Adding New Locales

1. Create a new JSON file in `messages/` (e.g., `messages/fr.json`)
2. Add the locale to `src/i18n/config.ts` in the `locales` array
3. Update the middleware matcher in `src/middleware.ts`

### Creating New Components

Follow the modular architecture:

- **UI Components:** Add to `src/components/ui/` with CVA variants
- **Modules:** Add to `src/components/modules/` and consume hooks from `src/lib/hooks/`
- **Layouts:** Add to `src/components/layouts/` for reusable page structures

## 📚 Documentation

Comprehensive documentation is available in `docs/reference/`:

- `01_structure_and_tech.md` - Framework and technology choices
- `02_design_system_api.md` - Component contracts and modular API
- `03_styling_and_variants.md` - Styling utilities and variant system
- `04_animation_strategy.md` - Framer Motion implementation guide
- `05_config_and_i18N.md` - Configuration and i18n strategy
- `FOLDER_GUIDE.md` - Detailed explanation of folder structure
- `OPTIONAL_DOCKER_DEPLOYMENT.md` - Docker containerization guide

## 🐳 Docker Deployment (Optional)

See `docs/reference/OPTIONAL_DOCKER_DEPLOYMENT.md` for complete Docker setup instructions.

## 📝 License

This project is licensed under the MIT License.

---

Built with ❤️ using Next.js, TypeScript, and Tailwind CSS