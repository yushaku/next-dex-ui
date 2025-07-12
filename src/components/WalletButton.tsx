'use client';

import {
  useAddPasskey,
  useAuthModal,
  useLogout,
  useUser,
} from '@account-kit/react';
import { LogOut } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useEnsName } from 'wagmi';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { cn, createAvatar, shortenAddress } from '@/lib/utils';

export const WalletButton = (props: any) => {
  const user = useUser();
  const { openAuthModal } = useAuthModal();
  const { logout } = useLogout();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { addPasskey, isAddingPasskey } = useAddPasskey();
  const { data: ensAddress } = useEnsName({ address: user?.address });

  if (!user) {
    return (
      <Button
        onClick={() => openAuthModal()}
        className={cn('px-6 py-2', props.className)}
        variant='accent'
        size='lg'
      >
        Connect Wallet
      </Button>
    );
  }

  return (
    <>
      <Button
        variant='accent'
        size='default'
        onClick={() => setIsDialogOpen(true)}
        className={cn(props.className)}
      >
        {user.email
          ? user.email
          : ensAddress
            ? ensAddress
            : shortenAddress(user.address)}
      </Button>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className='rounded-lg'>
          <DialogHeader>
            <DialogTitle className='flex items-center gap-2'>
              <div
                style={createAvatar(user.address)}
                className='size-10 rounded-full'
              ></div>
              <span>Account</span>
            </DialogTitle>
          </DialogHeader>

          <div className='space-y-4'>
            <p className='flex gap-2'>
              <span className='font-medium'>Type:</span>
              <span className='text-muted-foreground'>
                {user.type === 'eoa'
                  ? 'Externally Owned Account'
                  : 'Smart Account'}
              </span>
            </p>
            <p className='flex gap-2'>
              <span className='font-medium'>EVM Address:</span>
              <span
                className='text-muted-foreground cursor-pointer'
                onClick={() => {
                  navigator.clipboard.writeText(user.address);
                  toast.success('Address copied to clipboard');
                }}
              >
                {shortenAddress(user.address)}
              </span>
            </p>

            {user.solanaAddress && (
              <p className='flex gap-2'>
                <span className='font-medium'>Solana Address:</span>
                <span className='text-muted-foreground'>
                  {shortenAddress(user.solanaAddress)}
                </span>
              </p>
            )}

            <div className='flex gap-2 pt-5'>
              <Button
                disabled={isAddingPasskey}
                onClick={() => {
                  addPasskey();
                }}
                variant='accent'
                className={cn('flex-1', user.type === 'eoa' && 'hidden')}
              >
                Add Passkey
              </Button>

              <Button
                variant='outline'
                className='flex-1'
                onClick={() => {
                  logout();
                  setIsDialogOpen(false);
                }}
              >
                <LogOut className='size-4' />
                Sign Out
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
