import { useEffect, useState } from "react";

function ScrollTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() =>
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        })
      }
      style={{
        position: "fixed",
        bottom: "100px",
        right: "25px",
        width: "50px",
        height: "50px",
        borderRadius: "50%",
        border: "none",
        background: "#2563eb",
        color: "#fff",
        fontSize: "22px",
        cursor: "pointer",
        boxShadow: "0 8px 20px rgba(0,0,0,.25)",
        zIndex: 9999,
      }}
    >
      ↑
    </button>
  );
}

export default ScrollTopButton;