"use client";

import {
  useAuthModal,
  useLogout,
  useSignerStatus,
  useUser,
} from "@account-kit/react";
import { useAccount } from "wagmi";

export default function Home() {
  const user = useUser();
  const { openAuthModal } = useAuthModal();
  const signerStatus = useSignerStatus();
  const { logout } = useLogout();
  const { address } = useAccount();

  return (
    <main className='flex min-h-screen flex-col items-center justify-center gap-4 p-24 text-center'>
      {signerStatus.isInitializing ? (
        <>Loading...</>
      ) : user ? (
        <div className='flex flex-col gap-2 p-2'>
          <p className='text-xl font-bold'>Success!</p>
          You&apos;re logged in as {user.email ?? "anon"}.
          <p>Address: {address}</p>
          <button
            className='akui-btn akui-btn-primary mt-6'
            onClick={() => logout()}
          >
            Log out
          </button>
        </div>
      ) : (
        <button className='akui-btn akui-btn-primary' onClick={openAuthModal}>
          Login
        </button>
      )}
    </main>
  );
}
