"use client";

import type { AnchorHTMLAttributes } from "react";

import { trackConversion } from "@/components/ui/analytics";

type TrackedLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  eventName: string;
  eventProperties?: Record<string, string | number | boolean | null | undefined>;
};

export function TrackedLink({ eventName, eventProperties, onClick, ...props }: TrackedLinkProps) {
  return (
    <a
      {...props}
      onClick={(event) => {
        trackConversion(eventName, eventProperties);
        onClick?.(event);
      }}
    />
  );
}
