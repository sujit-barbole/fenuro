import '../styles/Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section about">
          <h3>About neurofi</h3>
          <p>NeuroFi provides expert-driven debt settlement and restructuring solutions tailored to modern financial challenges.</p>
          <div className="contact">
            <p><i className="fas fa-map-marker-alt"></i> neurofi hq, 17th cross road, hsr layout, bangalore</p>
            <p><i className="fas fa-phone"></i> 9113662144</p>
            <p><i className="fas fa-envelope"></i> info@neurofi.com</p>
          </div>
        </div>

        <div className="footer-section links">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>

        <div className="footer-section social">
          <h3>Follow neurofi</h3>
          <div className="social-links">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="https://www.linkedin.com/company/neurofi-in/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <i className="fab fa-linkedin-in"></i>
            </a>
            <a href="https://www.instagram.com/neurofi.in?igsh=c3JsNG94MzR6ZWs0" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} neurofi. All Rights Reserved.</p>
        <div className="footer-bottom-links">
          <a href="/privacy">Privacy Policy</a>
          <a href="/terms">Terms of Service</a>
        </div>
      </div>
    </footer>
  )
}
