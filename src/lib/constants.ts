import { bsc, bscTestnet } from 'viem/chains';

export const routes = {
  home: '/',
  trade: '/trade',
  bridge: '/trade/bridge',
  nfts: '/nfts',
  myNFTs: '/nfts/my-collection',
  nftStudio: '/nfts/studio',
  nftLaunchpad: '/nfts/launchpad',
  pools: '/pools',
  addLiquidity: '/pools/add-liquidity',
  history: '/history',
  admin: '/admin',
  dashboard: '/dashboard',
  shop: '/shop',
  order: '/shop/order',
} as const;

export const contracts = {
  YSK: {
    [bscTestnet.id]: '0x0000000000000000000000000000000000000000',
    [bsc.id]: '0x0000000000000000000000000000000000000000',
  },
} as const;
