import { useNavigate } from "react-router-dom";
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';

function LandingPage() {
  const navigate = useNavigate();

  const features = [
    { icon: "📚", title: "Courses Hub", desc: "Access comprehensive syllabus trackers and class lists." },
    { icon: "🎥", title: "Video Lectures", desc: "Stream archived classroom and course screen-recordings." },
    { icon: "📝", title: "Resource Notes", desc: "Download high-quality peer-reviewed lecture notes." },
    { icon: "📄", title: "Assignments", desc: "Submit course tasks directly into our local tracking pipeline." },
    { icon: "📅", title: "Schedules", desc: "Track interactive timetables and upcoming exam slots." },
    { icon: "👥", title: "Community", desc: "Interact directly with fellow scholars in real-time." }
  ];

  const stats = [
    { count: "5,000+", label: "Active Students" },
    { count: "200+", label: "Academic Courses" },
    { count: "1,200+", label: "Video Lectures" },
    { count: "500+", label: "Resource Notes" }
  ];

  const reviews = [
    { stars: "★★★★★", text: "Best platform for tracking semesters! The live tasks pipeline has completely changed how I submit lab reports.", author: "Arjun Mehta, CSE" },
    { stars: "★★★★★", text: "No more messy group chats or lost PDFs. Having video lectures, notes, and deadlines in one dashboard is awesome.", author: "Priya Sharma, ECE" }
  ];

  return (
    <div style={styles.container}>
       
      
      {/* PUBLIC HEADER NAVBAR */}
<header style={styles.navbar}>
  <div style={styles.logo}>
    <img src="/logo.png" alt="StuVio Logo" style={{ height: "80px", width: "auto" }} />
  </div>
   
  <nav style={styles.navLinks}>
    <a href="#features" style={styles.navLink}>Features</a>
    <a href="#stats" style={styles.navLink}>Impact</a>
    <a href="#reviews" style={styles.navLink}>Reviews</a>
  </nav>
   
  <button onClick={() => navigate("/login")} style={styles.loginBtn}>Portal Login</button>

</header>
<nav style={styles.scrollNav}>
       {["HTML", "CSS", "JavaScript", "Python", "Java", "SQL", "React", "Node.js", "C++"].map((item) => (
  <span 
    key={item} 
    style={styles.navItem}
    onMouseEnter={(e) => e.target.style.backgroundColor = "#6366f1"} // Your primary color
    onMouseLeave={(e) => e.target.style.backgroundColor = "transparent"}
  >
    {item}
  </span>
))}
      </nav>

      {/* HERO SECTION */}
      <section style={styles.heroSection}>
        <div style={styles.heroContent}>
          <h1 style={styles.heroHeading}>Student Collaboration & Learning Platform</h1>
          <p style={styles.heroDescription}>
            An automated central workspace designed to track schedules, organize study resources, and push assignment builds dynamically.
          </p>
          <div style={styles.btnRow}>
            <button onClick={() => navigate("/login")} style={styles.primaryBtn}>Get Started</button>
            <a href="#features" style={styles.secondaryBtn}>Explore Features</a>
          </div>
        </div>
      </section>

      {/* DYNAMIC FEATURES */}
      <section id="features" style={styles.section}>
        <h2 style={styles.sectionHeading}>Engineered for Academic Success</h2>
        <div style={styles.grid}>
          {features.map((feat, idx) => (
            <div key={idx} style={styles.card}>
              <span style={styles.cardIcon}>{feat.icon}</span>
              <h3 style={styles.cardTitle}>{feat.title}</h3>
              <p style={styles.cardText}>{feat.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* WHY STUVIO? */}
      <section style={{ ...styles.section, backgroundColor: "rgba(30, 41, 59, 0.2)" }}>
        <h2 style={styles.sectionHeading}>Why StuVio?</h2>
        <div style={styles.whyList}>
          <div style={styles.whyItem}>⚡ <strong>Modern UI:</strong> Zero clutter, dark-themed, and lightning-fast response times.</div>
          <div style={styles.whyItem}>📦 <strong>One Platform:</strong> Notes, schedules, and assignments completely unified.</div>
          <div style={styles.whyItem}>📊 <strong>Track Progress:</strong> Dynamic SGPA estimation and attendance monitoring.</div>
          <div style={styles.whyItem}>🔒 <strong>Secure Access:</strong> Authenticated sessions powered by security tokens.</div>
        </div>
      </section>

      {/* PLATFORM STATISTICS */}
      <section id="stats" style={styles.section}>
        <h2 style={styles.sectionHeading}>Platform Impact</h2>
        <div style={styles.statsRow}>
          {stats.map((stat, idx) => (
            <div key={idx} style={styles.statBox}>
              <div style={styles.statCount}>{stat.count}</div>
              <div style={styles.statLabel}>{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* STUDENT REVIEWS */}
      <section id="reviews" style={{ ...styles.section, backgroundColor: "rgba(30, 41, 59, 0.2)" }}>
        <h2 style={styles.sectionHeading}>Scholar Testimonials</h2>
        <div style={styles.grid}>
          {reviews.map((rev, idx) => (
            <div key={idx} style={styles.reviewCard}>
              <div style={styles.stars}>{rev.stars}</div>
              <p style={styles.reviewText}>"{rev.text}"</p>
              <div style={styles.reviewAuthor}>— {rev.author}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section style={styles.ctaSection}>
        <h2 style={styles.ctaHeading}>Ready to optimize your academic cycle?</h2>
        <div style={styles.btnRow}>
          <button onClick={() => navigate("/login")} style={styles.primaryBtn}>Access Workspace Portal</button>
        </div>
      </section>

      {/* FOOTER */}
<footer style={styles.footer}>
  <div style={styles.footerRow}>
    {/* Left side stays as requested */}
    <div>© {new Date().getFullYear()} StuVio. Constructed by Neeraj Singh Baghel.</div>
    
    {/* Right side now includes both Links and Social Icons */}
    <div style={styles.footerLinks}>
      <a href="#features" style={styles.footerLink}>Features</a>
      
      {/* SOCIAL MEDIA ICONS */}
      <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
        <a href="https://github.com/your-profile" target="_blank" rel="noreferrer" style={styles.socialLink}>
          <FaGithub />
        </a>
        <a href="https://linkedin.com/in/your-profile" target="_blank" rel="noreferrer" style={styles.socialLink}>
          <FaLinkedin />
        </a>
        <a href="https://instagram.com/your-handle" target="_blank" rel="noreferrer" style={styles.socialLink}>
          <FaInstagram />
        </a>
      </div>
    </div>
  </div>
</footer>

    </div>
  );
}

const styles = {
  container: {
    backgroundColor: "#0b0f19",
    color: "#cbd5e1",
    minHeight: "100vh"
  },
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px 40px",
    borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
    maxWidth: "1200px",
    margin: "0 auto"
  },
 logo: {
    display: "flex",
    alignItems: "center",
    cursor: "pointer"

  },
  navLinks: {
    display: "flex",
    gap: "24px"
  },
  navLink: {
    color: "#94a3b8",
    textDecoration: "none",
    fontSize: "14px",
    fontWeight: "500",
    transition: "color 0.2s"
  },
  loginBtn: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    color: "#ffffff",
    padding: "8px 20px",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "background 0.2s"
  },
  heroSection: {
    padding: "100px 20px",
    textAlign: "center",
    background: "radial-gradient(circle at 50% 30%, rgba(99, 102, 241, 0.08), transparent 60%)"
  },
  heroContent: {
    maxWidth: "800px",
    margin: "0 auto"
  },
  heroHeading: {
    fontSize: "48px",
    fontWeight: "800",
    color: "#ffffff",
    lineHeight: "1.2",
    letterSpacing: "-1.5px",
    marginBottom: "20px"
  },
  heroDescription: {
    fontSize: "18px",
    color: "#94a3b8",
    lineHeight: "1.6",
    marginBottom: "40px"
  },
  btnRow: {
    display: "flex",
    justifyContent: "center",
    gap: "16px",
    flexWrap: "wrap"
  },
  primaryBtn: {
    backgroundColor: "#6366f1",
    color: "#ffffff",
    border: "none",
    padding: "12px 30px",
    borderRadius: "10px",
    fontSize: "15px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "transform 0.2s"
  },
  secondaryBtn: {
    backgroundColor: "rgba(255, 255, 255, 0.04)",
    color: "#ffffff",
    border: "1px solid rgba(255, 255, 255, 0.08)",
    padding: "12px 30px",
    borderRadius: "10px",
    fontSize: "15px",
    fontWeight: "600",
    textDecoration: "none",
    display: "inline-block",
    cursor: "pointer",
    transition: "background 0.2s"
  },
  section: {
    padding: "80px 40px",
    maxWidth: "1200px",
    margin: "0 auto",
    borderRadius: "24px",
    marginBottom: "40px"
  },
  sectionHeading: {
    fontSize: "32px",
    fontWeight: "800",
    color: "#ffffff",
    textAlign: "center",
    marginBottom: "48px",
    letterSpacing: "-1px"
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "24px"
  },
  card: {
    backgroundColor: "rgba(30, 41, 59, 0.15)",
    border: "1px solid rgba(255, 255, 255, 0.04)",
    borderRadius: "16px",
    padding: "28px",
    transition: "all 0.2s ease"
  },
  cardIcon: {
    fontSize: "32px",
    marginBottom: "16px",
    display: "block"
  },
  cardTitle: {
    fontSize: "18px",
    fontWeight: "700",
    color: "#ffffff",
    marginBottom: "10px"
  },
  cardText: {
    fontSize: "14px",
    color: "#94a3b8",
    lineHeight: "1.5"
  },
  whyList: {
    maxWidth: "600px",
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    gap: "18px"
  },
  whyItem: {
    fontSize: "16px",
    color: "#cbd5e1"
  },
  statsRow: {
    display: "flex",
    justifyContent: "space-around",
    flexWrap: "wrap",
    gap: "40px"
  },
  statBox: {
    textAlign: "center"
  },
  statCount: {
    fontSize: "48px",
    fontWeight: "800",
    color: "#6366f1"
  },
  statLabel: {
    fontSize: "14px",
    color: "#94a3b8",
    fontWeight: "600",
    marginTop: "8px"
  },
  reviewCard: {
    backgroundColor: "rgba(30, 41, 59, 0.15)",
    border: "1px solid rgba(255, 255, 255, 0.04)",
    borderRadius: "16px",
    padding: "24px"
  },
  stars: {
    color: "#f59e0b",
    marginBottom: "12px",
    fontSize: "14px"
  },
  reviewText: {
    fontSize: "14px",
    color: "#cbd5e1",
    lineHeight: "1.6",
    fontStyle: "italic",
    marginBottom: "16px"
  },
  reviewAuthor: {
    fontSize: "12px",
    color: "#64748b",
    fontWeight: "600"
  },
  ctaSection: {
    padding: "100px 40px",
    textAlign: "center",
    borderTop: "1px solid rgba(255, 255, 255, 0.05)"
  },
  ctaHeading: {
    fontSize: "28px",
    fontWeight: "800",
    color: "#ffffff",
    marginBottom: "32px",
    letterSpacing: "-0.5px"
  },
  footer: {
    borderTop: "1px solid rgba(255, 255, 255, 0.05)",
    padding: "30px 40px"
  },
  footerRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "16px",
    maxWidth: "1200px",
    margin: "0 auto",
    fontSize: "13px",
    color: "#64748b"
  },
  footerLinks: {
    display: "flex",
    gap: "24px"
  },
  footerLink: {
    color: "#64748b",
    textDecoration: "none",
    transition: "color 0.2s"
  } , 
  // Add this inside your styles object:
socialLink: {
    color: "#64748b",
    fontSize: "18px",
    display: "flex",
    alignItems: "center",
    transition: "color 0.2s"
  },

// You might also want to add a hover effect if you wish:
// (Or just keep it as is, and the icons will match your existing color scheme)
scrollNav: {
    display: "flex",
    overflowX: "auto",      // This enables the scroll
    whiteSpace: "nowrap",
    backgroundColor: "#1e293b", // Dark theme to match your app
    padding: "10px 20px",
    gap: "20px",
    scrollbarWidth: "none", // Hides the scrollbar on Firefox
    // ADD THESE LINES TO ADJUST POSITION
    marginTop: "0px", // Adjust this number (e.g., 20px, 40px) to move it lower
    marginBottom: "0px", // Adds space between the bar and the content below
    // Optional: Add a subtle shadow for better visibility
  },
  navItem: {
    color: "#94a3b8",
    fontSize: "14px",
    textDecoration: "none",
    cursor: "pointer",
    padding: "8px 16px",
    borderRadius: "6px",        // Rounds the corners of the fill
    transition: "all 0.2s ease", // Makes the color change smooth  
    color: "#ffffff"    }        // Text color

};

export default LandingPage;