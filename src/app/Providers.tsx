"use client";

import { AlchemyAccountProvider } from "@account-kit/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { lazy, Suspense } from "react";
import { wagmiConfig } from "@/config/wagmi";
import { alchemyConfig } from "../config/alchemy";
import { ThemeProvider } from "@/components/theme-provider";

// Configure QueryClient with caching to reduce API calls
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Keep data fresh for 5 minutes
      staleTime: 5 * 60 * 1000,
      // Cache data for 10 minutes
      gcTime: 10 * 60 * 1000,
      // Retry failed requests 2 times
      retry: 2,
      // Refetch on window focus only if data is stale
      refetchOnWindowFocus: false,
      // Don't refetch on reconnect if data is fresh
      refetchOnReconnect: false,
    },
  },
});

// Conditionally import React Query DevTools only in development
const ReactQueryDevtools = lazy(() =>
  import("@tanstack/react-query-devtools").then((mod) => ({
    default: mod.ReactQueryDevtools,
  }))
);

export const Providers = (props: any) => {
  return (
    <ThemeProvider
      attribute='class'
      defaultTheme='dark'
      enableSystem
      disableTransitionOnChange
    >
      <QueryClientProvider client={queryClient}>
        <WagmiProvider config={wagmiConfig}>
          <AlchemyAccountProvider
            config={alchemyConfig}
            queryClient={queryClient}
            initialState={props.initialState}
          >
            {props.children}
          </AlchemyAccountProvider>
        </WagmiProvider>

        {process.env.NODE_ENV === "development" && (
          <Suspense fallback={null}>
            <ReactQueryDevtools initialIsOpen={false} />
          </Suspense>
        )}
      </QueryClientProvider>
    </ThemeProvider>
  );
};
