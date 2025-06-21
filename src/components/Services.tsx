import '../styles/Services.css'

export default function Services() {
  const services = [
    {
      title: "Debt Management",
      description: "Our certified financial planners specialize in debt settlement and restructuring strategies, helping you reduce debt by up to 70% through proven negotiation techniques and personalized repayment plans.",
      icon: "balance-scale"
    },
    {
      title: "Investment Planning",
      description: "Get expert guidance from certified financial planners for both long-term goals (home, retirement) and short-term objectives (vacation, emergency fund) with tailored investment strategies.",
      icon: "chart-line"
    }
  ]

  return (
    <section id="services" className="services">
      <div className="section-header">
        <h2>Our Services</h2>
        <p>Discover how neurofi can transform your financial future</p>
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