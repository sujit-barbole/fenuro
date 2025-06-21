import '../styles/About.css'

export default function About() {
  return (
    <section id="about" className="about">
      <div className="section-header">
        <h2>About neurofi</h2>
      </div>
      
      <div className="about-content">
        <div className="about-image">
          <div className="stats-infographic">
            <div className="stat-card primary">
              <div className="stat-number">70%</div>
              <div className="stat-label">Average Debt Reduction</div>
              <div className="stat-icon">📉</div>
            </div>
            
            <div className="stat-card secondary">
              <div className="stat-number">500+</div>
              <div className="stat-label">Families Helped</div>
              <div className="stat-icon">👨‍👩‍👧‍👦</div>
            </div>
            
            <div className="stat-card tertiary">
              <div className="stat-number">100%</div>
              <div className="stat-label">Certified Planners</div>
              <div className="stat-icon">🎓</div>
            </div>
            
            <div className="stat-card accent">
              <div className="stat-number">24/7</div>
              <div className="stat-label">Support Available</div>
              <div className="stat-icon">🔄</div>
            </div>
          </div>
        </div>
        
        <div className="about-text">
          <div className="vision-mission-section">
            <div className="vision-card">
              <h3>Vision Statement</h3>
              <p>
                To be the most trusted financial planning platform that empowers every household—regardless of income level—to achieve long-term financial well-being, stability, and independence.
              </p>
            </div>
            
            <div className="mission-card">
              <h3>Mission Statement</h3>
              <p>
                To deliver comprehensive, unbiased, and practical financial planning solutions that help individuals and families reduce debt, optimize resources, and build a secure financial future—through structured guidance, personalized insights, and a holistic approach to money management.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}