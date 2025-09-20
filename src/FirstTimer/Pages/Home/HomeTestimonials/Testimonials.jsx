import React from "react";
import "./Testimonials.css";
import "../../../Shared.css";
import testimonalsData from "./TestimonialsData.jsx";
import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Autoplay, Keyboard } from "swiper/modules";
import "swiper/css";
import { ChevronLeft, ChevronRight , ArrowRight, ArrowLeft, Star} from "lucide-react";

const Testimonials = () => {
  const swiperRef = useRef(null);

  // Function to render stars based on rating
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star
          key={i}
          size={16}
          className={`star-icon ${i <= rating ? 'filled' : 'empty'}`}
          fill={i <= rating ? '#ceb10dff' : 'none'}
          color={i <= rating ? '#ffd700' : '#d1d5db'}
        />
      );
    }
    return stars;
  };

  return (
    <section className="testimonials-section section min-h-viewport">
      <div className="testimonals-container container section-flex-col">
        <div className="testimonials-headers two-col-header">
          <div className="header-left section-headers">
            <div className="pre-title">
              <span className="pre-title-line green"></span>
              <span className="pre-title-text green">Testimonials</span>
            </div>
            <h1 className="testimonials-title section-title why-choose-us-title title-max-50">
              Reviews that speak volumes
            </h1>
          </div>
          <div data-aos="fade-left" data-aos-delay="200">
            <p className="section-description white">
              Hear from others how our technology solutions have saved buyers
              money and farmers are now enjoying really nice rates because we
              cut of middlemen
            </p>
          </div>
        </div>

        <div className="testimonials-swiper-wrapper" data-aos="fade-up" data-aos-delay="150">
          <Swiper
            modules={[A11y, Autoplay, Keyboard]}
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            spaceBetween={24}
            loop={true}
            autoplay={{ delay: 5500, disableOnInteraction: false }}
            keyboard={{ enabled: true }}
            a11y={{ enabled: true }}
            breakpoints={{
              0: { slidesPerView: 1 },
              640: { slidesPerView: 1.2 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 4 },
            }}
            className="testimonials-swiper"
         >
            {testimonalsData.map((t) => (
              <SwiperSlide key={t.id} className="testimonial-slide">
                <div className="testimonial-card">
                  <div className="testimonial-role">
                    <p>{t.role}</p>
                  </div>

                  <div className="testimonial-owner">
                    <div className="testimonial-image">
                      <img src={t.image} alt={t.personName} />
                      <div className="person-names">
                        <p>{t.personName}</p>
                        <span>{t.location}</span>
                      </div>
                    </div>

                    <div className="testimonial-text">
                      <p>{t.testimony}</p>
                    </div>

                    <div className="testimonial-rating">
                      {renderStars(t.rating)}
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="testimonials-nav">
            <button
              aria-label="Previous testimonials"
              className="nav-btn prev"
              onClick={() => swiperRef.current && swiperRef.current.slidePrev()}
            >
              <ArrowLeft size={20} />
            </button>
            <button
              aria-label="Next testimonials"
              className="nav-btn next"
              onClick={() => swiperRef.current && swiperRef.current.slideNext()}
            >
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;