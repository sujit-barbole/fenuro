import '../styles/Contact.css'

export default function Contact() {
  return (
    <section id="contact" className="contact">
      <div className="section-header">
        <h2>Contact Us</h2>
        <p>Get in touch with our team</p>
      </div>
      
      <div className="contact-container">
        <div className="contact-info">
          <div className="info-item">
            <i className="fas fa-map-marker-alt"></i>
            <p>neurofi hq, 17th cross road, hsr layout, bangalore</p>
          </div>
          <div className="info-item">
            <i className="fas fa-envelope"></i>
            <p>info@neurofi.com</p>
          </div>
          <div className="info-item">
            <i className="fas fa-phone"></i>
            <p>9113662144</p>
          </div>
        </div>
        
        <div className="contact-form">
          <div className="form-content">
            <div className="form-header">
              <h3>Ready to get started?</h3>
              <p>Fill out our detailed questionnaire to help us understand your financial situation better. Our team will review your information and create a personalized debt management plan tailored to your specific needs.</p>
            </div>
            <div className="button-container">
              <a 
                href="https://docs.google.com/forms/d/e/1FAIpQLScaC2HzN8R51L0TFc2B_RdNEXdtWO4jNONQZLOubgW-SetQCw/viewform" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn primary"
              >
                Contact Us Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
