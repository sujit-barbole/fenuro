import '../styles/Services.css'

export default function Services() {
  const services = [
    {
      title: "Debt Settlement",
      subtitle: "Negotiate Better Terms",
      description: "Our certified financial planners negotiate with creditors to reduce your debt by up to 70% through proven settlement strategies and payment plans.",
      icon: "handshake"
    },
    {
      title: "Debt Solutioning",
      subtitle: "Restructure Your Debt",
      description: "Get personalized debt restructuring solutions that consolidate multiple debts into manageable monthly payments with lower interest rates.",
      icon: "cogs"
    },
    {
      title: "Harassment Relief",
      subtitle: "Stop Collection Calls",
      description: "End creditor harassment and collection calls with our legal expertise. We protect your rights and provide peace of mind during debt resolution.",
      icon: "shield-alt"
    },
    {
      title: "Legal Support",
      subtitle: "Expert Legal Guidance",
      description: "Access professional legal support for debt-related issues, including creditor disputes, bankruptcy alternatives, and consumer protection rights.",
      icon: "gavel"
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
            <h4 className="service-subtitle">{service.subtitle}</h4>
            <p>{service.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}