import '../styles/Hero.css'

export default function Hero() {
  return (
    <section id="home" className="hero">
      <div className="hero-slide active" style={{ backgroundImage: `url('/images/hero-1.jpg')` }}>
        <div className="hero-content">
          <h1>Struggling with debt? Let us help you find a way out</h1>
          <p>Be among the first to join our revolutionary debt settlement platform! Early access MVP launching soon - secure your spot now!</p>
          <div className="cta-buttons">
            <a href="https://docs.google.com/forms/d/e/1FAIpQLScaC2HzN8R51L0TFc2B_RdNEXdtWO4jNONQZLOubgW-SetQCw/viewform?usp=sharing&ouid=103274631790031636089" target="_blank" rel="noopener noreferrer" className="btn early-access">Get Early Access</a>
            <a href="#services" className="btn secondary">Learn More</a>
          </div>
        </div>
      </div>
    </section>
  )
}
