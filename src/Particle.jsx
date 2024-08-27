import React, { useEffect } from "react";

export default function CreateChakraParticles() {
  useEffect(() => {
    const createParticle = () => {
      const particle = document.createElement("div");
      particle.className = "chakra-particle";
      particle.innerText = "🔆";
      document.body.appendChild(particle);

      const size = Math.random() * 20 + 10;
      const startPosition = Math.random() * window.innerWidth;

      particle.style.fontSize = `${size}px`;
      particle.style.left = `${startPosition}px`;
      particle.style.animationDuration = `${Math.random() * 3 + 2}s`;

      setTimeout(() => {
        particle.remove();
      }, 5000);
    };

    const intervalId = setInterval(createParticle, 300);

    return () => clearInterval(intervalId);
  }, []);

  return null;
}
