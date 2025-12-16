import { useEffect, useState } from "react";
import "./Faqs.css";
import AOS from "aos";
import "aos/dist/aos.css";
import "../../../Shared.css";
import faqsData from "./FaqsData";
import { Plus, Minus } from "lucide-react";

const Faqs = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-out-cubic",
      once: true,
      offset: 50,
      disable: window.innerWidth < 768, // Disable on mobile to prevent layout issues
    });
  }, []);

  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (id) => {
    setOpenFaq((prev) => (prev === id ? null : id));
  };

  return (
    <section className="faqs-section section min-h-viewport">
      <div className="faqs-container container">
        <div className=" faqs-contents ">
          <div className="faqs-headers" data-aos="fade-up">
            <div className="pre-title">
              <span className="pre-title-line green"></span>
              <span className="pre-title-text green">FAQs</span>
            </div>
            <h1 className="section-title title-max-50">
              Frequently Asked Questions
            </h1>
            <p className="section-description">
              Find answers to common questions about connecting with buyers,
              sharing knowledge in the community, and getting the most out of
              our platform for Kenyan farmers and buyers.
            </p>
          </div>
          <div className="faqs-list">
            {faqsData.map((faq) => {
              const isOpen = openFaq === faq.id;
              return (
                <div
                  key={faq.id}
                  className={`faq-item ${isOpen ? "open" : ""}`}
                  onClick={() => toggleFaq(faq.id)}
                >
                  <div className="faq-question">
                    <span>{faq.faqTitle}</span>
                    <div className="faq-icon-circle">
                      {isOpen ? (
                        <Minus className="faq-icon" size={18} />
                      ) : (
                        <Plus className="faq-icon" size={18} />
                      )}
                    </div>
                  </div>
                  <div className="faq-answer">
                    <p>{faq.faqAnswer}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Faqs;
