/* eslint-disable @next/next/no-img-element */
import "../styles/landing.css";
import { Globe, Box, MoreHorizontal } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { ThemeToggle } from "@/components/theme-toggle";

export default function Home() {
  return (
    <section className='no-scrollbar bg-background relative overflow-hidden'>
      <Navbar />
      <TopIntro />
      <Safety />
      <Backer />
    </section>
  );
}

const Navbar = () => {
  const componets = ["Intro", "About", "Features", "Invester", "FAQ"];

  return (
    <div className='flex-center'>
      <header className='sticky top-0 z-50 container flex w-full items-center justify-between py-5'>
        <div className='flex items-center gap-3'>
          <Image src='/favicon.ico' alt='logo' width={32} height={32} />
          <h2 className='text-2xl font-bold'>Yushaku</h2>
        </div>

        <div className='flex items-center gap-4'>
          <ul className='flex-center gap-5'>
            {componets.map((component, index) => (
              <li
                key={index}
                className='hover:text-lighter-accent text-foreground'
              >
                <a href={`#${component}`}>{component}</a>
              </li>
            ))}

            <ThemeToggle />

            <li className='gradient_accent z-50 rounded-lg px-4 py-2'>
              <Link href={"/trade"}>Launch App</Link>
            </li>
          </ul>
        </div>
      </header>
    </div>
  );
};

const TopIntro = () => {
  return (
    <div
      id='Intro'
      className="flex-center h-screen w-full flex-col bg-[url('/grid.svg')] bg-cover text-center"
    >
      <p className='bg-layer rounded-full px-4 py-2 text-sm'>
        Take back control from CEXs
      </p>

      <h3 className='text_gradient mt-10 text-4xl font-bold'>
        Decentralized trading
      </h3>
      <h2 className='-mt-6 text-[80px] font-bold'>Powerhouse</h2>
      <p className='text-muted-foreground mt-5 text-2xl'>
        Lightning-fast orderbook DEX with powerful <br /> trading features &
        cross-margining for max efficiency.
      </p>

      <Link
        href={"/trade"}
        className='gradient_accent z-50 mt-10 rounded-lg px-4 py-2'
      >
        Start Trading
      </Link>

      <ul className='mt-24 flex gap-12'>
        <li className='hover:bg-layer rounded-xl px-4 py-5'>
          <p className='text-muted-foreground mb-3'>Total Volums</p>
          <h4 className='text-3xl font-bold'>$60 B+</h4>
        </li>

        <li className='hover:bg-layer rounded-xl px-4 py-5'>
          <p className='text-muted-foreground mb-3'>Total Markets</p>
          <h4 className='text-3xl font-bold'>30+</h4>
        </li>

        <li className='hover:bg-layer rounded-xl px-4 py-5'>
          <p className='text-muted-foreground mb-3'>Number of Traders</p>
          <h4 className='text-3xl font-bold'>20 k+</h4>
        </li>
      </ul>
    </div>
  );
};

const Backer = () => {
  const backerList = [
    "/brain-holdings.png",
    "/colab.png",
    "/hrt.png",
    "jane_street.png",
  ];

  return (
    <div id='Invester' className='flex-center flex-col py-24'>
      <p className='font-bold'>INVESTORS</p>
      <h2 className='text_gradient text-5xl font-bold'>
        {"Investors & Partners"}
      </h2>
      <p className='mt-5 text-xl'>
        Industry-leading market makers and venture capital firms.
      </p>

      <ul className='flex-center my-10 flex-wrap gap-5'>
        {backerList.map((backer, index) => (
          <li
            key={index}
            className='flex-center bg-layer hover:bg-focus z-10 h-[110px] w-[200px] rounded-lg p-5'
          >
            <img src={backer} alt='backer' />
          </li>
        ))}
      </ul>
    </div>
  );
};

const Safety = () => {
  const data = [
    {
      title: "Decentralized",
      desc: "Access an immutable money market directly on-chain. ",
      icon: Globe,
    },
    {
      title: "BEP-20/ERC-20",
      desc: "All Venus Protocol assets are bound by the BEP-20 and ERC-20 standards.",
      icon: Box,
    },
    {
      title: "Multichain",
      desc: "Built on EVM-compatible chains for fast, secure, and low cost transactions",
      icon: MoreHorizontal,
    },
  ];

  return (
    <div className='flex-center my-24 flex-col'>
      <h3 className='text_gradient text-3xl font-bold'>Safety before all</h3>
      <p className='mt-5'>
        Transact with confidence, knowing Venus places nothing before the
        security of your assets
      </p>

      <ul className='flex-center mt-20 flex-wrap gap-5'>
        {data.map(({ title, desc, icon: Icon }, index) => (
          <li
            key={index}
            className='bg-layer hover:bg-focus h-[250px] w-[300px] rounded-xl p-5'
          >
            <Icon className='mt-5 mb-10 size-10' />
            <h4 className='text-2xl font-bold'>{title}</h4>
            <p className='text-muted-foreground mt-2'>{desc}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
