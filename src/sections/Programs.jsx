
import { useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const programs = [
  {
    number: "01",
    name: "BUILD",
    category: "STRENGTH TRAINING",
    description:
      "Build strength through structured resistance training and consistent progression.",
    image:
      "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=1200&q=90",
    path: "/programs/build",
  },
  {
    number: "02",
    name: "ENDURE",
    category: "CONDITIONING",
    description:
      "Develop endurance, stamina and the ability to keep moving when it gets difficult.",
    image:
      "https://images.unsplash.com/photo-1534258936925-c58bed479fcb?auto=format&fit=crop&w=1200&q=90",
    path: "/programs/endure",
  },
  {
    number: "03",
    name: "PERFORM",
    category: "ATHLETIC PERFORMANCE",
    description:
      "Improve movement, coordination and overall athletic performance.",
    image:
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1200&q=90",
    path: "/programs/perform",
  },
];

export default function Programs() {
  const sectionRef = useRef(null);

  useGSAP(
    () => {
      const rows = gsap.utils.toArray(".program-row");
      const cleanups = [];

      // TOPLINE REVEAL
      gsap.from(".programs-topline span", {
        y: 20,
        autoAlpha: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
        },
      });

      // SLOW CHOOSE YOUR WAY HEADING REVEAL
      gsap.fromTo(
        ".programs-heading",
        {
          x: -180,
          autoAlpha: 0,
        },
        {
          x: 0,
          autoAlpha: 1,
          ease: "none",
          scrollTrigger: {
            trigger: ".programs-heading",
            start: "top 100%",
            end: "top 15%",
            scrub: 4,
          },
        }
      );

      // PROGRAM ROW ANIMATIONS
      rows.forEach((row) => {
        const image = row.querySelector(".program-image");
        const content = row.querySelector(".program-info");
        const arrow = row.querySelector(".program-image-arrow");

        // 3D PERSPECTIVE
        gsap.set(row, {
          transformPerspective: 1200,
          transformStyle: "preserve-3d",
          transformOrigin: "center center",
        });

        // Smooth directional rotation
        const rotateX = gsap.quickTo(row, "rotationX", {
          duration: 0.7,
          ease: "power3.out",
        });

        const rotateY = gsap.quickTo(row, "rotationY", {
          duration: 0.7,
          ease: "power3.out",
        });

        // Directional mouse movement
        const handleTilt = (e) => {
          const rect = row.getBoundingClientRect();

          const x = (e.clientX - rect.left) / rect.width;
          const y = (e.clientY - rect.top) / rect.height;

          const tiltX = (0.5 - y) * 8;
          const tiltY = (x - 0.5) * 8;

          rotateX(tiltX);
          rotateY(tiltY);
        };

        // Reset rotation
        const resetTilt = () => {
          rotateX(0);
          rotateY(0);
        };

        // Row reveal
        gsap.fromTo(
          row,
          {
            y: 60,
            autoAlpha: 0,
          },
          {
            y: 0,
            autoAlpha: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: row,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );

        // Image scroll movement
        gsap.fromTo(
          image,
          {
            scale: 1.2,
          },
          {
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: row,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.8,
            },
          }
        );

        // Hover interaction
        const enter = () => {
          gsap.to(image, {
            scale: 1.1,
            duration: 0.8,
            ease: "power3.out",
          });

          gsap.to(content, {
            x: 14,
            duration: 0.5,
            ease: "power3.out",
          });

          gsap.to(arrow, {
            x: 7,
            y: -7,
            rotation: 45,
            scale: 1.15,
            duration: 0.4,
            ease: "back.out(2)",
          });
        };

        const leave = () => {
          resetTilt();

          gsap.to(image, {
            scale: 1,
            duration: 0.8,
            ease: "power3.out",
          });

          gsap.to(content, {
            x: 0,
            duration: 0.5,
            ease: "power3.out",
          });

          gsap.to(arrow, {
            x: 0,
            y: 0,
            rotation: 0,
            scale: 1,
            duration: 0.4,
            ease: "power3.out",
          });
        };

        row.addEventListener("mouseenter", enter);
        row.addEventListener("mousemove", handleTilt);
        row.addEventListener("mouseleave", leave);
        row.addEventListener("focus", enter);
        row.addEventListener("blur", leave);

        cleanups.push(() => {
          row.removeEventListener("mouseenter", enter);
          row.removeEventListener("mousemove", handleTilt);
          row.removeEventListener("mouseleave", leave);
          row.removeEventListener("focus", enter);
          row.removeEventListener("blur", leave);
        });
      });

      // BOTTOM TEXT REVEAL
      gsap.from(".programs-bottom span", {
        y: 20,
        autoAlpha: 0,
        duration: 0.8,
        stagger: 0.15,
        scrollTrigger: {
          trigger: ".programs-bottom",
          start: "top 95%",
        },
      });

      // Clean up event listeners
      return () => {
        cleanups.forEach((cleanup) => cleanup());
      };
    },
    { scope: sectionRef }
  );

  return (
    <section className="programs-section" ref={sectionRef}>
      <div className="programs-topline">
        <span>03 / THE PROGRAMS</span>
        <span>FIND YOUR DISCIPLINE</span>
      </div>

      <div className="programs-heading">
        <p>YOUR WORK. YOUR STANDARD.</p>

        <h2>
          CHOOSE YOUR
          <br />
          <span>WAY.</span>
        </h2>
      </div>

      <div className="programs-list">
        {programs.map((program) => (
          <Link
            to={program.path}
            className="program-row"
            key={program.number}
          >
            <div className="program-number">
              {program.number}
            </div>

            <div className="program-info">
              <p>{program.category}</p>
              <h3>{program.name}</h3>
              <span>{program.description}</span>
            </div>

            <div className="program-image-wrap">
              <img
                className="program-image"
                src={program.image}
                alt={`${program.name} training program`}
              />

              <div className="program-image-overlay" />

              <span className="program-image-arrow">
                ↗
              </span>
            </div>
          </Link>
        ))}
      </div>

      <div className="programs-bottom">
        <span>NO SHORTCUTS. JUST WORK.</span>
        <span>BURNT / 2026</span>
      </div>
    </section>
  );
}
