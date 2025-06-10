import '../styles/Services.css'

export default function Services() {
  const services = [
    {
      title: "AI-Powered Analysis",
      description: "Our advanced algorithms analyze your financial data to provide personalized insights.",
      icon: "chart-line"
    },
    {
      title: "Smart Investments",
      description: "Automated investment strategies tailored to your goals and risk tolerance.",
      icon: "money-bill-trend-up"
    },
    {
      title: "Secure Transactions",
      description: "State-of-the-art security protocols to keep your financial data safe.",
      icon: "shield-check"
    }
  ]

  return (
    <section id="services" className="services">
      <div className="section-header">
        <h2>Our Services</h2>
        <p>Discover how NeuroFi can transform your financial future</p>
      </div>
      
      <div className="services-grid">
        {services.map((service, index) => (
          <div className="service-card" key={index}>
            <div className="service-icon">
              <i className={`fas fa-${service.icon}`}></i>
            </div>
            <h3>{service.title}</h3>
            <p>{service.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}