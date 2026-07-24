"use client";

import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    setEnabled(fine);
    if (!fine) return;

    document.body.classList.add("has-custom-cursor");

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let gx = mx;
    let gy = my;

    function onMove(e: MouseEvent) {
      mx = e.clientX;
      my = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mx}px, ${my}px, 0) translate(-50%, -50%)`;
      }
      const target = e.target as HTMLElement;
      setHovering(!!target.closest("a, button, [data-cursor='magnetic']"));
    }

    let raf: number;
    function tick() {
      gx += (mx - gx) * 0.12;
      gy += (my - gy) * 0.12;
      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(${gx}px, ${gy}px, 0) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);

    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
      document.body.classList.remove("has-custom-cursor");
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={glowRef}
        className="pointer-events-none fixed left-0 top-0 z-[9998] rounded-full transition-[width,height,opacity] duration-300 ease-out"
        style={{
          width: hovering ? 90 : 56,
          height: hovering ? 90 : 56,
          background:
            "radial-gradient(circle, rgba(199,164,106,0.35) 0%, rgba(199,164,106,0.08) 55%, transparent 75%)",
          filter: "blur(2px)",
        }}
      />
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] rounded-full bg-primary transition-[width,height] duration-300 ease-out"
        style={{ width: hovering ? 10 : 6, height: hovering ? 10 : 6 }}
      />
    </>
  );
}
