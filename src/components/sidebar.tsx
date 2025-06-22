"use client";

import { cn } from "@/utils";
import {
  ArrowLeft,
  RotateCcw,
  Banknote,
  Calendar,
  Forward,
  Home,
  Plus,
  Scissors,
  ShoppingBag,
  Wallet,
  Flower,
} from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import Image from "next/image";

export const Sidebar = () => {
  const pathname = usePathname();
  const [isSmall, setIsSmall] = useState(false);

  const isTablet = useMediaQuery(
    "(min-width: 600px) and (max-width: 1024px) and (orientation: portrait)"
  );

  useEffect(() => {
    setIsSmall(isTablet);
  }, [isTablet]);

  return (
    <section
      className={cn(
        "bg-layer relative z-50 hidden h-screen transition-all duration-300 md:block",
        isSmall ? "w-16" : "w-72"
      )}
    >
      <Link
        href='/'
        className={`flex items-center gap-3 ${isSmall ? "px-2 py-8" : "p-8"}`}
      >
        <Image
          src='/logo.png'
          className='size-10'
          alt='Logo'
          width={40}
          height={40}
        />
        <h3
          className={`${
            isSmall ? "hidden" : "block"
          } text-foreground text-2xl font-bold`}
        >
          YuDex
        </h3>
      </Link>

      <span
        className='bg-background hover:bg-focus absolute top-[8%] -right-3 cursor-pointer rounded-full p-2'
        onClick={() => setIsSmall(!isSmall)}
      >
        <ArrowLeft
          className={`${
            isSmall ? "rotate-180" : ""
          } stroke-text-secondary size-4 transition-all duration-300`}
        />
      </span>

      <span className='mx-auto block h-px w-3/5 bg-gray-400/30' />

      <ul className='mt-4 space-y-4'>
        {navlinks.map(({ href, title, icon: Icon, children }: any) => {
          const pickedStyle =
            pathname === href ? "border-l-accent border-l-4 bg-focus" : "";
          const isOpen = pathname.includes(href);

          return (
            <li key={href}>
              <Link
                href={href}
                className={`${pickedStyle} ${
                  isSmall ? "px-4 py-5" : "px-8 py-5"
                } group hover:border-l-accent hover:bg-focus flex gap-3 hover:border-l-4`}
              >
                <Icon className='fill-text-accent group-hover:stroke-accent-foreground size-6' />
                <span
                  className={`${
                    isSmall ? "hidden" : "block"
                  } text-text-secondary group-hover:text-accent-foreground`}
                >
                  {title}
                </span>
              </Link>

              {children && isOpen && (
                <ol>
                  {children.map(
                    ({
                      title,
                      href,
                      icon: SecondIcon,
                    }: {
                      title: string;
                      href: string;
                      icon: any;
                    }) => {
                      const pickedStyle = pathname.includes(href)
                        ? "border-l-accent border-l-4 bg-focus"
                        : "";

                      return (
                        <li key={href} className='group w-full'>
                          <Link
                            className={`${pickedStyle} ${
                              isSmall ? "px-4" : "px-12"
                            } group-hover:text-accent-foreground flex gap-3 py-4`}
                            href={href}
                          >
                            <SecondIcon className='group-hover:fill-accent-foreground size-6' />
                            <span className={`${isSmall ? "hidden" : "block"}`}>
                              {title}
                            </span>
                          </Link>
                        </li>
                      );
                    }
                  )}
                </ol>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export const navlinks = [
  {
    icon: Home,
    title: "Dashboard",
    href: "/dashboard",
  },
  {
    icon: RotateCcw,
    title: "Trade",
    href: "/trade",
    children: [
      {
        icon: Forward,
        title: "Bridge",
        href: "/bridge",
      },
    ],
  },
  {
    icon: Banknote,
    title: "Pools",
    href: "/pools",
    children: [
      {
        icon: Plus,
        title: "Add Liquidity",
        href: "/add-liquidity",
      },
    ],
  },
  {
    icon: Flower,
    title: "NFTs",
    href: "/nfts",
    children: [
      {
        icon: Wallet,
        title: "Inventory",
        href: "/my-nfts",
      },
      {
        icon: Scissors,
        title: "Studio",
        href: "/nft-studio",
      },
    ],
  },
  {
    icon: Calendar,
    title: "History",
    href: "/history",
  },
  {
    icon: ShoppingBag,
    title: "Shop",
    href: "/shop",
  },
] as const;
