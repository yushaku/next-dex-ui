"use client";

import { MotionProps, motion, useScroll } from "motion/react";
import React from "react";
import { cn } from "@/utils/index";

interface ScrollProgressProps
  extends Omit<React.HTMLAttributes<HTMLElement>, keyof MotionProps> {}

export const ScrollProgress = React.forwardRef<
  HTMLDivElement,
  ScrollProgressProps
>(({ className, ...props }, ref) => {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      ref={ref}
      className={cn(
        "to-primary fixed inset-x-1 top-0 z-50 h-px origin-left bg-gradient-to-r from-[#A97CF8] via-[#F38CB8]",
        className
      )}
      style={{
        scaleX: scrollYProgress,
      }}
      {...props}
    />
  );
});

ScrollProgress.displayName = "ScrollProgress";
