import { ArrowRightIcon, BellIcon } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { useNotificationsState } from '@/stores';

export const NotificationDropdown = () => {
  const { itemList, remove, clearAll } = useNotificationsState();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className='bg-layer hover:bg-focus relative flex gap-1 rounded-xl border border-gray-700 px-6 py-3 text-sm font-semibold outline-none'>
        <BellIcon className='size-5' />
        {itemList.length > 0 ? (
          <span className='text-text-secondary'>{itemList.length}</span>
        ) : null}
      </DropdownMenuTrigger>

      <DropdownMenuContent className='bg-layer w-80 rounded-md py-1 shadow-lg ring-1 ring-gray-700'>
        <div className='my-2 flex items-center justify-between px-4'>
          <h3 className='text-lg font-bold'>Notifications</h3>

          <button onClick={clearAll} className='text-sm hover:text-red-400'>
            Clear all
          </button>
        </div>

        {itemList.reverse().map(({ txHash, title, description, link }) => (
          <DropdownMenuItem
            key={txHash}
            className={cn(
              'group hover:bg-focus cursor-default rounded-sm px-4 py-2 text-sm'
            )}
          >
            <div>
              <strong className='text-text-secondary flex items-center justify-between text-sm'>
                <span>{title}</span>
                <button
                  onClick={() => remove(txHash)}
                  className='hidden font-normal group-hover:block hover:text-red-400'
                >
                  remove
                </button>
              </strong>
              <p className='text-text-secondary'>{description}</p>
              <a
                href={link}
                target='_blank'
                rel='noreferrer'
                className='flex items-center gap-2 text-blue-500'
              >
                View more <ArrowRightIcon className='size-4' />
              </a>
            </div>
          </DropdownMenuItem>
        ))}

        <div
          className={cn(
            'text-text-secondary px-4 py-2 text-sm',
            itemList.length > 0 && 'hidden'
          )}
        >
          <p>Notification is empty</p>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
