
import { useState, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const WHATSAPP_NUMBER = "917744983743";

export default function Contact() {
  const sectionRef = useRef(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    membership: "Performance",
  });

  useGSAP(
    () => {
      // SMALL HEADING TEXT
      gsap.from(".contact-heading > p, .contact-side-note", {
        y: 25,
        autoAlpha: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".contact-heading",
          start: "top 80%",
        },
      });

      // JOIN — ENTER FROM LEFT
      gsap.fromTo(
        ".contact-word-join",
        {
          x: -180,
          autoAlpha: 0,
        },
        {
          x: 0,
          autoAlpha: 1,
          ease: "none",
          scrollTrigger: {
            trigger: ".contact-heading",
            start: "top 85%",
            end: "top 30%",
            scrub: 1.2,
          },
        }
      );

      // THE — ENTER FROM RIGHT
      gsap.fromTo(
        ".contact-word-the",
        {
          x: 180,
          autoAlpha: 0,
        },
        {
          x: 0,
          autoAlpha: 1,
          ease: "none",
          scrollTrigger: {
            trigger: ".contact-heading",
            start: "top 85%",
            end: "top 30%",
            scrub: 1.2,
          },
        }
      );

      // MOVEMENT — RISE FROM BOTTOM
      gsap.fromTo(
        ".contact-word-movement",
        {
          y: 130,
          autoAlpha: 0,
        },
        {
          y: 0,
          autoAlpha: 1,
          ease: "none",
          scrollTrigger: {
            trigger: ".contact-heading",
            start: "top 85%",
            end: "top 25%",
            scrub: 1.3,
          },
        }
      );

      // FORM REVEAL
      gsap.fromTo(
        ".contact-form",
        {
          y: 70,
          autoAlpha: 0,
        },
        {
          y: 0,
          autoAlpha: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".contact-form",
            start: "top 85%",
          },
        }
      );
    },
    { scope: sectionRef }
  );

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const message = `Hello BURNT! I am interested in joining.

Name: ${form.name}
Email: ${form.email}
Phone: ${form.phone}
Membership: ${form.membership}`;

    const whatsappURL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

    window.open(whatsappURL, "_blank", "noopener,noreferrer");
  };

  return (
    <section className="contact-section" id="contact" ref={sectionRef}>
      <div className="contact-topline">
        <span>05 / GET STARTED</span>
        <span>YOUR NEXT CHAPTER STARTS HERE</span>
      </div>

      <div className="contact-layout">
        <div className="contact-heading">
          <p>THE FIRST STEP IS YOURS.</p>

          <h2>
            <span className="contact-word contact-word-join">
              JOIN
            </span>{" "}
            <span className="contact-word contact-word-the">
              THE
            </span>
            <br />
            <span className="contact-word contact-word-movement">
              MOVEMENT.
            </span>
          </h2>

          <p className="contact-description">
            No perfect moment. No perfect beginning.
            Just a decision to move forward.
          </p>

          <span className="contact-side-note">
            TRAIN HARD. STAY CONSISTENT.
          </span>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="contact-form-heading">
            <span>START YOUR JOURNEY</span>
            <span>01 — 04</span>
          </div>

          <label>
            YOUR NAME
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            EMAIL ADDRESS
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            PHONE NUMBER
            <input
              type="tel"
              name="phone"
              placeholder="Enter your phone number"
              value={form.phone}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            SELECT MEMBERSHIP
            <select
              name="membership"
              value={form.membership}
              onChange={handleChange}
            >
              <option value="Starter">Starter</option>
              <option value="Performance">Performance</option>
              <option value="Elite">Elite</option>
            </select>
          </label>

          <button type="submit" className="contact-submit">
            JOIN BURNT <span>↗</span>
          </button>

          <p className="contact-form-note">
            YOUR ENQUIRY WILL OPEN DIRECTLY IN WHATSAPP.
          </p>
        </form>
      </div>

      <div className="contact-bottom">
        <span>MAKE THE MOVE.</span>
        <span>BURNT / 05 — 09</span>
      </div>
    </section>
  );
}
