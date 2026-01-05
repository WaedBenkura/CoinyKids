# shadcn/ui Documentation

shadcn/ui is a collection of re-usable components that you can copy and paste into your apps. It is not a traditional component library but a collection of code snippets.

## Manual Installation

The following steps detail the manual installation process for integrating shadcn/ui components into your project.

### 1. Install Dependencies

Add the required dependencies to your project. This example uses `pnpm`, but you can use `npm` or `yarn` as well.

```bash
pnpm add class-variance-authority clsx tailwind-merge lucide-react tw-animate-css
# or
npm install class-variance-authority clsx tailwind-merge lucide-react tw-animate-css
```

### 2. Configure Path Aliases

Configure the path aliases in your `tsconfig.json` file to easily import components.

**`tsconfig.json`**
```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

### 3. Add Global Styles

Add the base styles and CSS variables for theming to your global CSS file (e.g., `src/styles/globals.css`).

**`src/styles/globals.css`**
```css
@import "tailwindcss";
@import "tw-animate-css";

@custom-variant dark (&:is(.dark *));

:root {
  /* ... (Insert the full :root and .dark CSS variable blocks from the documentation here) ... */
  --background: oklch(1 0 0);
  --foreground: oklch(0.145 0 0);
  --card: oklch(1 0 0);
  --card-foreground: oklch(0.145 0 0);
  --popover: oklch(1 0 0);
  --popover-foreground: oklch(0.145 0 0);
  --primary: oklch(0.205 0 0);
  --primary-foreground: oklch(0.985 0 0);
  --secondary: oklch(0.97 0 0);
  --secondary-foreground: oklch(0.205 0 0);
  --muted: oklch(0.97 0 0);
  --muted-foreground: oklch(0.556 0 0);
  --accent: oklch(0.97 0 0);
  --accent-foreground: oklch(0.205 0 0);
  --destructive: oklch(0.577 0.245 27.325);
  --destructive-foreground: oklch(0.577 0.245 27.325);
  --border: oklch(0.922 0 0);
  --input: oklch(0.922 0 0);
  --ring: oklch(0.708 0 0);
  --chart-1: oklch(0.646 0.222 41.116);
  --chart-2: oklch(0.6 0.118 184.704);
  --chart-3: oklch(0.398 0.07 227.392);
  --chart-4: oklch(0.828 0.189 84.429);
  --chart-5: oklch(0.769 0.188 70.08);
  --radius: 0.625rem;
  --sidebar: oklch(0.985 0 0);
  --sidebar-foreground: oklch(0.145 0 0);
  --sidebar-primary: oklch(0.205 0 0);
  --sidebar-primary-foreground: oklch(0.985 0 0);
  --sidebar-accent: oklch(0.97 0 0);
  --sidebar-accent-foreground: oklch(0.205 0 0);
  --sidebar-border: oklch(0.922 0 0);
  --sidebar-ring: oklch(0.708 0 0);
}

.dark {
  --background: oklch(0.145 0 0);
  --foreground: oklch(0.985 0 0);
  --card: oklch(0.145 0 0);
  --card-foreground: oklch(0.985 0 0);
  --popover: oklch(0.145 0 0);
  --popover-foreground: oklch(0.985 0 0);
  --primary: oklch(0.985 0 0);
  --primary-foreground: oklch(0.205 0 0);
  --secondary: oklch(0.269 0 0);
  --secondary-foreground: oklch(0.985 0 0);
  --muted: oklch(0.269 0 0);
  --muted-foreground: oklch(0.708 0 0);
  --accent: oklch(0.269 0 0);
  --accent-foreground: oklch(0.985 0 0);
  --destructive: oklch(0.396 0.141 25.723);
  --destructive-foreground: oklch(0.637 0.237 25.331);
  --border: oklch(0.269 0 0);
  --input: oklch(0.269 0 0);
  --ring: oklch(0.439 0 0);
  --chart-1: oklch(0.488 0.243 264.376);
  --chart-2: oklch(0.696 0.17 162.48);
  --chart-3: oklch(0.769 0.188 70.08);
  --chart-4: oklch(0.627 0.265 303.9);
  --chart-5: oklch(0.645 0.246 16.439);
  --sidebar: oklch(0.205 0 0);
  --sidebar-foreground: oklch(0.985 0 0);
  --sidebar-primary: oklch(0.488 0.243 264.376);
  --sidebar-primary-foreground: oklch(0.985 0 0);
  --sidebar-accent: oklch(0.269 0 0);
  --sidebar-accent-foreground: oklch(0.985 0 0);
  --sidebar-border: oklch(0.269 0 0);
  --sidebar-ring: oklch(0.439 0 0);
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-destructive-foreground: var(--destructive-foreground);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
  --color-chart-1: var(--chart-1);
  --color-chart-2: var(--chart-2);
  --color-chart-3: var(--chart-3);
  --color-chart-4: var(--chart-4);
  --color-chart-5: var(--chart-5);
  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);
  --color-sidebar: var(--sidebar);
  --color-sidebar-foreground: var(--sidebar-foreground);
  --color-sidebar-primary: var(--sidebar-primary);
  --color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
  --color-sidebar-accent: var(--sidebar-accent);
  --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
  --color-sidebar-border: var(--sidebar-border);
  --color-sidebar-ring: var(--sidebar-ring);
}

