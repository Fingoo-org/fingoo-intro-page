"use client";
import { Button, buttonVariants } from "@/app/components/button";
import { VariantProps } from "class-variance-authority";
import React from "react";
import { cn } from "@/lib/utils";

type LinkButtonProps = {
  href: string;
  variant?: VariantProps<typeof buttonVariants>["variant"];
  className?: string;
};

export default function LinkButton({
  href,
  children,
  variant = "secondary",
  className,
}: React.PropsWithChildren<LinkButtonProps>) {
  return (
    <Button
      onClick={() => {
        location.href = `${href}`;
      }}
      className={cn(className)}
      variant={variant}
    >
      {children}
    </Button>
  );
}
