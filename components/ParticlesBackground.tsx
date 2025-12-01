"use client";

import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { ISourceOptions } from "@tsparticles/engine";

export function ParticlesBackground() {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const options: ISourceOptions = useMemo(
    () => ({
      fullScreen: {
        enable: true,
        zIndex: -1,
      },
      background: {
        color: {
          value: "transparent",
        },
      },
      fpsLimit: 60,
      interactivity: {
        events: {
          onClick: {
            enable: false,
          },
          onHover: {
            enable: true,
            mode: "repulse", // Odpychanie od myszki
          },
          resize: {
            enable: true,
          },
        },
        modes: {
          repulse: {
            distance: 100,
            duration: 1,
            factor: 1,
            speed: 1,
          },
        },
      },
      particles: {
        color: {
          value: "#00d4ff",
        },
        links: {
          color: "#00d4ff",
          distance: 150,
          enable: false,
          opacity: 0.2,
          width: 1,
          
        },
        move: {
          direction: "none",
          enable: true,
          outModes: {
            default: "out",
          },
          random: true,
          speed: { min: 0.1, max: 0.5 },
          straight: false,
        },
        number: {
          density: {
            enable: true,
          },
          value: 80, // Ilość cząsteczek
        },
        // Animacja zanikania (miganie)
        opacity: {
          value: { min: 0.2, max: 0.8 },
          animation: {
            enable: true,
            speed: { min: 0.3, max: 1 },
            sync: false,
            startValue: "random",
            destroy: "none",
          },
        },
        shape: {
          type: "circle",
        },
        // Animacja wielkości (pulsowanie)
        size: {
          value: { min: 1, max: 4 },
          animation: {
            enable: true,
            speed: { min: 1, max: 3 },
            sync: false,
            startValue: "random",
            destroy: "none",
          },
        },
      },
      detectRetina: true,
    }),
    []
  );

  if (!init) {
    return null;
  }

  return <Particles id="tsparticles" options={options} />;
}