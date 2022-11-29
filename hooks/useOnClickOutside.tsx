import React, { useEffect } from "react";

interface Props {
  ref: React.RefObject<HTMLElement> | null;
  handler: (event: Event) => void;
}

const useOnClickOutside = ({ ref, handler }: Props) => {
  useEffect(() => {
    const listener = (event: Event) => {
      setTimeout(() => {
        const el = ref?.current;
        if (!el || el.contains((event?.target as HTMLElement) || null)) {
          return;
        }

        handler(event); // Call the handler only if the click is outside of the element passed.
      }, 100);
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]); // Reload only if ref or handler changes
};

export default useOnClickOutside;
