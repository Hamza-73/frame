"use client";

import { useCallback, useSyncExternalStore } from "react";

/**
 * Media queries are an external store, so they are read through
 * `useSyncExternalStore` rather than mirrored into state from an effect. That
 * keeps the server snapshot (`false`) and the first client render identical —
 * no hydration mismatch — and there is no cascading render on mount.
 */
export function useMediaQuery(query) {
  const subscribe = useCallback(
    (onStoreChange) => {
      const list = window.matchMedia(query);
      list.addEventListener("change", onStoreChange);
      return () => list.removeEventListener("change", onStoreChange);
    },
    [query],
  );

  const getSnapshot = useCallback(() => window.matchMedia(query).matches, [query]);
  const getServerSnapshot = useCallback(() => false, []);

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

/** True when the device reports a real pointer (disables cursor effects). */
export function useHasPointer() {
  return useMediaQuery("(hover: hover) and (pointer: fine)");
}
