import { useEffect } from "react";

export const useClickOutSide = (ref, onClickOutside, enabled = true) => {
  useEffect(() => {
    if (!enabled) return;

    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        onClickOutside();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, onClickOutside, enabled]);
};
