
import { useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Build() {
  const pageRef = useRef(null);

  useGSAP(
    () => {
      // =====================================
      // HERO INTRO ANIMATION
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
            y: 90,
            opacity: 0,
            scale: 0.94,
            filter: "blur(12px)",
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            filter: "blur(0px)",
            duration: 3.2,
            ease: "power2.out",
          },
          "-=0.15"
        )
        .from(
          ".build-intro",
          {
            y: 35,
            opacity: 0,
            duration: 1.5,
          },
          "-=1.2"
        )
        .from(
          ".build-hero-bottom",
          {
            y: 25,
            opacity: 0,
            duration: 1.2,
          },
          "-=0.8"
        );

      // =====================================
      // ABSTRACT HERO VISUAL
      // =====================================

      gsap.to(".build-orbit-outer", {
        rotation: 360,
        duration: 35,
        repeat: -1,
        ease: "none",
      });

      gsap.to(".build-orbit-inner", {
        rotation: -360,
        duration: 24,
        repeat: -1,
        ease: "none",
      });

      gsap.to(".build-energy-line", {
        scaleX: 1,
        opacity: 1,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(".build-crosshair", {
        rotation: 180,
        duration: 18,
        repeat: -1,
        ease: "none",
      });

      // =====================================
      // HERO SCROLL ANIMATIONS
      // =====================================

      gsap.fromTo(
        ".build-visual",
        {
          y: 100,
          opacity: 0,
          scale: 0.85,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: ".build-hero",
            start: "top 20%",
            end: "bottom 65%",
            scrub: 2,
          },
        }
      );

      gsap.to(".build-visual", {
        y: -70,
        scale: 1.08,
        ease: "none",
        scrollTrigger: {
          trigger: ".build-hero",
          start: "top top",
          end: "bottom top",
          scrub: 2,
        },
      });

      gsap.to(".build-hero-image", {
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
      // DETAIL SECTION ANIMATIONS
      // =====================================

      const details = gsap.utils.toArray(".build-detail");

      details.forEach((section) => {
        const heading = section.querySelector(
          ".build-detail-heading"
        );

        // Heading slowly slides in from the left
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

        // Supporting content reveals
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
      // FINAL CTA ANIMATIONS
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
    <main className="build-page" ref={pageRef}>
      {/* =====================================
          HERO SECTION
      ===================================== */}

      <section className="build-hero">
        <div className="build-hero-image">
          <img
            src="https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=2000&q=85"
            alt="Strength training"
          />
        </div>

        <div className="build-hero-overlay" />

        {/* NAVIGATION */}

        <nav className="build-nav">
          <Link to="/" className="program-logo">
            BURNT<span>.</span>
          </Link>

          <Link to="/#programs" className="program-back">
            <span>←</span> BACK TO PROGRAMS
          </Link>
        </nav>

        {/* HERO CONTENT */}

        <div className="build-hero-content">
          <p className="build-eyebrow">
            01 / THE STRENGTH PROGRAM
          </p>

          <h1 className="build-title">BUILD.</h1>

          <p className="build-intro">
            Strength isn't given. It's built through consistency,
            discipline and purposeful training.
          </p>
        </div>

        {/* ABSTRACT SCROLL VISUAL */}

        <div className="build-visual">
          <div className="build-orbit build-orbit-outer">
            <span className="build-orbit-dot" />
          </div>

          <div className="build-orbit build-orbit-inner">
            <span className="build-orbit-dot build-orbit-dot-inner" />
          </div>

          <div className="build-crosshair">
            <span />
            <span />
          </div>

          <div className="build-energy-line" />

          <div className="build-visual-center">
            <span>01</span>
            <span>STRENGTH</span>
          </div>
        </div>

        <div className="build-hero-bottom">
          <span>CONTROL. CONSISTENCY. POWER.</span>
          <span>01 — 03</span>
        </div>
      </section>

      {/* =====================================
          THE APPROACH
      ===================================== */}

      <section className="build-detail build-approach">
        <div className="build-detail-number">
          01 / THE APPROACH
        </div>

        <div className="build-detail-content">
          <h2 className="build-detail-heading">
            BUILT ON <span>PROGRESS.</span>
          </h2>

          <p className="build-detail-text">
            Real strength comes from showing up, putting in the work
            and improving one step at a time. Our approach focuses on
            structured strength training that challenges you while
            keeping every movement purposeful.
          </p>
        </div>
      </section>

      {/* =====================================
          WHAT YOU FOCUS ON
      ===================================== */}

      <section className="build-detail build-focus">
        <div className="build-detail-number">
          02 / WHAT YOU FOCUS ON
        </div>

        <div className="build-detail-content">
          <h2 className="build-detail-heading">
            TRAIN WITH <span>PURPOSE.</span>
          </h2>

          <p className="build-detail-text">
            Every session has a direction. Focus on the fundamentals,
            build consistency and develop a stronger foundation.
          </p>

          <ul className="build-focus-list">
            <li>
              <span>01</span>
              Progressive resistance
            </li>

            <li>
              <span>02</span>
              Movement technique and control
            </li>

            <li>
              <span>03</span>
              Consistent training habits
            </li>

            <li>
              <span>04</span>
              Balanced strength development
            </li>
          </ul>
        </div>
      </section>

      {/* =====================================
          FINAL CTA
      ===================================== */}

      <section className="build-cta">
        <div className="build-cta-content">
          <p className="build-cta-label">
            YOUR NEXT CHAPTER STARTS HERE.
          </p>

          <h2>READY TO BUILD?</h2>

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
