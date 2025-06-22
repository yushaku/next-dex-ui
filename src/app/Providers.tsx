"use client";

import { AlchemyAccountProvider } from "@account-kit/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { lazy, Suspense } from "react";
import { wagmiConfig } from "@/config/wagmi";
import { alchemyConfig } from "../config/alchemy";
import { ThemeProvider } from "@/components/theme-provider";

const queryClient = new QueryClient();

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
      defaultTheme='system'
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
