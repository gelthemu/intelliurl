import { useEffect } from "react";

interface ShortcutHandlers {
  onFocusInput?: () => void;
  onCloseSidebar?: () => void;
}

export function useShortcuts({
  onFocusInput,
  onCloseSidebar,
}: ShortcutHandlers) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        onFocusInput?.();
      }
      if (e.key === "Escape") {
        onCloseSidebar?.();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onFocusInput, onCloseSidebar]);
}
