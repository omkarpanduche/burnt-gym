
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const dotRef = useRef(null);
  const labelRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const dot = dotRef.current;
    const label = labelRef.current;

    if (!cursor || !dot || !label) return;

    // Centre both cursor elements around the pointer
    gsap.set([cursor, dot], {
      xPercent: -50,
      yPercent: -50,
    });

    const moveX = gsap.quickTo(cursor, "x", {
      duration: 0.35,
      ease: "power3.out",
    });

    const moveY = gsap.quickTo(cursor, "y", {
      duration: 0.35,
      ease: "power3.out",
    });

    const dotX = gsap.quickTo(dot, "x", {
      duration: 0.15,
      ease: "power2.out",
    });

    const dotY = gsap.quickTo(dot, "y", {
      duration: 0.15,
      ease: "power2.out",
    });

    const onMove = (e) => {
      moveX(e.clientX);
      moveY(e.clientY);

      dotX(e.clientX);
      dotY(e.clientY);
    };

    const onHover = (e) => {
      const target = e.target.closest(
        "a, button, [role='button'], input, select, textarea, .program-row, .training-card"
      );

      if (target) {
        cursor.classList.add("cursor-active");

        label.textContent = target.matches("a, .program-row")
          ? "VIEW"
          : "EXPLORE";
      } else {
        cursor.classList.remove("cursor-active");
      }
    };

    const onLeave = () => {
      cursor.classList.remove("cursor-active");
    };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onHover);
    document.addEventListener("mouseout", onLeave);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onHover);
      document.removeEventListener("mouseout", onLeave);
    };
  }, []);

  return (
    <>
      <div ref={cursorRef} className="burnt-cursor">
        <span ref={labelRef} className="burnt-cursor-label">
          VIEW
        </span>
      </div>

      <div ref={dotRef} className="burnt-cursor-dot" />
    </>
  );
}
