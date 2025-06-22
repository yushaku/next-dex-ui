"use client";

import { Footer } from "./Footer";
import { Sidebar } from "./sidebar";
import { usePathname } from "next/navigation";
import { Header } from "./Header";

interface LayoutWithSidebarProps {
  children: React.ReactNode;
}

export function LayoutWithSidebar({ children }: LayoutWithSidebarProps) {
  const pathname = usePathname();
  if (pathname === "/")
    return (
      <main>
        {children}
        <Footer />
      </main>
    );

  return (
    <div className='bg-background flex h-screen'>
      <Sidebar />
      <section className='no-scrollbar container mx-auto overflow-y-scroll'>
        <Header />
        <div className='min-h-svh'>{children}</div>
        <Footer />
      </section>
    </div>
  );
}
