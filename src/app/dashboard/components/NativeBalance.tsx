import { Address, formatEther } from 'viem';
import { base, bsc, bscTestnet } from 'viem/chains';
import { useBalance, useChainId, useEnsName } from 'wagmi';
import { BSC, ETH } from '@/components/icons';
import { cn, explorerLink, shortenAddress } from '@/lib';

export const NativeBalance = ({ address }: { address?: Address }) => {
  const balance = useBalance({ address });

  return (
    <div className='font-bold'>
      {formatEther(balance.data?.value ?? 0n)}
      <NativeToken />
    </div>
  );
};

export const NativeToken = ({
  className,
  ...rest
}: React.SVGProps<SVGSVGElement>) => {
  const chainId: number = useChainId();
  let Token: (_props: React.SVGProps<SVGSVGElement>) => React.JSX.Element;

  switch (chainId) {
    case 1:
    case 5:
    case base.id:
      Token = ETH;
      break;

    case bscTestnet.id:
    case bsc.id:
      Token = BSC;
      break;

    default:
      Token = ETH;
      break;
  }

  return (
    <Token className={cn('ml-3 inline-block size-5', className)} {...rest} />
  );
};

export const AddressLink = ({ address }: { address?: Address }) => {
  const chainId = useChainId();
  const ens = useEnsName({ address });

  return (
    <a
      href={explorerLink({ chainId, type: 'address', to: address ?? '' })}
      target='_blank'
      rel='noopener noreferrer'
      className='text-text-primary hover:underline'
    >
      {ens?.data ? ens.data : shortenAddress(address)}
    </a>
  );
};
