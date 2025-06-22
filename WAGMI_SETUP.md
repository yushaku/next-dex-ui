# Alchemy Account Kit Integration

This project now includes support for Alchemy Account Kit, which provides:

- **Smart Account Creation**: Embedded smart wallets with authentication
- **Multiple Auth Methods**: Email, passkey, and social login
- **Gasless Transactions**: Optional gas sponsorship
- **Type Safety**: Full TypeScript support

## Environment Variables

Create a `.env.local` file in your project root with the following variables:

```env
# Alchemy API Key for Account Kit
NEXT_PUBLIC_ALCHEMY_API_KEY=your_alchemy_api_key_here
```

## Getting API Key

### Alchemy API Key

1. Go to [Alchemy](https://www.alchemy.com/)
2. Create an account and a new app
3. Make sure Arbitrum Sepolia is enabled under the Networks tab
4. Create a new configuration in your Smart Wallets Dashboard
5. Apply the config to your app from step 1
6. Enable the authentication methods you want (email, social login, etc.)
7. For testing, use `http://localhost:3000` as your redirect URL
8. Copy your API key from the dashboard

## Configuration Files

### config.ts

The main configuration file that sets up:

- Alchemy transport with your API key
- Arbitrum Sepolia chain
- Authentication methods (email, passkey, Google)
- Cookie-based storage for SSR support

### tailwind.config.ts

Tailwind configuration with Account Kit UI support using `withAccountKitUi`.

### src/app/providers.tsx

Provider setup for Alchemy Account Kit with React Query integration.

### src/app/layout.tsx

Layout with SSR support using cookie-based state management.

## Usage

### Basic Authentication

```tsx
"use client";

import {
  useAuthModal,
  useLogout,
  useSignerStatus,
  useUser,
} from "@account-kit/react";

export default function Home() {
  const user = useUser();
  const { openAuthModal } = useAuthModal();
  const signerStatus = useSignerStatus();
  const { logout } = useLogout();

  return (
    <main>
      {signerStatus.isInitializing ? (
        <>Loading...</>
      ) : user ? (
        <div>
          <p>Success! You're logged in as {user.email ?? "anon"}.</p>
          <button onClick={() => logout()}>Log out</button>
        </div>
      ) : (
        <button onClick={openAuthModal}>Login</button>
      )}
    </main>
  );
}
```

## Features

- **Embedded Smart Wallets**: No seed phrases required
- **Multiple Authentication Methods**: Email, passkey, Google OAuth
- **SSR Support**: Cookie-based state management
- **Gasless Transactions**: Optional gas sponsorship
- **Type Safety**: Full TypeScript support
- **Modern UI**: Pre-built components with Tailwind CSS

## Authentication Methods

The current configuration supports:

- **Email**: Traditional email/password authentication
- **Passkey**: WebAuthn-based authentication
- **Google OAuth**: Social login with popup mode

## Next Steps

1. Set up your environment variables
2. Test authentication with different methods
3. Implement smart account transactions
4. Add gas sponsorship for gasless transactions
5. Customize UI components for your brand

## Troubleshooting

- Make sure your Alchemy app has Arbitrum Sepolia enabled
- Verify your Smart Wallets configuration is applied to your app
- Check that your redirect URL is set to `http://localhost:3000` for development
- Ensure all authentication methods are enabled in your config

## Resources

- [Alchemy Account Kit Documentation](https://www.alchemy.com/docs/wallets/react/quickstart/existing-project)
- [Alchemy Dashboard](https://www.alchemy.com/)
- [Smart Wallets Dashboard](https://dashboard.alchemy.com/smart-wallets)
