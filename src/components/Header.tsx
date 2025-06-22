import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { routes } from "@/utils/constants";
import { SelectChain } from "./SelectChain";
import { WalletButton } from "./WalletButton";

type Props = {
  // theme: string;
  // switchTheme: () => void;
};

export const Header = (_prop: Props) => {
  const pathname = usePathname();
  const title = headTitle[pathname as keyof typeof headTitle] ?? "Home";

  return (
    <header className='mt-5 flex items-center justify-between py-5'>
      <Link href='/' className='flex items-center gap-3 md:hidden'>
        <Image
          src='/logo.png'
          className='size-12'
          alt='Vite logo'
          width={48}
          height={48}
        />
      </Link>

      <h3 className='text-lighter-accent hidden text-lg font-bold md:block lg:text-2xl'>
        {title}
      </h3>

      <div className='flex-center gap-3'>
        {/* <button className="hidden p-3 md:block" onClick={switchTheme}> */}
        {/*   {theme === 'light' ? ( */}
        {/*     <SunIcon className="size-6 fill-accent" /> */}
        {/*   ) : ( */}
        {/*     <MoonIcon className="size-6" /> */}
        {/*   )} */}
        {/* </button> */}

        {/* <span className={`${location.includes('nft') ? '' : 'hidden'}`}>
          <NFTCartList />
        </span> */}

        {/* <span className={`${pathname.includes("shop") ? "" : "hidden"}`}>
          <ShopCartList />
        </span> */}

        {/* <span className='hidden md:block'>
          <NotificationDropdown />
        </span> */}

        <span className='hidden md:block'>
          <SelectChain />
        </span>

        <span className=''>
          <WalletButton />
        </span>

        {/* <MobileSidebar /> */}
      </div>
    </header>
  );
};

const headTitle = {
  [routes.dashboard]: "Dashboard",
  [routes.trade]: "Trade",
  [routes.history]: "History",
  [routes.nfts]: "NFTs Marketplace",
  [routes.nftStudio]: "NFTs Studio",
  [routes.myNFTs]: "Your NFTs Collection",
  [routes.shop]: "My store",
  [routes.admin]: "Admin Dashboard",
  [routes.addLiquidity]: "New position",
  [routes.pools]: "Pools",
};
