import { useEffect, useState } from "react";

/** Scroll-spy: returns the id of the section currently in view. */
export function useActiveSection(ids: string[]) {
  const [active, setActive] = useState<string | null>(null);
  const key = ids.join("|");

  useEffect(() => {
    if (!ids.length) {
      setActive(null);
      return;
    }
    const els = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el);
    if (!els.length) return;

    const visible = new Map<string, number>();
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) visible.set(e.target.id, e.boundingClientRect.top);
          else visible.delete(e.target.id);
        });
        if (visible.size) {
          const first = ids.find((id) => visible.has(id));
          if (first) setActive(first);
        }
      },
      { rootMargin: "-90px 0px -55% 0px", threshold: 0 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return active;
}
