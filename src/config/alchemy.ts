import { alchemy, baseSepolia } from '@account-kit/infra';
import {
  AlchemyAccountsUIConfig,
  cookieStorage,
  createConfig,
} from '@account-kit/react';

const uiConfig: AlchemyAccountsUIConfig = {
  illustrationStyle: 'outline',
  auth: {
    sections: [
      [{ type: 'email' }],
      [
        { type: 'passkey' },
        { type: 'social', authProviderId: 'google', mode: 'popup' },
        { type: 'social', authProviderId: 'facebook', mode: 'popup' },
      ],
      [
        {
          type: 'external_wallets',
        },
      ],
    ],
    addPasskeyOnSignup: false,
  },
};

const apiKey = process.env.NEXT_PUBLIC_ALCHEMY_API_KEY;
if (!apiKey) {
  throw new Error('NEXT_PUBLIC_ALCHEMY_API_KEY is not set');
}
export const alchemyConfig = createConfig(
  {
    transport: alchemy({ apiKey }),
    chain: baseSepolia,
    ssr: true, // more about ssr: https://www.alchemy.com/docs/wallets/react/ssr
    storage: cookieStorage, // more about persisting state with cookies: https://www.alchemy.com/docs/wallets/react/ssr#persisting-the-account-state
    enablePopupOauth: true, // must be set to "true" if you plan on using popup rather than redirect in the social login flow
    // policyId: env.NEXT_PUBLIC_GAS_POLICY_ID,
  },
  uiConfig
);
