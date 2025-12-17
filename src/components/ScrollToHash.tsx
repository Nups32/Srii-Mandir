import { useEffect } from "react";

export default function ScrollToHash() {
  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) return;

    const id = hash.substring(1);

    const tryScroll = () => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        // Retry after slight delay in case element isn't mounted yet
        setTimeout(tryScroll, 100);
      }
    };

    tryScroll();
  }, []);

  return null;
}
