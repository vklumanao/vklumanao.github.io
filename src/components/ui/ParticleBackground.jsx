import { useMemo } from "react";
import { useReducedMotion } from "framer-motion";
import Particles from "@tsparticles/react";

function ParticleBackground({ theme = "dark" }) {
  const prefersReducedMotion = useReducedMotion();
  const isDark = theme === "dark";

  const options = useMemo(
    () => ({
      fullScreen: { enable: false },
      fpsLimit: 60,
      particles: {
        number: {
          value: prefersReducedMotion ? 30 : 80,
          density: { enable: true, area: 800 },
        },
        color: { value: isDark ? "#ffffff" : "#334155" },
        shape: { type: "circle" },
        opacity: { value: isDark ? 0.45 : 0.28 },
        size: { value: { min: 1, max: 5 } },
        links: {
          enable: true,
          distance: 150,
          color: isDark ? "#ffffff" : "#334155",
          opacity: isDark ? 0.28 : 0.2,
          width: 1,
        },
        move: {
          enable: !prefersReducedMotion,
          speed: isDark ? 2.6 : 2.2,
        },
      },
      interactivity: {
        events: {
          onHover: { enable: !prefersReducedMotion, mode: "repulse" },
          onClick: { enable: !prefersReducedMotion, mode: "push" },
        },
        modes: {
          repulse: { distance: 90, duration: 0.35 },
          push: { quantity: 2 },
        },
      },
      detectRetina: true,
      background: { color: { value: "transparent" } },
      responsive: [
        {
          maxWidth: 768,
          options: {
            particles: {
              number: {
                value: prefersReducedMotion ? 18 : 36,
                density: { enable: true, area: 900 },
              },
              size: { value: { min: 1, max: 3.5 } },
              links: {
                distance: 120,
                opacity: isDark ? 0.22 : 0.16,
              },
              move: {
                enable: !prefersReducedMotion,
                speed: isDark ? 1.7 : 1.4,
              },
            },
            interactivity: {
              modes: {
                repulse: { distance: 70, duration: 0.28 },
                push: { quantity: 1 },
              },
            },
          },
        },
      ],
    }),
    [isDark, prefersReducedMotion],
  );

  return (
    <div className="fixed inset-0 -z-10">
      <Particles
        id="animated-background"
        options={options}
        className="h-full w-full"
      />
    </div>
  );
}

export default ParticleBackground;
