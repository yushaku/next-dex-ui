'use client';

import { useUser } from '@account-kit/react';
import { useAccount, useEnsName } from 'wagmi';
import { cn, shortenAddress } from '@/lib';
import { HelloGuy } from './components/Hello';
import { NativeBalance } from './components/NativeBalance';
import { YSKStakeForm } from './components/YSKStakeForm';

export default function Dashboard() {
  const user = useUser();
  const { address } = useAccount();
  const ens = useEnsName({ address: address });

  if (!user) {
    return (
      <section className='flex min-h-[80dvh] items-center justify-center'>
        <HelloGuy />
      </section>
    );
  }

  return (
    <div className='no-scrollbar bg-background relative overflow-hidden'>
      <h3
        className={cn('text-text-secondary hidden items-center gap-3 text-lg', {
          flex: address,
        })}
      >
        <span>Welcome: {ens?.data ? ens.data : shortenAddress(address)}</span>
        <NativeBalance address={address} />
      </h3>

      <section className='mt-10 flex flex-wrap gap-10 lg:flex-nowrap'>
        <YSKStakeForm />
        {/* <LidoStakeForm /> */}
      </section>
    </div>
  );
}
