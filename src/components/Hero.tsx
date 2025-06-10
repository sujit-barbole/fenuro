import { useState } from 'react'
import '../styles/Hero.css'

export default function Hero() {
  const slides = [
    {
      image: '/images/hero-1.jpg',
      title: 'Financial Solutions Powered by AI',
      description: 'Transforming the way you manage finances with cutting-edge technology'
    },
    {
      image: '/images/hero-2.jpg',
      title: 'Smart Investment Strategies',
      description: 'Maximize your returns with our data-driven investment recommendations'
    },
    {
      image: '/images/hero-3.jpg',
      title: 'Secure Financial Planning',
      description: 'Plan your future with confidence using our advanced security protocols'
    }
  ]

  const [currentSlide, setCurrentSlide] = useState(0)

  // Manual navigation
  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  const goToPrevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1))
  }

  const goToNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  return (
    <section id="home" className="hero">
      <div className="hero-slider">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`hero-slide ${index === currentSlide ? 'active' : ''}`}
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className="hero-content">
              <h1>{slide.title}</h1>
              <p>{slide.description}</p>
              <div className="cta-buttons">
                <a href="#contact" className="btn primary">Get Started</a>
                <a href="#services" className="btn secondary">Learn More</a>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        className="slider-arrow prev"
        onClick={goToPrevSlide}
        aria-label="Previous slide"
      >
        <span>&#10094;</span>
      </button>

      <button
        className="slider-arrow next"
        onClick={goToNextSlide}
        aria-label="Next slide"
      >
        <span>&#10095;</span>
      </button>

      <div className="slider-dots">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`dot ${index === currentSlide ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  )
}
