import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/animations/gsapConfig";
import { setupGsap } from "@/animations/gsapConfig";

export default function InfographicCounter({
  to,
  label,
  suffix = "",
  duration = 1.2,
}: {
  to: number;
  label: string;
  suffix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const numRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!ref.current || !numRef.current) return;
    setupGsap();

    const obj = { val: 0 };
    const trigger = ScrollTrigger.create({
      trigger: ref.current!,
      start: "top 85%",
      once: true,
      onEnter: () => {
        gsap.to(obj, {
          val: to,
          duration,
          ease: "power2.out",
          onUpdate: () => {
            if (numRef.current) {
              numRef.current.textContent = Math.round(obj.val).toLocaleString();
            }
          },
        });
      },
    });

    return () => {
      trigger.kill();
    };
  }, [to, duration]);

  return (
    <div
      ref={ref}
      className="p-6 rounded-2xl bg-slate-900/50 border border-slate-700/70 shadow-md backdrop-blur-md hover:shadow-xl hover:shadow-blue-500/10 transition-all"
    >
      <div className="text-4xl md:text-5xl font-extrabold tracking-tight text-white">
        <span ref={numRef}>0</span>
        {suffix && <span className="text-blue-400 ml-1">{suffix}</span>}
      </div>
      <p className="mt-2 text-sm text-gray-300/90">{label}</p>
    </div>
  );
}
