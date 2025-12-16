import React, { useState, useEffect, useRef } from "react";
import "./ImpactStats.css";

const ImpactStats = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  const stats = [
    { value: 1200, label: "Registered Farmers", suffix: "+" },
    { value: 5000, label: "Products Listed", suffix: "+" },
    { value: 47, label: "Counties Covered", suffix: "" },
    { value: 3500, label: "Successful Connections", suffix: "+" },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const Counter = ({ end, suffix }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
      if (!isVisible) return;

      let startTime;
      const duration = 2000;

      const animate = (currentTime) => {
        if (!startTime) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / duration, 1);

        setCount(Math.floor(progress * end));

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(animate);
    }, [isVisible, end]);

    return (
      <span>
        {count.toLocaleString()}
        {suffix}
      </span>
    );
  };

  return (
    <section className="impact-stats" ref={sectionRef}>
      <div className="container">
        <div className="stats-header">
          <h2 className="stats-title">Our Impact in Numbers</h2>
          <p className="stats-subtitle">
            Real results from connecting farmers and buyers across Kenya
          </p>
        </div>
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div key={index} className="stat-card">
              <div className="stat-value">
                <Counter end={stat.value} suffix={stat.suffix} />
              </div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImpactStats;
