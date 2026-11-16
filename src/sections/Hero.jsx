
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Hero() {
  const heroRef = useRef(null);

  useGSAP(
    () => {
      const image = heroRef.current.querySelector(".hero-image");
      const content = heroRef.current.querySelector(".hero-content");

      // Cinematic image zoom controlled by scrolling
      gsap.fromTo(
        image,
        { scale: 1.25 },
        {
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        }
      );

      // Hero content fades and moves as we scroll
      gsap.to(content, {
        y: -120,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "70% top",
          scrub: 1,
        },
      });

      // Entrance animation
      gsap.from(".hero-heading span", {
        y: 120,
        opacity: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: "power4.out",
      });

      gsap.from(".hero-description", {
        y: 30,
        opacity: 0,
        duration: 1,
        delay: 0.5,
        ease: "power3.out",
      });
    },
    { scope: heroRef }
  );

  return (
    <section className="hero" ref={heroRef}>
      <div className="hero-background">
        <img
          className="hero-image"
          src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=2400&q=90"
          alt="Modern gym interior"
        />
      </div>

      <div className="hero-overlay"></div>

      <nav className="hero-nav">
        <a href="#" className="brand-logo">
          BURNT<span>.</span>
        </a>

        <div className="nav-links">
          <a href="#experience">EXPERIENCE</a>
          <a href="#programs">PROGRAMS</a>
          <a href="#membership">MEMBERSHIP</a>
        </div>

        <a href="#contact" className="nav-cta">
          JOIN THE MOVEMENT <span>↗</span>
        </a>
      </nav>

      <div className="hero-content">
        <p className="hero-tag">
          <span></span> TRAIN BEYOND LIMITS
        </p>

        <h1 className="hero-heading">
          <span>BUILT</span>
          <span className="heading-outline">THROUGH</span>
          <span>DISCIPLINE<span className="red-dot">.</span></span>
        </h1>

        <div className="hero-description">
          <p>
            Not just a gym. A different standard.
            Discover what you're capable of.
          </p>

          <a href="#experience" className="explore-btn">
            EXPLORE THE EXPERIENCE <span>↓</span>
          </a>
        </div>
      </div>

      <div className="hero-bottom">
        <span>EST. FOR THE DRIVEN</span>
        <span>01 / 09</span>
        <span>SCROLL TO DISCOVER ↓</span>
      </div>
    </section>
  );
}
