import Image from 'next/image';
import { GradientCard } from '@/components/cuicui/cards';
import { Typewriter } from '@/components/cuicui/texts';
import { WalletButton } from '@/components/WalletButton';

export const HelloGuy = () => {
  return (
    <section className='mt-5 flex gap-5'>
      <GradientCard
        className='border-focus flex flex-1 items-center justify-center'
        title='Hello, my Friend'
        description='To try out, mint your first NFT and do what ever shit you want if you can'
      >
        <div className='flex w-full flex-col items-center gap-4'>
          <Image
            src='/logo.png'
            className='size-20 rounded-full'
            width={80}
            height={80}
            alt='Vite logo'
          />
          <h3 className='text-lighter-accent text-3xl'>
            Welcome to{' '}
            <Typewriter
              text={['Yu NFTs Market', 'Yu Exchange', 'Yu Bridge']}
              loop={true}
              showCursor={true}
              hideCursorOnType={false}
              cursorChar='|'
              cursorClassName='ml-1'
              cursorAnimationVariants={{
                initial: { opacity: 0 },
                animate: {
                  opacity: 1,
                  transition: {
                    duration: 0.01,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatDelay: 0.4,
                    repeatType: 'reverse',
                  },
                },
              }}
            />
          </h3>
        </div>
      </GradientCard>

      <GradientCard
        title='Click on the button to connect to your Wallet'
        description='To try out, mint your first NFT and do what ever shit you want if you can'
        className='border-focus flex flex-1 items-center justify-center'
      >
        <WalletButton />
      </GradientCard>
    </section>
  );
};
