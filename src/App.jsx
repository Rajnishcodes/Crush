import { useEffect, useMemo, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useScroll,
  useTransform,
} from "framer-motion";

import {
  HiArrowDown,
  HiOutlineSparkles,
  HiOutlineSun,
} from "react-icons/hi2";
import "./App.css";

import {
  LuSun,
  LuCoffee,
  LuHeart,
  LuMoonStar,
  LuFlower2,
  LuFeather,
  LuLeaf,
} from "react-icons/lu";

import { PiQuotesLight } from "react-icons/pi";

import portrait from "./assets/portrait.jpg";
import m1 from "./assets/memory1.jpg";
import m2 from "./assets/memory2.jpg";
import m3 from "./assets/memory3.jpg";

export default function Index() {
  return (
    <div className="app">
      <Loader />
      <Cursor />
      <Petals />

      <Hero />
      <Quotes />
      <WhyDifferent />
      <SareeMemory />
      <Timeline />
      <Confession />
      <Footer />
    </div>
  );
}

function Loader() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setDone(true), 1800);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="loader"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9 }}
        >
          <div className="loader-content">
            <motion.div
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.2 }}
              className="loader-circle"
            />

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="loader-text"
            >
              a quiet moment…
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Cursor() {
  const [hover, setHover] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);

  const sx = useSpring(x, {
    stiffness: 300,
    damping: 30,
  });

  const sy = useSpring(y, {
    stiffness: 300,
    damping: 30,
  });

  useEffect(() => {
    const move = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };

    const over = (e) => {
      const t = e.target;
      setHover(!!t.closest("button,a,.hoverable"));
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
    };
  }, []);

  return (
    <>
      <motion.div
        className="cursor-glow"
        style={{
          x: sx,
          y: sy,
          width: hover ? 56 : 14,
          height: hover ? 56 : 14,
        }}
      />

      <motion.div
        className="cursor-dot"
        style={{
          x,
          y,
        }}
      />
    </>
  );
}

function Petals({ count = 18 }) {
  const petals = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 10,
        duration: 14 + Math.random() * 14,
        size: 8 + Math.random() * 14,
      })),
    [count]
  );

  return (
    <div className="petals">
      {petals.map((p) => (
        <motion.div
          key={p.id}
          className="petal"
          initial={{ y: -50, opacity: 0 }}
          animate={{
            y: "110vh",
            x: [0, 30, -20, 10, 0],
            opacity: [0, 0.8, 0.8, 0],
            rotate: 360,
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size,
          }}
        />
      ))}
    </div>
  );
}

function Hero() {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);

  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.2]);

  const headline = [
    "Trying to Feels you Special ☺️, "
  ];

  const [typed, setTyped] = useState(["", ""]);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      for (let line = 0; line < headline.length; line++) {
        for (let i = 0; i <= headline[line].length; i++) {
          if (cancelled) return;

          await new Promise((r) => setTimeout(r, 40));

          setTyped((prev) => {
            const n = [...prev];
            n[line] = headline[line].slice(0, i);
            return n;
          });
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  const scrollNext = () => {
    document
      .getElementById("quotes")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section ref={ref} className="hero">
      <motion.div style={{ y, opacity }} className="hero-grid">
        <div>
          <p className="tag">— a quiet confession</p>

          <h1 className="hero-title">
            {typed.map((line, i) => (
              <span key={i} className="block">
                {line}
              </span>
            ))}
          </h1>

          <p className="hero-desc">
            Some people quietly become special without even trying.
          </p>

          <div className="hero-actions">
            <button onClick={scrollNext} className="magnetic-btn">
              A Small Confession 🌼
            </button>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4 }}
          className="hero-image-wrap"
        >
          <motion.div
            animate={{ y: [0, -18, 0] }}
            transition={{
              duration: 7,
              repeat: Infinity,
            }}
          >
            <img src={portrait} alt="" className="hero-image" />
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.button
        onClick={scrollNext}
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="scroll-btn"
      >
        <HiArrowDown />
      </motion.button>
    </section>
  );
}

