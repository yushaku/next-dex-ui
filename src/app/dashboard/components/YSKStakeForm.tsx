import toast from 'react-hot-toast';
import { erc20Abi, formatEther, zeroAddress } from 'viem';
import { bscTestnet } from 'viem/chains';
import { useAccount, useChainId, useReadContracts } from 'wagmi';
import { useState } from 'react';
import { Logo } from '@/components/Logo';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useDebounce } from '@/hooks/useDebounce';
import { cn, contracts, formatNumber } from '@/lib';

export const YSKStakeForm = () => {
  const chainId = useChainId();
  const { address: account } = useAccount();

  const [isOpen, setIsOpen] = useState(false);
  const [amount, setAmount] = useState('0');
  const debounceAmount = useDebounce(amount, 300);
  // const { toggleFarmin } = useFarmState();

  const yskAddress =
    contracts.YSK[chainId as keyof typeof contracts.YSK] ?? null;

  const { data } = useReadContracts({
    contracts: [
      {
        address: yskAddress,
        abi: erc20Abi,
        functionName: 'balanceOf',
        args: [account ?? zeroAddress],
        chainId: bscTestnet.id,
      },
      {
        address: yskAddress,
        abi: erc20Abi,
        functionName: 'totalSupply',
        chainId: bscTestnet.id,
      },
    ],
    query: {
      enabled: Boolean(account && yskAddress),
    },
  });

  const balance = data?.[0]?.result;
  const total = data?.[1]?.result;
  const reward = 0n;

  return (
    <Card className='h-fit w-full p-4 lg:w-1/2'>
      <h3 className='text-text-primary flex items-center gap-2 text-xl font-bold'>
        <Logo className='size-10' /> YSK
      </h3>

      <article className='mt-5 flex justify-between'>
        <p className='text-center'>
          <span className='text-text-secondary block text-sm'>
            You are staking:
          </span>
          <strong className='text-text-primary inline-flex items-center gap-2 text-xl font-bold'>
            {formatNumber(formatEther(reward ?? 0n))}
            <Logo className='size-7' />
          </strong>
        </p>
        <p className='text-center'>
          <span className='text-text-secondary block text-sm'>
            Your Balance
          </span>
          <strong className='text-text-primary flex items-center gap-2 text-xl font-bold'>
            {formatNumber(formatEther(balance ?? 0n))}
            <Logo className='size-7' />
          </strong>
        </p>
      </article>

      <article className='my-10 flex justify-between'>
        <p className='text-center'>
          <span className='text-text-secondary block text-sm'>
            XVS Stake APR
          </span>
          <strong className='text-text-primary text-xl font-bold'>8.31%</strong>
        </p>

        <p className='text-center'>
          <span className='text-text-secondary block text-sm'>
            Daily Emission
          </span>
          <strong className='text-text-primary flex items-center justify-start gap-2 text-xl font-bold'>
            <Logo className='size-7' />
            1.672k
          </strong>
        </p>

        <p className='text-center'>
          <span className='text-text-secondary block text-sm'>
            Total Staked
          </span>
          <strong className='text-text-primary flex items-center justify-start gap-2 text-xl font-bold'>
            <Logo className='size-7' />
            {formatNumber(formatEther(total ?? 0n))}
          </strong>
        </p>
      </article>

      <article
        className={cn(
          'bg-focus h-0 overflow-hidden rounded-lg px-4 transition-all duration-300 ease-in-out',
          isOpen && 'mb-10 h-full py-4'
        )}
      >
        <div className={cn('hidden text-sm', isOpen && 'block')}>
          <label className='flex items-center justify-center gap-2 rounded-lg border border-gray-400 p-2'>
            <Logo className='size-7' />
            <Input
              placeholder='0.0'
              value={amount}
              onChange={(e) => {
                const value = e.target.value;
                setAmount(value);
              }}
              className='no-spinner focus:outline-hidden w-full flex-1 bg-transparent text-lg lg:text-2xl'
              style={{ WebkitAppearance: 'none', MozAppearance: 'textfield' }}
            />
            <button onClick={() => setAmount(formatEther(balance ?? 0n))}>
              MAX
            </button>
          </label>

          <p className='mt-5 flex justify-between'>
            <span className='text-text-secondary block text-sm'>
              You will receive
            </span>
            <strong className='text-text-primary text-sm font-bold'>
              {debounceAmount}
            </strong>
          </p>
        </div>
      </article>

      <article className={cn('flex gap-5')}>
        <Button
          onClick={() => {
            if (isOpen) {
              toast.error('Staking Is Paused');
            } else {
              setIsOpen(!isOpen);
            }
          }}
          className={cn(
            'flex-1',
            isOpen && Number(amount) <= 0 && 'opacity-50'
          )}
          disabled={isOpen && Number(amount) <= 0}
          variant='accent'
          size='default'
        >
          Stake
        </Button>

        <Button
          onClick={() => {
            setIsOpen(false);
            // toggleFarmin(null);
          }}
          className={cn('flex-1', (isOpen || Number(reward) <= 0) && 'hidden')}
          variant='ghost'
        >
          Claim
        </Button>

        <Button
          onClick={() => {
            setIsOpen(false);
            // toggleFarmin(null);
          }}
          className={cn('hidden flex-1', isOpen && 'block')}
          variant='ghost'
        >
          Cancel
        </Button>
      </article>
    </Card>
  );
};
