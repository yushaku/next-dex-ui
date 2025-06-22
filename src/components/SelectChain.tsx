import { cn } from "@/utils";
import { arbitrum, bsc, bscTestnet, mainnet } from "viem/chains";
import { useChainId, useSwitchChain } from "wagmi";
import { Arbitrum, BSC, ETH } from "./icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const SelectChain = () => {
  const chainId = useChainId();
  const { switchChain } = useSwitchChain();

  const name = chainList.find(({ id }) => id === chainId)?.name ?? "BSC";
  const Logo = chainList.find(({ id }) => id === chainId)?.logo ?? BSC;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className='flex-center bg-layer hover:bg-focus w-48 gap-3 rounded-xl border border-gray-700 px-6 py-3 text-sm font-semibold outline-none'>
        <h6 className='text-foreground flex gap-2'>
          <Logo className='size-5' />
          <span className='hidden md:inline'>{name}</span>
        </h6>
      </DropdownMenuTrigger>

      <DropdownMenuContent className='bg-layer w-48 rounded-xl py-1 shadow-lg ring-1 ring-gray-700'>
        {chainList.map(({ id, name, logo: Logo }) => (
          <DropdownMenuItem
            key={id}
            onClick={() => switchChain({ chainId: id })}
            className={cn(
              "text-foreground hover:bg-focus flex w-full items-center gap-3 px-4 py-3 text-sm"
            )}
          >
            <Logo className='size-5' />
            {name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const chainList = [
  {
    id: mainnet.id,
    name: "Ethereum",
    logo: ETH,
  },
  {
    id: arbitrum.id,
    name: "Arbitrum",
    logo: Arbitrum,
  },
  {
    id: bsc.id,
    name: "BSC",
    logo: BSC,
  },
  {
    id: bscTestnet.id,
    name: "BSC Testnet",
    logo: BSC,
  },
] as const;
