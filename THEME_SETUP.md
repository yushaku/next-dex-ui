# Theme Configuration Guide

This guide explains how the theme system is configured in your Next.js application using `next-themes` and shadcn/ui.

## Overview

The theme system provides:

- **Light/Dark mode** switching
- **System theme** detection
- **Persistent theme** preferences
- **Smooth transitions** between themes
- **SSR-safe** theme handling

## Components

### 1. ThemeProvider (`src/components/theme-provider.tsx`)

The main theme provider that wraps your application:

```tsx
"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
```

### 2. ThemeToggle (`src/components/theme-toggle.tsx`)

A dropdown component for switching themes:

```tsx
"use client";

import * as React from "react";
import { Moon, Sun, Monitor } from "lucide-react";
import { useThemeProvider } from "@/hooks/use-theme";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ThemeToggle() {
  const { setTheme, mounted } = useThemeProvider();

  if (!mounted) {
    return (
      <Button variant='outline' size='icon' disabled>
        ...
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='outline' size='icon'>
          <Sun className='h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0' />
          <Moon className='absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <DropdownMenuItem onClick={() => setTheme("light")}>
          <Sun className='mr-2 h-4 w-4' />
          <span>Light</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          <Moon className='mr-2 h-4 w-4' />
          <span>Dark</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          <Monitor className='mr-2 h-4 w-4' />
          <span>System</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
```

### 3. useTheme Hook (`src/hooks/use-theme.ts`)

Custom hook for safe theme management:

```tsx
"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function useThemeProvider() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return {
      theme: undefined,
      setTheme: () => null,
      resolvedTheme: undefined,
      mounted: false,
    };
  }

  return {
    theme,
    setTheme,
    resolvedTheme,
    mounted,
  };
}
```

## Configuration

### Provider Setup (`src/app/providers.tsx`)

The theme provider is configured in your main providers:

```tsx
import { ThemeProvider } from "@/components/theme-provider";

export const Providers = (props: any) => {
  return (
    <ThemeProvider
      attribute='class'
      defaultTheme='system'
      enableSystem
      disableTransitionOnChange
    >
      {/* Other providers */}
      {props.children}
    </ThemeProvider>
  );
};
```

### Configuration Options

- **`attribute="class"`**: Uses CSS classes for theme switching
- **`defaultTheme="system"`**: Defaults to system preference
- **`enableSystem`**: Enables system theme detection
- **`disableTransitionOnChange`**: Prevents flash during theme changes

## Usage

### 1. Adding Theme Toggle to Components

```tsx
import { ThemeToggle } from "@/components/theme-toggle";

export function Navbar() {
  return (
    <nav className='flex items-center gap-4'>
      {/* Your navigation items */}
      <ThemeToggle />
    </nav>
  );
}
```

### 2. Using Theme in Components

```tsx
"use client";

import { useThemeProvider } from "@/hooks/use-theme";

export function MyComponent() {
  const { theme, setTheme, resolvedTheme } = useThemeProvider();

  return (
    <div>
      <p>Current theme: {theme}</p>
      <p>Resolved theme: {resolvedTheme}</p>
      <button onClick={() => setTheme("dark")}>Switch to Dark</button>
    </div>
  );
}
```

### 3. CSS Classes for Theming

The theme system uses CSS classes for styling:

```css
/* Light theme (default) */
.light {
  --background: #ffffff;
  --foreground: #000000;
}

/* Dark theme */
.dark {
  --background: #000000;
  --foreground: #ffffff;
}
```

## CSS Variables

Your theme uses CSS variables defined in `src/styles/globals.css`:

```css
@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --card: 0 0% 100%;
    --card-foreground: 222.2 84% 4.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 222.2 84% 4.9%;
    --primary: 222.2 47.4% 11.2%;
    --primary-foreground: 210 40% 98%;
    --secondary: 210 40% 96%;
    --secondary-foreground: 222.2 84% 4.9%;
    --muted: 210 40% 96%;
    --muted-foreground: 215.4 16.3% 46.9%;
    --accent: 210 40% 96%;
    --accent-foreground: 222.2 84% 4.9%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%;
    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
    --ring: 222.2 84% 4.9%;
    --radius: 0.5rem;
  }

  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
    --card: 222.2 84% 4.9%;
    --card-foreground: 210 40% 98%;
    --popover: 222.2 84% 4.9%;
    --popover-foreground: 210 40% 98%;
    --primary: 210 40% 98%;
    --primary-foreground: 222.2 47.4% 11.2%;
    --secondary: 217.2 32.6% 17.5%;
    --secondary-foreground: 210 40% 98%;
    --muted: 217.2 32.6% 17.5%;
    --muted-foreground: 215 20.2% 65.1%;
    --accent: 217.2 32.6% 17.5%;
    --accent-foreground: 210 40% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 210 40% 98%;
    --border: 217.2 32.6% 17.5%;
    --input: 217.2 32.6% 17.5%;
    --ring: 212.7 26.8% 83.9%;
  }
}
```

## Best Practices

### 1. Always Use the Custom Hook

```tsx
// ✅ Good
import { useThemeProvider } from "@/hooks/use-theme";

// ❌ Avoid
import { useTheme } from "next-themes";
```

### 2. Handle Hydration

Always check if the component is mounted before rendering theme-dependent content:

```tsx
const { mounted } = useThemeProvider();

if (!mounted) {
  return <div>Loading...</div>;
}
```

### 3. Use CSS Variables

Instead of hardcoding colors, use CSS variables:

```tsx
// ✅ Good
<div className="bg-background text-foreground">

// ❌ Avoid
<div className="bg-white dark:bg-black text-black dark:text-white">
```

### 4. Test Both Themes

Always test your components in both light and dark modes to ensure proper contrast and readability.

## Troubleshooting

### Theme Not Persisting

Make sure the `ThemeProvider` wraps your entire application in `src/app/providers.tsx`.

### Flash of Unstyled Content (FOUC)

The `disableTransitionOnChange` option helps prevent this. You can also add a script to the `<head>` to set the theme before the page loads.

### SSR Issues

Always use the `useThemeProvider` hook instead of `useTheme` directly to handle SSR properly.

## Customization

### Adding New Themes

To add custom themes, extend the CSS variables in your `globals.css`:

```css
[data-theme="custom"] {
  --background: #your-color;
  --foreground: #your-color;
  /* ... other variables */
}
```

### Custom Theme Toggle

You can create custom theme toggles by using the `useThemeProvider` hook:

```tsx
export function CustomThemeToggle() {
  const { theme, setTheme } = useThemeProvider();

  return (
    <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
      Toggle Theme
    </button>
  );
}
```

The theme system is now fully configured and ready to use throughout your application!
