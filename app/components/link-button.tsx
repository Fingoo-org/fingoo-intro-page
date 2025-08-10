"use client";

import React from "react";
import { cn } from "@/lib/utils";

type LinkButtonProps = {
  href: string;
  className?: string;
  target?: "_blank" | "_self";
  rel?: string;
};

export default function LinkButton({
  href,
  children,
  className,
  target = "_self",
  rel,
}: React.PropsWithChildren<LinkButtonProps>) {
  const handleClick = () => {
    if (target === "_blank") {
      window.open(href, "_blank", rel ? `noopener,noreferrer,${rel}` : "noopener,noreferrer");
    } else {
      location.href = href;
    }
  };

  return (
    <button
      onClick={handleClick}
      className={cn(
        "relative font-bold text-lg lg:text-xl text-[#333]/50 transition-all",
        "hover:text-[#333]",
        "hover:after:content-[''] hover:after:bg-fingoo-main",
        "after:absolute after:left-0 after:right-0 after:bottom-[10px] after:h-2 after:z-0",
        className
      )}
    >
      <span className="relative z-10">{children}</span>
    </button>
  );
}
