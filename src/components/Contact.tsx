import { useState } from 'react'
import '../styles/Contact.css'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In the future, this will connect to your backend
    console.log('Form submitted:', formData)
    alert('Thanks for contacting us! We will get back to you soon.')
    setFormData({ name: '', email: '', message: '' })
  }
  
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
            <p>+91 98864 67701</p>
          </div>
        </div>
        
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input 
              type="text" 
              id="name" 
              name="name" 
              value={formData.name} 
              onChange={handleChange} 
              required 
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              value={formData.email} 
              onChange={handleChange} 
              required 
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea 
              id="message" 
              name="message" 
              value={formData.message} 
              onChange={handleChange} 
              required 
            ></textarea>
          </div>
          
          <button type="submit" className="btn primary">Send Message</button>
        </form>
      </div>
    </section>
  )
}