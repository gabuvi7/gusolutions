"use client";

import { track } from "@vercel/analytics/react";

type AnalyticsProperties = Record<string, string | number | boolean | null | undefined>;

export function trackConversion(eventName: string, properties?: AnalyticsProperties) {
  track(eventName, properties);
}
