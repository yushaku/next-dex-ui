import { createConfig, cookieStorage } from "@account-kit/react";
import { QueryClient } from "@tanstack/react-query";
import { arbitrumSepolia, alchemy } from "@account-kit/infra";
import { env } from "./src/lib/env";

export const config = createConfig(
  {
    transport: alchemy({
      apiKey: env.NEXT_PUBLIC_ALCHEMY_API_KEY,
    }),
    chain: arbitrumSepolia,
    ssr: true,
    storage: cookieStorage,
    enablePopupOauth: true,
  },
  {
    auth: {
      sections: [
        [{ type: "email" }],
        [
          { type: "passkey" },
          { type: "social", authProviderId: "google", mode: "popup" },
        ],
      ],
      addPasskeyOnSignup: true,
    },
  }
);

export const queryClient = new QueryClient();
