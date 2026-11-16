
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Experience() {
  const sectionRef = useRef(null);

  useGSAP(
    () => {
      const section = sectionRef.current;

      if (!section) return;

      // =====================================
      // MAIN EXPERIENCE SCROLL ANIMATION
      // =====================================

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=1800",
          scrub: 1,
          pin: true,
        },
      });

      timeline
        .from(".experience-label", {
          y: 40,
          opacity: 0,
        })
        .from(
          ".experience-line",
          {
            yPercent: 110,
            opacity: 0,
            stagger: 0.2,
          },
          "<"
        )
        .from(
          ".experience-description",
          {
            y: 30,
            opacity: 0,
          },
          "-=0.2"
        )
        .to(".experience-heading", {
          scale: 1.12,
          duration: 1,
        })
        .to(
          ".experience",
          {
            backgroundColor: "#1b0808",
            duration: 1,
          },
          "<"
        );

      // =====================================
      // ATMOSPHERE REVEAL
      // =====================================

      gsap.fromTo(
        ".experience-atmosphere",
        { opacity: 0 },
        {
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "+=1400",
            scrub: 4,
          },
        }
      );

      // =====================================
      // THREE INDEPENDENT ROTATING SHELLS
      // =====================================

      const orbitSettings = [
        {
          shell: ".experience-shell-10",
          plate: ".experience-plate-body-10",
          angle: 0,
          duration: 36,
        },
        {
          shell: ".experience-shell-15",
          plate: ".experience-plate-body-15",
          angle: 120,
          duration: 27,
        },
        {
          shell: ".experience-shell-20",
          plate: ".experience-plate-body-20",
          angle: 240,
          duration: 19,
        },
      ];

      orbitSettings.forEach((item) => {
        const shell = section.querySelector(item.shell);
        const plate = section.querySelector(item.plate);

        if (!shell || !plate) {
          console.error(
            "BURNT orbit element not found:",
            item.shell,
            item.plate
          );
          return;
        }

        // Set different starting positions
        gsap.set(shell, {
          rotation: item.angle,
          transformOrigin: "50% 50%",
        });

        // Keep the plate upright
        gsap.set(plate, {
          rotation: -item.angle,
          transformOrigin: "50% 50%",
        });

        // Rotate the shell continuously
        gsap.to(shell, {
          rotation: item.angle + 360,
          duration: item.duration,
          repeat: -1,
          ease: "none",
        });

        // Counter-rotate the plate
        gsap.to(plate, {
          rotation: -item.angle - 360,
          duration: item.duration,
          repeat: -1,
          ease: "none",
        });
      });
    },
    { scope: sectionRef }
  );

  return (
    <section className="experience" ref={sectionRef}>
      <div className="experience-atmosphere">

        <div className="experience-glow" />

        {/* =================================
            ORBIT SYSTEM
        ================================= */}

        <div className="experience-orbit-container">
          <div className="experience-orbit-system">

            {/* GREEN 10 KG - OUTER ORBIT */}

            <div className="experience-shell experience-shell-10">

              <div className="experience-plate-position">
                <div className="experience-plate-body experience-plate-body-10">

                  <div className="experience-plate-face plate-green">
                    <div className="plate-bevel" />
                    <div className="plate-inner-rim" />

                    <div className="plate-grip plate-grip-top" />
                    <div className="plate-grip plate-grip-left" />
                    <div className="plate-grip plate-grip-right" />

                    <div className="plate-centre-hole" />

                    <div className="plate-weight-label">
                      <strong>10</strong>
                      <small>KG</small>
                    </div>
                  </div>

                </div>
              </div>

            </div>

            {/* ORANGE 15 KG - MIDDLE ORBIT */}

            <div className="experience-shell experience-shell-15">

              <div className="experience-plate-position">
                <div className="experience-plate-body experience-plate-body-15">

                  <div className="experience-plate-face plate-orange">
                    <div className="plate-bevel" />
                    <div className="plate-inner-rim" />

                    <div className="plate-grip plate-grip-top" />
                    <div className="plate-grip plate-grip-left" />
                    <div className="plate-grip plate-grip-right" />

                    <div className="plate-centre-hole" />

                    <div className="plate-weight-label">
                      <strong>15</strong>
                      <small>KG</small>
                    </div>
                  </div>

                </div>
              </div>

            </div>

            {/* BLUE 20 KG - INNER ORBIT */}

            <div className="experience-shell experience-shell-20">

              <div className="experience-plate-position">
                <div className="experience-plate-body experience-plate-body-20">

                  <div className="experience-plate-face plate-blue">
                    <div className="plate-bevel" />
                    <div className="plate-inner-rim" />

                    <div className="plate-grip plate-grip-top" />
                    <div className="plate-grip plate-grip-left" />
                    <div className="plate-grip plate-grip-right" />

                    <div className="plate-centre-hole" />

                    <div className="plate-weight-label">
                      <strong>20</strong>
                      <small>KG</small>
                    </div>
                  </div>

                </div>
              </div>

            </div>

            {/* FIXED CENTRE LOGO */}

            <div className="experience-orbit-centre">

              <div className="experience-centre-ring" />

              <div className="experience-centre-logo">
                BURNT<span>.</span>
              </div>

              <small>STRENGTH / DISCIPLINE</small>

            </div>

          </div>
        </div>
      </div>

      {/* =================================
          MAIN EXPERIENCE CONTENT
      ================================= */}

      <div className="experience-content">

        <p className="experience-label">
          THE BURNT PHILOSOPHY / 001
        </p>

        <h2 className="experience-heading">
          <span className="experience-line">
            COMFORT NEVER
          </span>

          <span className="experience-line">
            BUILT <span className="red-text">STRENGTH.</span>
          </span>
        </h2>

        <p className="experience-description">
          Every rep has a purpose. Every challenge builds character.
          This is where discipline becomes a lifestyle.
        </p>

        <div className="experience-index">
          <span>DISCIPLINE IS THE DIFFERENCE</span>
          <span>02 — 09</span>
        </div>

      </div>
    </section>
  );
}
