
import { useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const memberships = [
  {
    number: "01",
    name: "STARTER",
    subtitle: "FOR THE BEGINNING",
    description: "Build consistency. Establish your foundation.",
    features: [
      "Gym floor access",
      "Standard equipment",
      "Basic fitness assessment",
      "Locker access",
    ],
    featured: false,
  },
  {
    number: "02",
    name: "PERFORMANCE",
    subtitle: "FOR THE COMMITTED",
    description: "A complete training experience for your goals.",
    features: [
      "Everything in Starter",
      "Group training sessions",
      "Progress tracking",
      "Priority equipment access",
    ],
    featured: true,
  },
  {
    number: "03",
    name: "ELITE",
    subtitle: "FOR THE DEDICATED",
    description: "A more personalised approach to your training.",
    features: [
      "Everything in Performance",
      "Personal training sessions",
      "Individual fitness planning",
      "Dedicated progress reviews",
    ],
    featured: false,
  },
];

export default function Membership() {
  const sectionRef = useRef(null);

  useGSAP(
    () => {
      // ULTRA-SLOW HEADING REVEAL
      gsap.fromTo(
        ".membership-heading",
        {
          y: 130,
          autoAlpha: 0,
          scale: 0.96,
        },
        {
          y: 0,
          autoAlpha: 1,
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: ".membership-heading",
            start: "top 100%",
            end: "top 5%",
            scrub: 5,
          },
        }
      );

      // TOPLINE
      gsap.from(".membership-topline span", {
        y: 20,
        autoAlpha: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
        },
      });

      const cards = gsap.utils.toArray(".membership-card");
      const cleanups = [];

      cards.forEach((card) => {
        const contentItems = card.querySelectorAll(
          ".membership-card-top, .membership-card-main, .membership-features, .membership-button"
        );

        const light = card.querySelector(".membership-light");
        const button = card.querySelector(".membership-button");

        // CARD 3D PERSPECTIVE
        gsap.set(card, {
          transformPerspective: 1100,
          transformStyle: "preserve-3d",
          transformOrigin: "center center",
        });

        // SMOOTH DIRECTIONAL TILT
        const rotateX = gsap.quickTo(card, "rotationX", {
          duration: 0.7,
          ease: "power3.out",
        });

        const rotateY = gsap.quickTo(card, "rotationY", {
          duration: 0.7,
          ease: "power3.out",
        });

        const handleTilt = (e) => {
          const rect = card.getBoundingClientRect();

          const x = (e.clientX - rect.left) / rect.width;
          const y = (e.clientY - rect.top) / rect.height;

          rotateX((0.5 - y) * 12);
          rotateY((x - 0.5) * 12);
        };

        const resetTilt = () => {
          rotateX(0);
          rotateY(0);
        };

        // CARD ENTRANCE
        gsap.fromTo(
          card,
          {
            y: 80,
            autoAlpha: 0,
          },
          {
            y: 0,
            autoAlpha: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 88%",
              toggleActions: "play none none reverse",
            },
          }
        );

        // CONTENT REVEALS
        gsap.fromTo(
          contentItems,
          {
            y: 35,
            autoAlpha: 0,
          },
          {
            y: 0,
            autoAlpha: 1,
            stagger: 0.13,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              start: "top 82%",
              end: "top 35%",
              scrub: 0.8,
            },
          }
        );

        // FEATURE REVEALS
        const features = card.querySelectorAll(".membership-feature");

        gsap.fromTo(
          features,
          {
            x: -20,
            autoAlpha: 0,
          },
          {
            x: 0,
            autoAlpha: 1,
            stagger: 0.12,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              start: "top 65%",
              end: "top 15%",
              scrub: 0.7,
            },
          }
        );

        // RED LIGHT SWEEP
        if (light) {
          gsap.fromTo(
            light,
            {
              xPercent: -180,
              autoAlpha: 0,
            },
            {
              xPercent: 250,
              autoAlpha: 1,
              ease: "none",
              scrollTrigger: {
                trigger: card,
                start: "top bottom",
                end: "bottom top",
                scrub: 1,
              },
            }
          );
        }

        // HOVER EFFECT
        const enter = () => {
          gsap.to(card, {
            y: -10,
            scale: 1.015,
            duration: 0.5,
            ease: "power3.out",
            boxShadow:
              "0 25px 55px rgba(0,0,0,0.45), 0 0 30px rgba(224,68,56,0.35)",
          });

          gsap.to(card, {
            "--card-glow": 1,
            duration: 0.4,
          });

          if (button) {
            gsap.to(button, {
              backgroundColor: "#e04438",
              color: "#ffffff",
              duration: 0.3,
            });
          }
        };

        const leave = () => {
          resetTilt();

          gsap.to(card, {
            y: 0,
            scale: 1,
            duration: 0.7,
            ease: "power3.out",
            boxShadow: "0 0 0 rgba(0,0,0,0)",
          });

          gsap.to(card, {
            "--card-glow": 0,
            duration: 0.5,
          });

          if (button) {
            gsap.to(button, {
              clearProps: "backgroundColor,color",
              duration: 0.3,
            });
          }
        };

        card.addEventListener("mouseenter", enter);
        card.addEventListener("mousemove", handleTilt);
        card.addEventListener("mouseleave", leave);

        cleanups.push(() => {
          card.removeEventListener("mouseenter", enter);
          card.removeEventListener("mousemove", handleTilt);
          card.removeEventListener("mouseleave", leave);
        });
      });

      // FOOTER
      gsap.from(".membership-footer span", {
        y: 20,
        autoAlpha: 0,
        stagger: 0.15,
        duration: 0.8,
        scrollTrigger: {
          trigger: ".membership-footer",
          start: "top 95%",
        },
      });

      // CLEANUP
      return () => {
        cleanups.forEach((cleanup) => cleanup());
      };
    },
    { scope: sectionRef }
  );

  return (
    <section
      className="membership-section"
      id="membership"
      ref={sectionRef}
    >
      <div className="membership-topline">
        <span>04 / MEMBERSHIP</span>
        <span>INVEST IN YOURSELF</span>
      </div>

      <div className="membership-heading">
        <p>YOUR COMMITMENT. YOUR JOURNEY.</p>

        <h2>
          CHOOSE YOUR
          <br />
          <span>STANDARD.</span>
        </h2>

        <p className="membership-intro">
          Different levels of commitment. One shared mindset.
          Find the membership that moves you forward.
        </p>
      </div>

      <div className="membership-grid">
        {memberships.map((plan) => (
          <article
            className={`membership-card ${
              plan.featured ? "membership-featured" : ""
            }`}
            key={plan.number}
          >
            <div className="membership-light" />

            <div className="membership-card-top">
              <span>{plan.number} / MEMBERSHIP</span>

              {plan.featured && (
                <span className="popular-label">
                  MOST POPULAR
                </span>
              )}
            </div>

            <div className="membership-card-main">
              <p>{plan.subtitle}</p>
              <h3>{plan.name}</h3>

              <span className="membership-description">
                {plan.description}
              </span>
            </div>

            <div className="membership-features">
              <p>WHAT'S INCLUDED</p>

              {plan.features.map((feature) => (
                <div className="membership-feature" key={feature}>
                  <span>+</span>
                  {feature}
                </div>
              ))}
            </div>

            <Link to="/#contact" className="membership-button">
              ENQUIRE NOW <span>↗</span>
            </Link>
          </article>
        ))}
      </div>

      <div className="membership-footer">
        <span>NO SHORTCUTS. NO COMPROMISES.</span>
        <span>BURNT / 04 — 09</span>
      </div>
    </section>
  );
}
