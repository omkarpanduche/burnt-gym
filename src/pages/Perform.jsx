
import { useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Perform() {
  const pageRef = useRef(null);

  useGSAP(
    () => {
      // =====================================
      // HERO INTRO
      // =====================================

      const intro = gsap.timeline({
        defaults: { ease: "power3.out" },
      });

      intro
        .from(".build-nav", {
          y: -25,
          opacity: 0,
          duration: 1,
        })
        .from(
          ".build-eyebrow",
          {
            y: 25,
            opacity: 0,
            duration: 1.1,
          },
          "-=0.5"
        )
        .fromTo(
          ".build-title",
          {
            x: -100,
            opacity: 0,
            filter: "blur(12px)",
          },
          {
            x: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 3,
            ease: "power2.out",
          },
          "-=0.2"
        )
        .from(
          ".build-intro",
          {
            y: 35,
            opacity: 0,
            duration: 1.5,
          },
          "-=1"
        )
        .from(
          ".build-hero-bottom",
          {
            y: 25,
            opacity: 0,
            duration: 1.2,
          },
          "-=0.7"
        );

      // =====================================
      // HERO IMAGE
      // =====================================

      gsap.fromTo(
        ".build-image",
        { scale: 1.15 },
        {
          scale: 1,
          duration: 2.5,
          ease: "power2.out",
        }
      );

      gsap.to(".build-image", {
        scale: 1.12,
        ease: "none",
        scrollTrigger: {
          trigger: ".build-hero",
          start: "top top",
          end: "bottom top",
          scrub: 2,
        },
      });

      // =====================================
      // PERFORMANCE KINETIC VISUAL
      // =====================================

      gsap.to(".perform-ring-outer", {
        rotation: 360,
        duration: 28,
        repeat: -1,
        ease: "none",
      });

      gsap.to(".perform-ring-inner", {
        rotation: -360,
        duration: 18,
        repeat: -1,
        ease: "none",
      });

      gsap.to(".perform-ring-orbit", {
        rotation: 360,
        duration: 12,
        repeat: -1,
        ease: "none",
      });

      // Central circle pulse
      const pulseCore = pageRef.current.querySelector(
        ".perform-pulse-core"
      );

      if (pulseCore) {
        const corePulse = gsap.to(pulseCore, {
          scale: 1.2,
          opacity: 0.5,
          duration: 2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });

        let hoverAnimation;

        const handleEnter = () => {
          corePulse.pause();

          if (hoverAnimation) {
            hoverAnimation.kill();
          }

          hoverAnimation = gsap.to(pulseCore, {
            scale: 1,
            opacity: 1,
            duration: 0.4,
            ease: "power2.out",
            overwrite: true,
          });

          pulseCore.classList.add("is-hovered");
        };

        const handleLeave = () => {
          pulseCore.classList.remove("is-hovered");

          if (hoverAnimation) {
            hoverAnimation.kill();
          }

          hoverAnimation = gsap.to(pulseCore, {
            scale: 1,
            opacity: 1,
            duration: 0.35,
            ease: "power2.out",
            overwrite: true,
            onComplete: () => corePulse.resume(),
          });
        };

        pulseCore.addEventListener("mouseenter", handleEnter);
        pulseCore.addEventListener("mouseleave", handleLeave);

        // =====================================
        // DETAIL SECTIONS
        // =====================================

        const details = gsap.utils.toArray(".build-detail");

        details.forEach((section) => {
          const heading = section.querySelector(
            ".build-detail-heading"
          );

          if (heading) {
            gsap.fromTo(
              heading,
              {
                x: -150,
                opacity: 0,
                filter: "blur(8px)",
              },
              {
                x: 0,
                opacity: 1,
                filter: "blur(0px)",
                ease: "none",
                scrollTrigger: {
                  trigger: heading,
                  start: "top 90%",
                  end: "top 35%",
                  scrub: 3,
                },
              }
            );
          }

          const content = section.querySelectorAll(
            ".build-detail-number, .build-detail-text, .build-focus-list li"
          );

          gsap.from(content, {
            y: 55,
            opacity: 0,
            stagger: 0.15,
            duration: 1.3,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 78%",
              toggleActions: "play none none reverse",
            },
          });
        });

        // =====================================
        // CTA ANIMATIONS
        // =====================================

        gsap.from(".build-cta-label", {
          y: 25,
          opacity: 0,
          duration: 1.2,
          scrollTrigger: {
            trigger: ".build-cta",
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        });

        gsap.from(".build-cta-content h2", {
          x: -120,
          opacity: 0,
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".build-cta",
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        });

        gsap.from(".build-cta-button", {
          y: 35,
          opacity: 0,
          duration: 1.2,
          delay: 0.2,
          scrollTrigger: {
            trigger: ".build-cta",
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        });

        // Visual entrance
        gsap.from(".perform-motion-visual", {
          scale: 0.7,
          opacity: 0,
          duration: 2,
          delay: 0.5,
          ease: "power3.out",
        });

        // Visual movement while scrolling
        gsap.to(".perform-motion-visual", {
          y: -45,
          ease: "none",
          scrollTrigger: {
            trigger: ".build-hero",
            start: "top top",
            end: "bottom top",
            scrub: 2,
          },
        });

        // Cleanup hover listeners and animation
        return () => {
          pulseCore.removeEventListener("mouseenter", handleEnter);
          pulseCore.removeEventListener("mouseleave", handleLeave);
          corePulse.kill();

          if (hoverAnimation) {
            hoverAnimation.kill();
          }
        };
      }

      // =====================================
      // DETAIL SECTIONS
      // =====================================

      const details = gsap.utils.toArray(".build-detail");

      details.forEach((section) => {
        const heading = section.querySelector(
          ".build-detail-heading"
        );

        if (heading) {
          gsap.fromTo(
            heading,
            {
              x: -150,
              opacity: 0,
              filter: "blur(8px)",
            },
            {
              x: 0,
              opacity: 1,
              filter: "blur(0px)",
              ease: "none",
              scrollTrigger: {
                trigger: heading,
                start: "top 90%",
                end: "top 35%",
                scrub: 3,
              },
            }
          );
        }

        const content = section.querySelectorAll(
          ".build-detail-number, .build-detail-text, .build-focus-list li"
        );

        gsap.from(content, {
          y: 55,
          opacity: 0,
          stagger: 0.15,
          duration: 1.3,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 78%",
            toggleActions: "play none none reverse",
          },
        });
      });

      // =====================================
      // CTA ANIMATIONS
      // =====================================

      gsap.from(".build-cta-label", {
        y: 25,
        opacity: 0,
        duration: 1.2,
        scrollTrigger: {
          trigger: ".build-cta",
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from(".build-cta-content h2", {
        x: -120,
        opacity: 0,
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".build-cta",
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from(".build-cta-button", {
        y: 35,
        opacity: 0,
        duration: 1.2,
        delay: 0.2,
        scrollTrigger: {
          trigger: ".build-cta",
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });

      // =====================================
      // VISUAL ENTRANCE AND SCROLL
      // =====================================

      gsap.from(".perform-motion-visual", {
        scale: 0.7,
        opacity: 0,
        duration: 2,
        delay: 0.5,
        ease: "power3.out",
      });

      gsap.to(".perform-motion-visual", {
        y: -45,
        ease: "none",
        scrollTrigger: {
          trigger: ".build-hero",
          start: "top top",
          end: "bottom top",
          scrub: 2,
        },
      });
    },
    { scope: pageRef }
  );

  return (
    <main className="build-page perform-page" ref={pageRef}>
      {/* HERO */}

      <section className="build-hero">
        <img
          className="build-image"
          src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=2200&q=90"
          alt="Athletic performance training"
        />

        <div className="build-overlay" />

        <nav className="build-nav">
          <Link to="/" className="build-logo">
            BURNT<span>.</span>
          </Link>

          <Link to="/#programs" className="build-back">
            ← BACK TO PROGRAMS
          </Link>
        </nav>

        <div className="build-hero-content">
          <p className="build-eyebrow">
            03 / THE PERFORMANCE PROGRAM
          </p>

          <h1 className="build-title">
            PERFORM<span>.</span>
          </h1>

          <p className="build-intro">
            Train with intention. Develop better movement,
            coordination and control. Turn preparation into performance.
          </p>
        </div>

        {/* PERFORMANCE KINETIC VISUAL */}

        <div className="perform-motion-visual">
          <div className="perform-speed-line perform-speed-line-one" />
          <div className="perform-speed-line perform-speed-line-two" />
          <div className="perform-speed-line perform-speed-line-three" />

          <div className="perform-ring perform-ring-outer">
            <span className="perform-orbit-dot" />
          </div>

          <div className="perform-ring perform-ring-inner">
            <span className="perform-orbit-dot perform-orbit-dot-inner" />
          </div>

          <div className="perform-ring-orbit">
            <span className="perform-orbit-marker" />
          </div>

          <div className="perform-pulse-core">
            <span>03</span>
            <small>PERFORMANCE</small>
          </div>

          <div className="perform-visual-caption">
            PRECISION / CONTROL / POWER
          </div>
        </div>

        <div className="build-hero-bottom">
          <span>MOVEMENT. CONTROL. PERFORMANCE.</span>
          <span>03 — 03</span>
        </div>
      </section>

      {/* SECTION 01 - THE APPROACH */}

      <section className="build-detail build-approach">
        <div className="build-detail-number">
          01 / THE APPROACH
        </div>

        <div className="build-detail-content">
          <h2 className="build-detail-heading">
            MOVE <span>BETTER.</span>
          </h2>

          <p className="build-detail-text">
            A performance-focused training experience built around
            movement quality, coordination and functional fitness.
          </p>
        </div>
      </section>

      {/* SECTION 02 - WHAT YOU FOCUS ON */}

      <section className="build-detail build-focus">
        <div className="build-detail-number">
          02 / WHAT YOU FOCUS ON
        </div>

        <div className="build-detail-content">
          <h2 className="build-detail-heading">
            TRAIN TO <span>PERFORM.</span>
          </h2>

          <ul className="build-focus-list">
            <li>
              <span>01</span>
              Movement and coordination
            </li>

            <li>
              <span>02</span>
              Functional strength
            </li>

            <li>
              <span>03</span>
              Balance and stability
            </li>

            <li>
              <span>04</span>
              Athletic movement patterns
            </li>
          </ul>
        </div>
      </section>

      {/* FINAL CTA */}

      <section className="build-cta">
        <div className="build-cta-content">
          <p className="build-cta-label">
            PREPARATION MEETS PERFORMANCE.
          </p>

          <h2>
            READY TO PERFORM<span>?</span>
          </h2>

          <Link
            to="/#membership"
            className="build-cta-button"
          >
            EXPLORE MEMBERSHIP <span>↗</span>
          </Link>
        </div>
      </section>
    </main>
  );
}