@layer base {
  * {
    @apply border-border outline-ring/50;
  }
  body {
    @apply bg-background text-foreground;
  }
}
```

### 4. Create Utility Function

Create a utility function to merge Tailwind CSS classes and handle conditional classes.

**`lib/utils.ts`**
```typescript
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

### 5. Create `components.json`

Create a `components.json` file in the root of your project to configure the component setup.

**`components.json`**
```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "new-york",
  "rsc": false,
  "tsx": true,
  "tailwind": {
    "config": "",
    "css": "src/styles/globals.css",
    "baseColor": "neutral",
    "cssVariables": true,
    "prefix": ""
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  },
  "iconLibrary": "lucide"
}
```

## Components Overview

The following table lists the available components, their purpose, and a direct link to their documentation page for usage examples.

| Component | Purpose | Documentation Link |
| :--- | :--- | :--- |
| **Accordion** | A vertically stacked set of interactive headings that each reveal a section of content. | [https://ui.shadcn.com/docs/components/accordion](https://ui.shadcn.com/docs/components/accordion) |
| **Alert Dialog** | A modal dialog that interrupts the user with important content and expects a response. | [https://ui.shadcn.com/docs/components/alert-dialog](https://ui.shadcn.com/docs/components/alert-dialog) |
| **Alert** | A component to display a short, important message. | [https://ui.shadcn.com/docs/components/alert](https://ui.shadcn.com/docs/components/alert) |
| **Aspect Ratio** | A container that maintains a specific aspect ratio. | [https://ui.shadcn.com/docs/components/aspect-ratio](https://ui.shadcn.com/docs/components/aspect-ratio) |
| **Avatar** | A component for displaying a user's profile picture, initials or a fallback icon. | [https://ui.shadcn.com/docs/components/avatar](https://ui.shadcn.com/docs/components/avatar) |
| **Badge** | A small count and/or descriptive label. | [https://ui.shadcn.com/docs/components/badge](https://ui.shadcn.com/docs/components/badge) |
| **Breadcrumb** | A navigation component that indicates the current page's location within a hierarchical structure. | [https://ui.shadcn.com/docs/components/breadcrumb](https://ui.shadcn.com/docs/components/breadcrumb) |
| **Button Group** | A container for grouping related buttons. | [https://ui.shadcn.com/docs/components/button-group](https://ui.shadcn.com/docs/components/button-group) |
| **Button** | Displays a button or a component that looks like a button. | [https://ui.shadcn.com/docs/components/button](https://ui.shadcn.com/docs/components/button) |
| **Calendar** | A component for displaying a calendar and selecting dates. | [https://ui.shadcn.com/docs/components/calendar](https://ui.shadcn.com/docs/components/calendar) |
| **Card** | A flexible and extensible content container. | [https://ui.shadcn.com/docs/components/card](https://ui.shadcn.com/docs/components/card) |
| **Carousel** | A flexible and extensible content carousel. | [https://ui.shadcn.com/docs/components/carousel](https://ui.shadcn.com/docs/components/carousel) |
| **Chart** | A component for displaying various types of charts and visualizations. | [https://ui.shadcn.com/docs/components/chart](https://ui.shadcn.com/docs/components/chart) |
| **Checkbox** | A control that allows the user to toggle between checked and not checked. | [https://ui.shadcn.com/docs/components/checkbox](https://ui.shadcn.com/docs/components/checkbox) |
| **Collapsible** | A component that can be opened and closed. | [https://ui.shadcn.com/docs/components/collapsible](https://ui.shadcn.com/docs/components/collapsible) |
| **Combobox** | A text input with an associated popover that allows users to filter and select from a list of options. | [https://ui.shadcn.com/docs/components/combobox](https://ui.shadcn.com/docs/components/combobox) |
| **Command** | A command menu component for keyboard-first navigation. | [https://ui.shadcn.com/docs/components/command](https://ui.shadcn.com/docs/components/command) |
| **Context Menu** | A menu that appears upon right-click or long-press. | [https://ui.shadcn.com/docs/components/context-menu](https://ui.shadcn.com/docs/components/context-menu) |
| **Data Table** | A component for displaying large sets of data in a table format. | [https://ui.shadcn.com/docs/components/data-table](https://ui.shadcn.com/docs/components/data-table) |
| **Date Picker** | A component for selecting a single date or a range of dates. | [https://ui.shadcn.com/docs/components/date-picker](https://ui.shadcn.com/docs/components/date-picker) |
| **Dialog** | A window overlaid on either the primary window or another dialog window. | [https://ui.shadcn.com/docs/components/dialog](https://ui.shadcn.com/docs/components/dialog) |
| **Drawer** | A panel that slides in from the edge of the screen, typically on mobile. | [https://ui.shadcn.com/docs/components/drawer](https://ui.shadcn.com/docs/components/drawer) |
| **Dropdown Menu** | Displays a menu to the user — such as a list of actions or settings — triggered by a button. | [https://ui.shadcn.com/docs/components/dropdown-menu](https://ui.shadcn.com/docs/components/dropdown-menu) |
| **Empty** | A component to display when there is no content to show. | [https://ui.shadcn.com/docs/components/empty](https://ui.shadcn.com/docs/components/empty) |
| **Field** | A component for wrapping form elements with a label and description. | [https://ui.shadcn.com/docs/components/field](https://ui.shadcn.com/docs/components/field) |
| **Form** | A component for building forms with validation and state management. | [https://ui.shadcn.com/docs/components/form](https://ui.shadcn.com/docs/components/form) |
| **Hover Card** | A popover that appears when the user hovers over a trigger element. | [https://ui.shadcn.com/docs/components/hover-card](https://ui.shadcn.com/docs/components/hover-card) |
| **Input Group** | A container for grouping related input fields. | [https://ui.shadcn.com/docs/components/input-group](https://ui.shadcn.com/docs/components/input-group) |
| **Input OTP** | A one-time password input field. | [https://ui.shadcn.com/docs/components/input-otp](https://ui.shadcn.com/docs/components/input-otp) |
| **Input** | A text input field. | [https://ui.shadcn.com/docs/components/input](https://ui.shadcn.com/docs/components/input) |
| **Item** | A generic item component, often used in lists or menus. | [https://ui.shadcn.com/docs/components/item](https://ui.shadcn.com/docs/components/item) |
| **Kbd** | A component for displaying keyboard key presses. | [https://ui.shadcn.com/docs/components/kbd](https://ui.shadcn.com/docs/components/kbd) |
| **Label** | A component for associating a label with a form control. | [https://ui.shadcn.com/docs/components/label](https://ui.shadcn.com/docs/components/label) |
| **Menubar** | A menu bar component for desktop applications. | [https://ui.shadcn.com/docs/components/menubar](https://ui.shadcn.com/docs/components/menubar) |
| **Native Select** | A wrapper around the native HTML select element. | [https://ui.shadcn.com/docs/components/native-select](https://ui.shadcn.com/docs/components/native-select) |
| **Navigation Menu** | A collection of links for navigating a website. | [https://ui.shadcn.com/docs/components/navigation-menu](https://ui.shadcn.com/docs/components/navigation-menu) |
| **Pagination** | A component for navigating between pages of content. | [https://ui.shadcn.com/docs/components/pagination](https://ui.shadcn.com/docs/components/pagination) |
| **Popover** | A component that displays a small overlay of content. | [https://ui.shadcn.com/docs/components/popover](https://ui.shadcn.com/docs/components/popover) |
| **Progress** | Displays an indicator showing the completion progress of a task. | [https://ui.shadcn.com/docs/components/progress](https://ui.shadcn.com/docs/components/progress) |
| **Radio Group** | A set of checkable buttons, where only one button can be checked at a time. | [https://ui.shadcn.com/docs/components/radio-group](https://ui.shadcn.com/docs/components/radio-group) |
| **Resizable** | A component that allows the user to resize its children. | [https://ui.shadcn.com/docs/components/resizable](https://ui.shadcn.com/docs/components/resizable) |
| **Scroll Area** | A component that wraps content and provides custom scrollbars. | [https://ui.shadcn.com/docs/components/scroll-area](https://ui.shadcn.com/docs/components/scroll-area) |
| **Select** | A custom select component that allows users to choose from a list of options. | [https://ui.shadcn.com/docs/components/select](https://ui.shadcn.com/docs/components/select) |
| **Separator** | A visual separator between sections of content. | [https://ui.shadcn.com/docs/components/separator](https://ui.shadcn.com/docs/components/separator) |
| **Sheet** | A panel that slides in from the edge of the screen, similar to a Drawer. | [https://ui.shadcn.com/docs/components/sheet](https://ui.shadcn.com/docs/components/sheet) |
| **Sidebar** | A component for displaying a navigation sidebar. | [https://ui.shadcn.com/docs/components/sidebar](https://ui.shadcn.com/docs/components/sidebar) |
| **Skeleton** | A component used to show a placeholder while content is loading. | [https://ui.shadcn.com/docs/components/skeleton](https://ui.shadcn.com/docs/components/skeleton) |
| **Slider** | A component that allows the user to select a value from a range. | [https://ui.shadcn.com/docs/components/slider](https://ui.shadcn.com/docs/components/slider) |
| **Sonner** | A component for displaying toast notifications. | [https://ui.shadcn.com/docs/components/sonner](https://ui.shadcn.com/docs/components/sonner) |
| **Spinner** | A component to indicate a loading state. | [https://ui.shadcn.com/docs/components/spinner](https://ui.shadcn.com/docs/components/spinner) |
| **Switch** | A control that allows the user to toggle between checked and not checked. | [https://ui.shadcn.com/docs/components/switch](https://ui.shadcn.com/docs/components/switch) |
| **Table** | A component for displaying data in a tabular format. | [https://ui.shadcn.com/docs/components/table](https://ui.shadcn.com/docs/components/table) |
| **Tabs** | A set of layered sections of content—known as tab panels—that are displayed one at a time. | [https://ui.shadcn.com/docs/components/tabs](https://ui.shadcn.com/docs/components/tabs) |
| **Textarea** | A multi-line text input field. | [https://ui.shadcn.com/docs/components/textarea](https://ui.shadcn.com/docs/components/textarea) |
| **Toast** | A component for displaying a short, non-intrusive message. | [https://ui.shadcn.com/docs/components/toast](https://ui.shadcn.com/docs/components/toast) |
| **Toggle Group** | A set of two or more toggle buttons. | [https://ui.shadcn.com/docs/components/toggle-group](https://ui.shadcn.com/docs/components/toggle-group) |
| **Toggle** | A two-state button that can be either on or off. | [https://ui.shadcn.com/docs/components/toggle](https://ui.shadcn.com/docs/components/toggle) |
| **Tooltip** | A popover that displays a brief, informative message when a user hovers over an element. | [https://ui.shadcn.com/docs/components/tooltip](https://ui.shadcn.com/docs/components/tooltip) |
| **Typography** | A set of components for styling text content. | [https://ui.shadcn.com/docs/components/typography](https://ui.shadcn.com/docs/components/typography) |
