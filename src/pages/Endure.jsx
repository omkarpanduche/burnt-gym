
import { useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Endure() {
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
      // ENDURANCE PULSE VISUAL
      // =====================================

      // Outer ring rotation
      gsap.to(".endure-pulse-ring-outer", {
        rotation: 360,
        duration: 30,
        repeat: -1,
        ease: "none",
      });

      // Inner ring rotation
      gsap.to(".endure-pulse-ring-inner", {
        rotation: -360,
        duration: 20,
        repeat: -1,
        ease: "none",
      });

      // Central circle pulse
      const pulseCore = pageRef.current.querySelector(
        ".endure-pulse-core"
      );

      if (pulseCore) {
        const corePulse = gsap.to(pulseCore, {
          scale: 1.25,
          opacity: 0.45,
          duration: 2.2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });

        let hoverAnimation;

        const handleEnter = () => {
          // Stop the normal pulse
          corePulse.pause();

          // Remove any previous hover transition
          if (hoverAnimation) {
            hoverAnimation.kill();
          }

          // Make the circle completely stable
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

          // Smoothly return to normal animation
          if (hoverAnimation) {
            hoverAnimation.kill();
          }

          hoverAnimation = gsap.to(pulseCore, {
            scale: 1,
            opacity: 1,
            duration: 0.35,
            ease: "power2.out",
            overwrite: true,
            onComplete: () => {
              corePulse.resume();
            },
          });
        };

        pulseCore.addEventListener("mouseenter", handleEnter);
        pulseCore.addEventListener("mouseleave", handleLeave);

        // Cleanup
        return () => {
          pulseCore.removeEventListener("mouseenter", handleEnter);
          pulseCore.removeEventListener("mouseleave", handleLeave);
          corePulse.kill();

          if (hoverAnimation) {
            hoverAnimation.kill();
          }
        };
      }

      // Pulse line
      gsap.to(".endure-pulse-line", {
        scaleX: 1,
        opacity: 1,
        duration: 1.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Visual entrance
      gsap.from(".endure-pulse-visual", {
        scale: 0.7,
        opacity: 0,
        duration: 2,
        delay: 0.5,
        ease: "power3.out",
      });

      // Visual movement while scrolling
      gsap.to(".endure-pulse-visual", {
        y: -45,
        ease: "none",
        scrollTrigger: {
          trigger: ".build-hero",
          start: "top top",
          end: "bottom top",
          scrub: 2,
        },
      });

      // =====================================
      // DETAIL SECTIONS - SAME AS BUILD
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
    },
    { scope: pageRef }
  );

  return (
    <main className="build-page endure-page" ref={pageRef}>
      {/* HERO */}

      <section className="build-hero">
        <img
          className="build-image"
          src="https://images.unsplash.com/photo-1534258936925-c58bed479fcb?auto=format&fit=crop&w=2200&q=90"
          alt="Conditioning training"
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
            02 / THE CONDITIONING PROGRAM
          </p>

          <h1 className="build-title">
            ENDURE<span>.</span>
          </h1>

          <p className="build-intro">
            Go beyond the familiar. Build endurance, improve stamina
            and discover what consistent effort can achieve.
          </p>
        </div>

        {/* ENDURANCE PULSE VISUAL */}

        <div className="endure-pulse-visual">
          <div className="endure-pulse-ring endure-pulse-ring-outer">
            <span className="endure-pulse-dot" />
          </div>

          <div className="endure-pulse-ring endure-pulse-ring-inner">
            <span className="endure-pulse-dot endure-pulse-dot-inner" />
          </div>

          <div className="endure-pulse-core">
            <span>02</span>
            <small>ENDURANCE</small>
          </div>

          <div className="endure-pulse-line" />

          <div className="endure-pulse-caption">
            KEEP MOVING / KEEP GOING
          </div>
        </div>

        <div className="build-hero-bottom">
          <span>ENDURANCE. STAMINA. CONSISTENCY.</span>
          <span>02 — 03</span>
        </div>
      </section>

      {/* SECTION 01 - THE APPROACH */}

      <section className="build-detail build-approach">
        <div className="build-detail-number">
          01 / THE APPROACH
        </div>

        <div className="build-detail-content">
          <h2 className="build-detail-heading">
            KEEP <span>MOVING.</span>
          </h2>

          <p className="build-detail-text">
            A conditioning experience designed to develop cardiovascular
            fitness, stamina and efficient movement through structured
            training.
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
            FIND YOUR <span>PACE.</span>
          </h2>

          <ul className="build-focus-list">
            <li>
              <span>01</span>
              Cardiovascular conditioning
            </li>

            <li>
              <span>02</span>
              Stamina and endurance development
            </li>

            <li>
              <span>03</span>
              Movement and coordination
            </li>

            <li>
              <span>04</span>
              Consistent performance improvement
            </li>
          </ul>
        </div>
      </section>

      {/* FINAL CTA */}

      <section className="build-cta">
        <div className="build-cta-content">
          <p className="build-cta-label">
            EVERY SESSION MOVES YOU FORWARD.
          </p>

          <h2>
            READY TO ENDURE<span>?</span>
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
