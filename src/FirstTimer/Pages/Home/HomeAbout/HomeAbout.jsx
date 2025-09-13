import React, { useState, useEffect } from "react";
import { Handshake, Lightbulb, Users } from "lucide-react";
import "./HomeAbout.css";
import "../../../Shared.css";

const HomeAbout = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [activeCard, setActiveCard] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 1000);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const cards = [
    {
      id: 0,
      icon: Handshake,
      title: "Sell Direct to Buyers",
      shortDesc: "No middlemen. Full profit.",
      fullDesc:
        "List your produce in minutes. Connect directly with restaurants, hotels, and retailers. Set your own prices and keep 100% of the profits.",
      gradient: "linear-gradient(135deg, #40bf40 0%, #2dd4bf 100%)",
      glowColor: "rgba(64, 191, 64, 0.4)",
      shadowColor: "rgba(64, 191, 64, 0.25)",
    },
    {
      id: 1,
      icon: Lightbulb,
      title: "Share Knowledge",
      shortDesc: "Learn from fellow farmers.",
      fullDesc:
        "Connect with experienced farmers across Kenya. Exchange tips on crops, pest control, market trends, and sustainable farming practices.",
      gradient: "linear-gradient(135deg, #84cc16 0%, #40bf40 100%)",
      glowColor: "rgba(132, 204, 22, 0.4)",
      shadowColor: "rgba(132, 204, 22, 0.25)",
    },
    {
      id: 2,
      icon: Users,
      title: "Build Your Network",
      shortDesc: "Grow your farming community.",
      fullDesc:
        "Join regional farmer groups. Find mentors, share resources, bulk-buy inputs, and create lasting partnerships that help your farm thrive.",
      gradient: "linear-gradient(135deg, #2dd4bf 0%, #50d050 100%)",
      glowColor: "rgba(45, 212, 191, 0.4)",
      shadowColor: "rgba(45, 212, 191, 0.25)",
    },
  ];

  const handleCardClick = (cardId) => {
    if (isMobile) {
      setActiveCard(activeCard === cardId ? null : cardId);
    }
  };

  const handleMouseEnter = (cardId) => {
    if (!isMobile) {
      setHoveredCard(cardId);
    }
  };

  const handleMouseLeave = () => {
    if (!isMobile) {
      setHoveredCard(null);
    }
  };

  const getCardWidth = (cardId) => {
    if (isMobile) return "100%";

    // All cards have equal width when expanded
    if (hoveredCard === cardId) return "45%";
    if (hoveredCard !== null && hoveredCard !== cardId) return "27.5%";

    // Default state - first card slightly larger
    if (cardId === 0) return "40%";
    return "30%";
  };

  return (
    <section className="three-ways-section">
      <div className="container section">
        {/* Header Section */}
        <div className="three-ways-header">
          <div className="header-left section-headers">
            <div className="pre-title">
              <span className="pre-title-line green"></span>
              <span className="pre-title-text green">HOW IT WORKS</span>
            </div>
            <h1 className="home-about-title section-title ">
              Three Ways to Grow with Kilimo Link
            </h1>
          </div>
          <div className="header-right">
            <p className="home-about-description">
              Whether you're looking to sell your harvest, learn new techniques,
              or build lasting partnerships, our platform connects you with
              opportunities to thrive in Kenya's agricultural community.
            </p>
          </div>
        </div>

        {/* Cards Section */}
        <div className="three-ways-cards">
          {cards.map((card) => {
            const IconComponent = card.icon;
            const isExpanded = isMobile
              ? activeCard === card.id
              : hoveredCard === card.id ||
                (hoveredCard === null && card.id === 0);

            return (
              <div
                key={card.id}
                className={`way-card ${isExpanded ? "expanded" : ""}`}
                style={{
                  width: getCardWidth(card.id),
                  background: card.gradient,
                  boxShadow: isExpanded
                    ? `0 20px 60px ${card.shadowColor}, 0 0 40px ${card.glowColor}`
                    : `0 8px 32px ${card.shadowColor}`,
                }}
                onClick={() => handleCardClick(card.id)}
                onMouseEnter={() => handleMouseEnter(card.id)}
                onMouseLeave={handleMouseLeave}
              >
                <div
                  className="card-glow"
                  style={{ background: card.glowColor }}
                ></div>

                <div className="card-content">
                  <div className="card-text-content">
                    <h3 className="card-title">{card.title}</h3>
                    <p className="card-short-desc">{card.shortDesc}</p>

                    <div
                      className={`card-expanded-content ${
                        isExpanded ? "visible" : ""
                      }`}
                    >
                      <p className="card-full-desc">{card.fullDesc}</p>
                      <div className="card-action">
                        <span className="learn-more">
                          Learn More
                          <svg
                            className="arrow-icon"
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                          >
                            <path
                              d="M1 8h14m-7-7 7 7-7 7"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="card-icon-bg">
                    <IconComponent size={120} className="background-icon" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HomeAbout;
