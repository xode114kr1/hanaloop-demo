"use client";

import { RefObject, useEffect } from "react";

type UseOutsideClickOptions<T extends HTMLElement> = {
  ref: RefObject<T | null>;
  onOutsideClick: () => void;
  enabled?: boolean;
};

export function useOutsideClick<T extends HTMLElement>({
  ref,
  onOutsideClick,
  enabled = true,
}: UseOutsideClickOptions<T>) {
  useEffect(() => {
    if (!enabled) return;

    function handlePointerDown(event: PointerEvent) {
      const element = ref.current;
      const target = event.target;

      if (!element || !(target instanceof Node)) return;
      if (element.contains(target)) return;

      onOutsideClick();
    }

    document.addEventListener("pointerdown", handlePointerDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [enabled, onOutsideClick, ref]);
}