function Quotes() {
  const quotes = [
    {
      text: "There are people who feel like a long, slow exhale.",
      tag: "presence",
    },
    {
      text: "Every silence around you carried your name.",
      tag: "silence",
    },
    {
      text: "Some feelings only ask to be felt honestly.",
      tag: "honesty",
    },
  ];

  return (
    <section id="quotes" className="section">
      <div className="container">
        <div className="section-head">
          <p className="tag">— in quiet words</p>

          <h2 className="section-title">
            things I never said out loud
          </h2>
        </div>

        <div className="quote-grid">
          {quotes.map((q, i) => (
            <motion.div
              key={i}
              className="quote-card hoverable"
              whileHover={{ y: -10 }}
            >
              <PiQuotesLight className="quote-icon" />

              <p>{q.text}</p>

              <div className="quote-bottom">
                <span>{q.tag}</span>
                <HiOutlineSparkles />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyDifferent() {
  const items = [
    {
      icon: HiOutlineSun,
      title: "Her Smile",
      text: "It arrived softly.",
    },
    {
      icon: LuFeather,
      title: "The Peace",
      text: "Even my noisy thoughts learned to sit still.",
    },
    {
      icon: LuLeaf,
      title: "The Simplicity",
      text: "Only her, exactly as she was.",
    },
    {
      icon: LuFlower2,
      title: "The Yellow Saree",
      text: "A color became a memory.",
    },
  ];

  return (
    <section className="section">
      <div className="container">
        <div className="section-head">
          <p className="tag">— why she felt different</p>

          <h2 className="section-title">
            it wasn't one thing. it was all of it.
          </h2>
        </div>

        <div className="why-grid">
          {items.map((it, i) => (
            <motion.div
              key={i}
              className="why-card hoverable"
              whileHover={{ y: -6 }}
            >
              <it.icon className="why-icon" />

              <h3>{it.title}</h3>

              <p>{it.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SareeMemory() {
  return (
    <section className="section">
      <div className="memory-grid container">
        <div className="memory-images">
          {[m1, m2, m3].map((src, i) => (
            <motion.img
              key={i}
              src={src}
              className={`memory-image ${i === 0 ? "large" : ""}`}
              whileHover={{ scale: 1.03 }}
            />
          ))}
        </div>

        <div>
          <p className="tag">— a memory in yellow</p>

          <h2 className="section-title">
            you walked in, and the whole room turned warm.
          </h2>

          <p className="memory-text">
            It wasn't loud. It was the way the light folded
            around your shoulders.
          </p>
        </div>
      </div>
    </section>
  );
}

function Timeline() {
  const moments = [
    {
      icon: LuSun,
      when: "the first morning",
      text: "I noticed how easily light settled on you.",
    },
    {
      icon: LuCoffee,
      when: "an ordinary afternoon",
      text: "You laughed at something small.",
    },
    {
      icon: LuFlower2,
      when: "the day in yellow",
      text: "Yellow stopped being a color.",
    },
  ];

  return (
    <section className="section">
      <div className="container">
        <div className="timeline">
          {moments.map((m, i) => (
            <motion.div
              key={i}
              className="timeline-item"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <div className="timeline-icon">
                <m.icon />
              </div>

              <div>
                <p className="timeline-when">{m.when}</p>
                <p className="timeline-text">{m.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Confession() {
  const lines = [
    "if you ever read this,",
    "know that someone, somewhere,",
    "thought of you with kindness",
    "on the days you needed it most.",
  ];

  return (
    <section className="confession">
      <div className="container center">
        <p className="tag">— the final confession</p>

        <h2 className="confession-title">
          {lines.map((l, i) => (
            <motion.span
              key={i}
              className="block"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              {l}
            </motion.span>
          ))}
        </h2>

        <button className="magnetic-btn">
          Still Your Admirer 🌼
        </button>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <p>written softly, for someone who never knew. 🌼</p>
    </footer>
  );
} 