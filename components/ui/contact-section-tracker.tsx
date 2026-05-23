"use client";

import { useEffect } from "react";

import { trackConversion } from "@/components/ui/analytics";

export function ContactSectionTracker() {
  useEffect(() => {
    const contactSection = document.getElementById("contact");
    if (!contactSection) return;

    let hasTracked = false;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting || hasTracked) return;

        hasTracked = true;
        trackConversion("contact_section_view");
        observer.disconnect();
      },
      { threshold: 0.4 },
    );

    observer.observe(contactSection);

    return () => observer.disconnect();
  }, []);

  return null;
}
