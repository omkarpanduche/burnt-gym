
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const disciplines = [
  {
    number: "01",
    name: "STRENGTH",
    subtitle: "BUILD YOUR FOUNDATION",
    description:
      "Progressive strength training built around control, consistency and power.",
    image:
      "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=1400&q=90",
  },
  {
    number: "02",
    name: "CONDITIONING",
    subtitle: "PUSH YOUR LIMITS",
    description:
      "Improve endurance, movement and stamina through purposeful training.",
    image:
      "https://images.unsplash.com/photo-1534258936925-c58bed479fcb?auto=format&fit=crop&w=1400&q=90",
  },
  {
    number: "03",
    name: "PERFORMANCE",
    subtitle: "MOVE WITH PURPOSE",
    description:
      "Train coordination, athletic movement and the ability to perform.",
    image:
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1400&q=90",
  },
];

export default function Training() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // DESKTOP: Horizontal scroll animation
      mm.add("(min-width: 769px)", () => {
        const track = trackRef.current;
        const cards = gsap.utils.toArray(".training-card");

        const getDistance = () =>
          track.scrollWidth - window.innerWidth;

        const horizontalTween = gsap.to(track, {
          x: () => -getDistance(),
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: () => `+=${getDistance()}`,
            scrub: 1,
            pin: true,
            invalidateOnRefresh: true,
          },
        });

        cards.forEach((card) => {
          const image = card.querySelector(".training-image");
          const content = card.querySelector(
            ".training-card-content"
          );

          // Image movement
          gsap.fromTo(
            image,
            { scale: 1.15 },
            {
              scale: 1,
              ease: "none",
              scrollTrigger: {
                trigger: card,
                containerAnimation: horizontalTween,
                start: "left right",
                end: "right left",
                scrub: true,
              },
            }
          );

          // Smooth text reveal
          gsap.fromTo(
            content,
            {
              y: 45,
              autoAlpha: 0,
            },
            {
              y: 0,
              autoAlpha: 1,
              ease: "none",
              scrollTrigger: {
                trigger: card,
                containerAnimation: horizontalTween,
                start: "left 80%",
                end: "left 40%",
                scrub: 0.6,
                invalidateOnRefresh: true,
              },
            }
          );
        }); // IMPORTANT: closes cards.forEach()
      });

      // MOBILE: Normal vertical scrolling
      mm.add("(max-width: 768px)", () => {
        gsap.utils.toArray(".training-card").forEach((card) => {
          const content = card.querySelector(
            ".training-card-content"
          );

          gsap.fromTo(
            content,
            { y: 35, autoAlpha: 0 },
            {
              y: 0,
              autoAlpha: 1,
              duration: 0.9,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                start: "top 80%",
                toggleActions: "play none none reverse",
              },
            }
          );
        });
      });

      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  return (
    <section className="training-section" ref={sectionRef}>
      <div className="training-header">
        <div>
          <p className="training-eyebrow">
            02 / THE TRAINING SYSTEM
          </p>

          <h2>
            TRAIN WITH
            <br />
            <span>INTENT.</span>
          </h2>
        </div>

        <p className="training-intro">
          Different goals. Different disciplines.
          One standard — never settle.
        </p>
      </div>

      <div className="training-track" ref={trackRef}>
        {disciplines.map((item) => (
          <article className="training-card" key={item.number}>
            <img
              className="training-image"
              src={item.image}
              alt={`${item.name} training`}
            />

            <div className="training-card-overlay" />

            <div className="training-card-content">
              <span className="training-number">
                {item.number}
              </span>

              <div>
                <p className="training-subtitle">
                  {item.subtitle}
                </p>

                <h3>{item.name}</h3>

                <p className="training-description">
                  {item.description}
                </p>
              </div>

              <span className="training-arrow">↗</span>
            </div>
          </article>
        ))}
      </div>

      <div className="training-footer">
        <span>THREE DISCIPLINES. ONE MINDSET.</span>
        <span>SCROLL TO EXPLORE ↓</span>
      </div>
    </section>
  );
}
