import '../styles/About.css'

export default function About() {
  return (
    <section id="about" className="about">
      <div className="section-header">
        <h2>About NeuroFi</h2>
      </div>
      
      <div className="about-content">
        <div className="about-image">
          {/* You can add an actual image here */}
          <div className="placeholder-image"></div>
        </div>
        
        <div className="about-text">
          <h3>Our Mission</h3>
          <p>
            At NeuroFi, we're on a mission to democratize access to advanced financial tools through 
            artificial intelligence and machine learning technologies.
          </p>
          
          <h3>Our Story</h3>
          <p>
            Founded in 2023, NeuroFi emerged from a vision to combine neuroscience principles with 
            financial technology, creating intuitive solutions that adapt to each user's unique needs.
          </p>
          
          <h3>Our Team</h3>
          <p>
            Our diverse team of financial experts, data scientists, and technology innovators work 
            together to build the future of financial services.
          </p>
        </div>
      </div>
    </section>
  )
}