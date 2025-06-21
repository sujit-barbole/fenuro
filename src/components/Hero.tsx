import '../styles/Hero.css'

export default function Hero() {
  return (
    <section id="home" className="hero">
      <div className="hero-slide active" style={{ backgroundImage: `url('/images/hero-1.jpg')` }}>
        <div className="hero-content">
          <h1>Wanna Reduce Your Debt?</h1>
          <p>Be among the first to join our revolutionary debt settlement platform! Early access MVP launching soon - secure your spot now!</p>
          <div className="cta-buttons">
            <a href="https://docs.google.com/forms/d/e/1FAIpQLSdVvrwCS5ZtPBgdOftjS6u-PxyxeSoRMXBJLwf3I0XBWtcsuw/viewform?usp=header" target="_blank" rel="noopener noreferrer" className="btn primary">Get Early Access</a>
            <a href="#services" className="btn secondary">Learn More</a>
          </div>
        </div>
      </div>
    </section>
  )
}
