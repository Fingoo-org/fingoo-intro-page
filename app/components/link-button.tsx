"use client";
import { Button } from "@/app/components/button";
import React from "react";

type LinkButtonProps = {
  href: string;
};

export default function LinkButton({
  href,
  children,
}: React.PropsWithChildren<LinkButtonProps>) {
  return (
    <Button
      onClick={() => {
        location.href = `${href}`;
      }}
      className="bg-white text-[#00B4AA]"
      variant="secondary"
    >
      {children}
    </Button>
  );
}
