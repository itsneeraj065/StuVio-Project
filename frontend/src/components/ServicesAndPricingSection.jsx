import { useState } from "react";
import { FaLaptopCode, FaMobileAlt, FaExternalLinkAlt, FaCheckCircle, FaRocket } from "react-icons/fa";

export default function ServicesAndPricingSection({ onSelectPlan }) {
  const [activeTab, setActiveTab] = useState("web"); // 'web' | 'app'

  // FEATURED CLIENT WORK
  const featuredProject = {
    title: "Mivo Service",
    domain: "www.mivoservice.in",
    url: "https://www.mivoservice.in",
    category: "Full-Stack Web Application & Service Platform",
    description: "End-to-end digital platform engineered for seamless service booking, real-time client management, and responsive performance across all screen sizes.",
    techStack: ["React.js", "Node.js", "REST APIs", "Tailwind CSS"],
    highlights: ["100% Mobile Responsive", "Fast Load Speed (<1.5s)", "SEO Optimized Architecture"]
  };

  // PRICING DATA
  const pricingData = {
    web: [
      {
        name: "Starter Web",
        price: "₹9,999",
        period: "one-time",
        popular: false,
        desc: "Ideal for small businesses, personal portfolios, and landing pages.",
        features: [
          "Up to 5 Responsive Pages",
          "Custom UI/UX Design",
          "SEO Friendly Structure",
          "Contact Form & WhatsApp Integration",
          "1 Month Free Support"
        ]
      },
      {
        name: "Pro Business Web",
        price: "₹24,999",
        period: "one-time",
        popular: true,
        desc: "Best for growing businesses needing dynamic features and APIs.",
        features: [
          "Full Dynamic Web Application",
          "Admin Dashboard & CMS",
          "Database & API Integration",
          "Payment Gateway Setup",
          "High-Performance Optimization",
          "3 Months Technical Support"
        ]
      },
      {
        name: "Custom Enterprise",
        price: "Custom",
        period: "quote based",
        popular: false,
        desc: "Tailored web platforms with scalable microservices and custom logic.",
        features: [
          "Microservice / SaaS Architecture",
          "Custom API & Third-party Integrations",
          "Advanced Analytics & Tracking",
          "Dedicated Server Setup & CI/CD",
          "Priority 24/7 SLA Support"
        ]
      }
    ],
    app: [
      {
        name: "Cross-Platform Basic",
        price: "₹19,999",
        period: "one-time",
        popular: false,
        desc: "Native-feel Android & iOS apps with core functionality.",
        features: [
          "Android & iOS Build (React Native/Flutter)",
          "5 Core App Screens",
          "Push Notifications Integration",
          "User Auth (Google/Email)",
          "1 Month Maintenance"
        ]
      },
      {
        name: "Full Feature App",
        price: "₹44,999",
        period: "one-time",
        popular: true,
        desc: "Complete mobile product with backend, payment, and real-time data.",
        features: [
          "Custom UI/UX Mobile Design",
          "Backend API Development",
          "In-App Payments & Wallet Sync",
          "Real-time Database & Chat/Alerts",
          "Play Store & App Store Deployment",
          "3 Months Maintenance & Bug Fixes"
        ]
      },
      {
        name: "Enterprise Mobility",
        price: "Custom",
        period: "quote based",
        popular: false,
        desc: "Complex mobile apps with geo-tracking, custom hardware sync, and scale.",
        features: [
          "Live GPS / Geo-location Tracking",
          "High-Concurrency Scale Support",
          "Advanced Security & Data Encryption",
          "Dedicated Admin & Analytics Web Portal",
          "Priority SLA Maintenance"
        ]
      }
    ]
  };

  return (
    <section id="services" style={styles.sectionContainer}>
      
      {/* SECTION HEADER */}
      <div style={styles.headerBox}>
        <span style={styles.badge}>Services & Solutions</span>
        <h2 style={styles.heading}>Custom Web & Mobile App Development</h2>
        <p style={styles.subHeading}>
          High-performance, modern digital products engineered for modern businesses.
        </p>
      </div>

      {/* FEATURED CLIENT PROJECT SHOWCASE */}
      <div style={styles.clientShowcase}>
        <div style={styles.showcaseHeader}>
          <div style={styles.liveTag}>
            <span style={styles.liveDot}></span> Featured Client Project
          </div>
          <a 
            href={featuredProject.url} 
            target="_blank" 
            rel="noopener noreferrer" 
            style={styles.visitSiteBtn}
          >
            Visit Site <FaExternalLinkAlt style={{ marginLeft: "6px", fontSize: "11px" }} />
          </a>
        </div>

        <div style={styles.showcaseBody}>
          <div>
            <h3 style={styles.projectTitle}>{featuredProject.title}</h3>
            <p style={styles.projectDomain}>{featuredProject.domain}</p>
            <p style={styles.projectDesc}>{featuredProject.description}</p>
            
            <div style={styles.techStackRow}>
              {featuredProject.techStack.map((tech, i) => (
                <span key={i} style={styles.techBadge}>{tech}</span>
              ))}
            </div>
          </div>

          <div style={styles.highlightsBox}>
            <div style={styles.highlightTitle}>Key Deliverables</div>
            {featuredProject.highlights.map((item, i) => (
              <div key={i} style={styles.highlightItem}>
                <FaCheckCircle style={{ color: "#10b981", marginRight: "8px", flexShrink: 0 }} />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* TAB TOGGLE SWITCH */}
      <div style={styles.tabToggleContainer}>
        <button
          style={{
            ...styles.tabBtn,
            backgroundColor: activeTab === "web" ? "#6366f1" : "transparent",
            color: activeTab === "web" ? "#ffffff" : "#94a3b8"
          }}
          onClick={() => setActiveTab("web")}
        >
          <FaLaptopCode style={{ marginRight: "8px" }} /> Web Development
        </button>
        <button
          style={{
            ...styles.tabBtn,
            backgroundColor: activeTab === "app" ? "#6366f1" : "transparent",
            color: activeTab === "app" ? "#ffffff" : "#94a3b8"
          }}
          onClick={() => setActiveTab("app")}
        >
          <FaMobileAlt style={{ marginRight: "8px" }} /> App Development
        </button>
      </div>

      {/* PRICING CARDS GRID */}
      <div style={styles.pricingGrid}>
        {pricingData[activeTab].map((plan, idx) => (
          <div 
            key={idx} 
            style={{
              ...styles.priceCard,
              borderColor: plan.popular ? "#6366f1" : "rgba(255, 255, 255, 0.08)",
              boxShadow: plan.popular ? "0 0 25px rgba(99, 102, 241, 0.25)" : "none"
            }}
          >
            {plan.popular && <div style={styles.popularBadge}>Most Popular</div>}
            
            <h3 style={styles.planName}>{plan.name}</h3>
            <p style={styles.planDesc}>{plan.desc}</p>
            
            <div style={styles.priceRow}>
              <span style={styles.priceAmount}>{plan.price}</span>
              <span style={styles.pricePeriod}>/ {plan.period}</span>
            </div>

            <ul style={styles.featureList}>
              {plan.features.map((feat, fIdx) => (
                <li key={fIdx} style={styles.featureItem}>
                  <FaCheckCircle style={styles.checkIcon} />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>

            <button 
              style={{
                ...styles.actionBtn,
                backgroundColor: plan.popular ? "#6366f1" : "rgba(255, 255, 255, 0.05)",
                border: plan.popular ? "none" : "1px solid rgba(255, 255, 255, 0.1)"
              }}
              onClick={() => onSelectPlan && onSelectPlan(plan.name)}
            >
              <FaRocket style={{ marginRight: "8px" }} /> Select Plan
            </button>
          </div>
        ))}
      </div>

    </section>
  );
}

const styles = {
  sectionContainer: {
    padding: "60px 20px",
    maxWidth: "1200px",
    margin: "0 auto",
    color: "#cbd5e1"
  },
  headerBox: {
    textAlign: "center",
    marginBottom: "40px"
  },
  badge: {
    backgroundColor: "rgba(99, 102, 241, 0.15)",
    color: "#818cf8",
    fontSize: "12px",
    fontWeight: "700",
    textTransform: "uppercase",
    padding: "6px 14px",
    borderRadius: "20px",
    letterSpacing: "0.5px"
  },
  heading: {
    fontSize: "32px",
    fontWeight: "800",
    color: "#ffffff",
    marginTop: "12px",
    marginBottom: "8px",
    letterSpacing: "-0.5px"
  },
  subHeading: {
    fontSize: "15px",
    color: "#94a3b8",
    maxWidth: "600px",
    margin: "0 auto"
  },

  /* FEATURED SHOWCASE STYLES */
  clientShowcase: {
    backgroundColor: "rgba(30, 41, 59, 0.35)",
    border: "1px solid rgba(99, 102, 241, 0.3)",
    borderRadius: "20px",
    padding: "28px",
    marginBottom: "48px",
    backdropFilter: "blur(10px)"
  },
  showcaseHeader: {
    display: "flex",
    justifySpaceBetween: "space-between",
    alignItems: "center",
    marginBottom: "20px",
    borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
    paddingBottom: "14px"
  },
  liveTag: {
    display: "flex",
    alignItems: "center",
    fontSize: "12px",
    fontWeight: "700",
    color: "#10b981",
    textTransform: "uppercase",
    letterSpacing: "0.5px"
  },
  liveDot: {
    width: "8px",
    height: "8px",
    backgroundColor: "#10b981",
    borderRadius: "50%",
    marginRight: "8px",
    boxShadow: "0 0 8px #10b981"
  },
  visitSiteBtn: {
    color: "#6366f1",
    textDecoration: "none",
    fontSize: "13px",
    fontWeight: "600",
    display: "flex",
    alignItems: "center"
  },
  showcaseBody: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "24px",
    alignItems: "center"
  },
  projectTitle: {
    fontSize: "24px",
    fontWeight: "800",
    color: "#ffffff",
    margin: "0 0 4px 0"
  },
  projectDomain: {
    fontSize: "13px",
    color: "#818cf8",
    fontFamily: "monospace",
    marginBottom: "12px"
  },
  projectDesc: {
    fontSize: "14px",
    color: "#94a3b8",
    lineHeight: "1.6",
    marginBottom: "16px"
  },
  techStackRow: {
    display: "flex",
    gap: "8px",
    flexWrap: "wrap"
  },
  techBadge: {
    backgroundColor: "#1e293b",
    border: "1px solid rgba(255, 255, 255, 0.08)",
    color: "#cbd5e1",
    fontSize: "11px",
    padding: "4px 10px",
    borderRadius: "6px"
  },
  highlightsBox: {
    backgroundColor: "rgba(15, 23, 42, 0.6)",
    borderRadius: "14px",
    padding: "20px",
    border: "1px solid rgba(255, 255, 255, 0.05)"
  },
  highlightTitle: {
    fontSize: "12px",
    fontWeight: "700",
    color: "#94a3b8",
    textTransform: "uppercase",
    marginBottom: "12px"
  },
  highlightItem: {
    display: "flex",
    alignItems: "center",
    fontSize: "13px",
    color: "#e2e8f0",
    marginBottom: "10px"
  },

  /* TAB CONTROLS */
  tabToggleContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    maxWidth: "360px",
    margin: "0 auto 40px auto",
    backgroundColor: "#1e293b",
    padding: "5px",
    borderRadius: "12px",
    border: "1px solid rgba(255, 255, 255, 0.08)"
  },
  tabBtn: {
    flex: 1,
    border: "none",
    padding: "10px",
    borderRadius: "8px",
    fontSize: "13px",
    fontWeight: "600",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.2s"
  },

  /* PRICING GRID */
  pricingGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "24px"
  },
  priceCard: {
    backgroundColor: "rgba(30, 41, 59, 0.2)",
    border: "1px solid",
    borderRadius: "20px",
    padding: "28px",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between"
  },
  popularBadge: {
    position: "absolute",
    top: "-12px",
    right: "24px",
    backgroundColor: "#6366f1",
    color: "#ffffff",
    fontSize: "11px",
    fontWeight: "700",
    padding: "4px 12px",
    borderRadius: "12px",
    textTransform: "uppercase"
  },
  planName: {
    fontSize: "20px",
    fontWeight: "700",
    color: "#ffffff",
    margin: "0 0 6px 0"
  },
  planDesc: {
    fontSize: "13px",
    color: "#94a3b8",
    minHeight: "38px",
    lineHeight: "1.5",
    margin: "0 0 20px 0"
  },
  priceRow: {
    display: "flex",
    alignItems: "baseline",
    gap: "6px",
    marginBottom: "24px",
    borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
    paddingBottom: "16px"
  },
  priceAmount: {
    fontSize: "32px",
    fontWeight: "800",
    color: "#ffffff"
  },
  pricePeriod: {
    fontSize: "13px",
    color: "#64748b"
  },
  featureList: {
    listStyle: "none",
    padding: 0,
    margin: "0 0 28px 0",
    display: "flex",
    flexDirection: "column",
    gap: "12px"
  },
  featureItem: {
    display: "flex",
    alignItems: "center",
    fontSize: "13px",
    color: "#cbd5e1"
  },
  checkIcon: {
    color: "#6366f1",
    marginRight: "10px",
    flexShrink: 0
  },
  actionBtn: {
    color: "#ffffff",
    padding: "12px",
    borderRadius: "10px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    transition: "transform 0.2s"
  }
};