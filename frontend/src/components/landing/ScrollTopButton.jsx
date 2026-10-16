import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

function ScrollTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 300);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  if (!visible) return null;

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Scroll to top"
      title="Scroll to top"
      className="group fixed bottom-24 right-5 z-[9999] flex h-12 w-12 items-center justify-center rounded-full bg-slate-950 text-white shadow-xl shadow-slate-900/20 ring-1 ring-white/10 transition-all duration-300 hover:-translate-y-1 hover:bg-blue-600 hover:shadow-blue-600/30 focus:outline-none focus:ring-4 focus:ring-blue-500/30 sm:bottom-24 sm:right-6 sm:h-13 sm:w-13"
    >
      <ArrowUp
        size={19}
        strokeWidth={2.5}
        className="transition-transform duration-300 group-hover:-translate-y-0.5"
      />
    </button>
  );
}

export default ScrollTopButton;