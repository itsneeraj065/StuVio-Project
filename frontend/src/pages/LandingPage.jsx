import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FaGithub, FaLinkedin, FaInstagram, FaSearch, FaBook, FaDownload, FaGraduationCap } from 'react-icons/fa';

function LandingPage() {
  const navigate = useNavigate();
  const [openDropdown, setOpenDropdown] = useState(null);
  const scrollNavRef = useRef(null);

  // SEARCH SYSTEM STATE
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCollege, setSelectedCollege] = useState("All");
  const [searchFocus, setSearchFocus] = useState(false);
  const searchRef = useRef(null);

  const navCategories = [
    { name: "HTML", slug: "html" },
    { name: "CSS", slug: "css" },
    { name: "JavaScript", slug: "javascript" },
    { name: "Python", slug: "python" },
    { name: "Java", slug: "java" },
    { name: "SQL", slug: "sql" },
    { name: "React", slug: "react" },
    { name: "Node.js", slug: "nodejs" },
    { name: "C++", slug: "cpp" }
  ];

  // COLLEGES & NOTES DATABASE
  const collegeList = ["All", "LNCT", "ORIENTAL", "TIT", "SIRT"];

  const notesDatabase = [
    { id: 1, title: "Data Structures & Algorithms", college: "LNCT", sem: "Sem 3", branch: "CSE", type: "Note", link: "/notes/dsa-lnct.pdf" },
    { id: 2, title: "Operating Systems (RGPV Pattern)", college: "ORIENTAL", sem: "Sem 4", branch: "CSE/IT", type: "PYQ", link: "/notes/os-oriental.pdf" },
    { id: 3, title: "Database Management Systems", college: "TIT", sem: "Sem 4", branch: "CSE", type: "Note", link: "/notes/dbms-tit.pdf" },
    { id: 4, title: "Object Oriented Programming (C++)", college: "LNCT", sem: "Sem 3", branch: "ECE", type: "Lab Manual", link: "/notes/cpp-lnct.pdf" },
    { id: 5, title: "Computer Networks & Security", college: "SIRT", sem: "Sem 5", branch: "CSE", type: "Note", link: "/notes/cn-sirt.pdf" },
    { id: 6, title: "Web Technology (HTML, CSS, JS)", college: "LNCT", sem: "Sem 4", branch: "IT", type: "Note", link: "/notes/webtech-lnct.pdf" }
  ];

  const features = [
    { icon: "📚", title: "Courses Hub", desc: "Access comprehensive syllabus trackers and class lists." },
    { icon: "🎥", title: "Video Lectures", desc: "Stream archived classroom and course screen-recordings." },
    { icon: "📝", title: "College Notes Hub", desc: "Download curated lecture notes & PYQs for LNCT, Oriental, TIT & SIRT." },
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
    { stars: "★★★★★", text: "Finding LNCT specific Mid-Sem paper solutions used to take hours. StuVio has everything sorted by semester!", author: "Arjun Mehta, CSE (LNCT)" },
    { stars: "★★★★★", text: "The combination of live practice playgrounds and college notes in one dashboard is peak convenience.", author: "Priya Sharma, ECE (Oriental)" }
  ];

  // SEARCH FILTER LOGIC
  const filteredSearch = notesDatabase.filter((item) => {
    const matchesCollege = selectedCollege === "All" || item.college === selectedCollege;
    const matchesQuery = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.branch.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.type.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCollege && matchesQuery;
  });

  // CLOSE DROPDOWNS ON OUTSIDE CLICK
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (scrollNavRef.current && !scrollNavRef.current.contains(event.target)) {
        setOpenDropdown(null);
      }
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchFocus(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSubCategoryClick = (type, slug) => {
    setOpenDropdown(null);
    navigate(`/${type}/${slug}`);
  };

  return (
    <div style={styles.container}>
      
      {/* PUBLIC HEADER NAVBAR */}
      <header style={styles.navbar}>
        <div style={styles.logo} onClick={() => navigate("/")}>
          <img src="/logo.png" alt="StuVio Logo" style={{ height: "60px", width: "auto" }} />
        </div>
        
        <nav style={styles.navLinks}>
          <a href="#notes" style={styles.navLink}>College Notes</a>
          <a href="#features" style={styles.navLink}>Features</a>
          <a href="#stats" style={styles.navLink}>Impact</a>
          <a href="#reviews" style={styles.navLink}>Reviews</a>
        </nav>
        
        <button onClick={() => navigate("/login")} style={styles.loginBtn}>Portal Login</button>
      </header>

      {/* SCROLLING CATEGORY NAV WITH DROPDOWNS */}
      <nav style={styles.scrollNav} ref={scrollNavRef}>
        {navCategories.map((item) => (
          <div 
            key={item.slug} 
            style={styles.dropdownContainer}
            onMouseEnter={() => setOpenDropdown(item.slug)}
            onMouseLeave={() => setOpenDropdown(null)}
          >
            <span 
              style={{
                ...styles.navItem,
                backgroundColor: openDropdown === item.slug ? "#6366f1" : "transparent"
              }}
              onClick={() => setOpenDropdown(openDropdown === item.slug ? null : item.slug)}
            >
              {item.name} ▾
            </span>

            {openDropdown === item.slug && (
              <div style={styles.dropdownMenu}>
                <div style={styles.dropdownItem} onClick={() => handleSubCategoryClick("learn", item.slug)}>
                  📖 Learn {item.name}
                </div>
                <div style={styles.dropdownItem} onClick={() => handleSubCategoryClick("practice", item.slug)}>
                  💻 Practice {item.name}
                </div>
                <div style={styles.dropdownItem} onClick={() => handleSubCategoryClick("quiz", item.slug)}>
                  ✏️ {item.name} Quiz
                </div>
              </div>
            )}
          </div>
        ))}
      </nav>

      {/* HERO SECTION WITH DYNAMIC SEARCH */}
      <section style={styles.heroSection}>
        <div style={styles.heroContent}>
          <h1 style={styles.heroHeading}>Student Collaboration & Learning Platform</h1>
          <p style={styles.heroDescription}>
            Access notes according to your college, track schedules, and practice real coding challenges.
          </p>

          {/* SEARCH BAR SYSTEM */}
          <div style={styles.searchWrapper} ref={searchRef}>
            <div style={styles.searchBarContainer}>
              <FaSearch style={styles.searchIcon} />
              <input 
                type="text" 
                placeholder="Search notes, subjects, or branches (e.g., DSA, LNCT, Sem 3)..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setSearchFocus(true)}
                style={styles.searchInput}
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery("")} style={styles.clearSearchBtn}>✕</button>
              )}
            </div>

            {/* LIVE AUTOCOMPLETE DROPDOWN */}
            {searchFocus && (searchQuery.length > 0 || selectedCollege !== "All") && (
              <div style={styles.searchResultsDropdown}>
                <div style={styles.dropdownHeader}>
                  <span>Matching Resources ({filteredSearch.length})</span>
                </div>
                {filteredSearch.length > 0 ? (
                  filteredSearch.map((res) => (
                    <div key={res.id} style={styles.searchResultItem}>
                      <div>
                        <div style={{ fontWeight: "600", color: "#ffffff" }}>{res.title}</div>
                        <div style={{ fontSize: "12px", color: "#94a3b8" }}>
                          <span style={styles.collegeBadge}>{res.college}</span> • {res.branch} • {res.sem}
                        </div>
                      </div>
                      <a href={res.link} download style={styles.downloadSmallBtn}>
                        <FaDownload /> PDF
                      </a>
                    </div>
                  ))
                ) : (
                  <div style={{ padding: "16px", color: "#94a3b8", textAlign: "center" }}>
                    No specific notes found for "{searchQuery}". Try searching DSA, DBMS, or OS.
                  </div>
                )}
              </div>
            )}
          </div>

          <div style={styles.btnRow}>
            <button onClick={() => navigate("/login")} style={styles.primaryBtn}>Get Started</button>
            <a href="#notes" style={styles.secondaryBtn}>Browse College Notes</a>
          </div>
        </div>
      </section>

      {/* COLLEGE-SPECIFIC NOTES SECTION */}
      <section id="notes" style={styles.section}>
        <div style={styles.sectionHeaderFlex}>
          <div>
            <h2 style={{ ...styles.sectionHeading, textAlign: "left", marginBottom: "8px" }}>
              <FaGraduationCap style={{ color: "#6366f1", marginRight: "10px" }} />
              College Specific Notes
            </h2>
            <p style={{ color: "#94a3b8", margin: 0 }}>Filter curated materials according to your institution.</p>
          </div>

          {/* COLLEGE FILTER CHIPS */}
          <div style={styles.collegeFilterGroup}>
            {collegeList.map((clg) => (
              <button
                key={clg}
                onClick={() => setSelectedCollege(clg)}
                style={{
                  ...styles.chipBtn,
                  backgroundColor: selectedCollege === clg ? "#6366f1" : "rgba(30, 41, 59, 0.5)",
                  borderColor: selectedCollege === clg ? "#6366f1" : "rgba(255, 255, 255, 0.1)"
                }}
              >
                {clg}
              </button>
            ))}
          </div>
        </div>

        {/* NOTES GRID */}
        <div style={{ ...styles.grid, marginTop: "30px" }}>
          {filteredSearch.map((note) => (
            <div key={note.id} style={styles.noteCard}>
              <div style={styles.noteCardHeader}>
                <span style={styles.collegeBadge}>{note.college}</span>
                <span style={styles.typeBadge}>{note.type}</span>
              </div>
              <h3 style={styles.noteTitle}>{note.title}</h3>
              <p style={styles.noteDetails}>Branch: {note.branch} | Semester: {note.sem}</p>
              <a href={note.link} download style={styles.downloadFullBtn}>
                <FaDownload style={{ marginRight: "8px" }} /> Download Resource
              </a>
            </div>
          ))}
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
          <div style={styles.whyItem}>⚡ <strong>Modern UI:</strong> Dark-themed, lightning-fast response times, zero lag.</div>
          <div style={styles.whyItem}>📦 <strong>College-Centric:</strong> Dedicated PDF archives for LNCT, Oriental, TIT & SIRT.</div>
          <div style={styles.whyItem}>📊 <strong>Track Progress:</strong> Integrated coding practice and SGPA estimation tools.</div>
          <div style={styles.whyItem}>🔒 <strong>Secure Access:</strong> Authenticated sessions powered by fast security tokens.</div>
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
          <div>© {new Date().getFullYear()} StuVio. Constructed by Neeraj Singh Baghel.</div>
          
          <div style={styles.footerLinks}>
            <a href="#notes" style={styles.footerLink}>Notes</a>
            <a href="#features" style={styles.footerLink}>Features</a>
            
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
  container: { backgroundColor: "#0b0f19", color: "#cbd5e1", minHeight: "100vh", paddingBottom: "80px" },
  navbar: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 40px", borderBottom: "1px solid rgba(255, 255, 255, 0.05)", maxWidth: "1200px", margin: "0 auto" },
  logo: { display: "flex", alignItems: "center", cursor: "pointer" },
  navLinks: { display: "flex", gap: "24px" },
  navLink: { color: "#94a3b8", textDecoration: "none", fontSize: "14px", fontWeight: "500" },
  loginBtn: { backgroundColor: "rgba(255, 255, 255, 0.05)", border: "1px solid rgba(255, 255, 255, 0.1)", color: "#ffffff", padding: "8px 20px", borderRadius: "8px", fontSize: "14px", fontWeight: "600", cursor: "pointer" },
  scrollNav: { display: "flex", overflowX: "visible", backgroundColor: "#1e293b", padding: "10px 20px", gap: "12px", position: "relative", zIndex: 100 },
  dropdownContainer: { position: "relative", display: "inline-block" },
  navItem: { fontSize: "14px", cursor: "pointer", padding: "8px 16px", borderRadius: "6px", color: "#ffffff", display: "inline-block", userSelect: "none" },
  dropdownMenu: { position: "absolute", top: "100%", left: "0", backgroundColor: "#1e293b", border: "1px solid rgba(255, 255, 255, 0.1)", borderRadius: "8px", boxShadow: "0px 8px 16px rgba(0,0,0,0.4)", padding: "8px 0", minWidth: "160px", zIndex: 1000, marginTop: "4px" },
  dropdownItem: { padding: "10px 16px", fontSize: "13px", color: "#cbd5e1", cursor: "pointer", whiteSpace: "nowrap" },
  heroSection: { padding: "80px 20px", textAlign: "center", background: "radial-gradient(circle at 50% 30%, rgba(99, 102, 241, 0.12), transparent 60%)" },
  heroContent: { maxWidth: "800px", margin: "0 auto" },
  heroHeading: { fontSize: "44px", fontWeight: "800", color: "#ffffff", lineHeight: "1.2", letterSpacing: "-1.5px", marginBottom: "16px" },
  heroDescription: { fontSize: "16px", color: "#94a3b8", lineHeight: "1.6", marginBottom: "30px" },
  
  // SEARCH BAR STYLES
  searchWrapper: { position: "relative", maxWidth: "600px", margin: "0 auto 30px auto" },
  searchBarContainer: { display: "flex", alignItems: "center", backgroundColor: "#1e293b", border: "1px solid rgba(255, 255, 255, 0.15)", borderRadius: "12px", padding: "12px 18px" },
  searchIcon: { color: "#6366f1", marginRight: "12px", fontSize: "18px" },
  searchInput: { flex: 1, backgroundColor: "transparent", border: "none", color: "#ffffff", fontSize: "15px", outline: "none" },
  clearSearchBtn: { background: "none", border: "none", color: "#94a3b8", cursor: "pointer", fontSize: "16px" },
  searchResultsDropdown: { position: "absolute", top: "110%", left: 0, right: 0, backgroundColor: "#1e293b", border: "1px solid rgba(255, 255, 255, 0.1)", borderRadius: "12px", boxShadow: "0px 10px 25px rgba(0,0,0,0.5)", zIndex: 1000, maxHeight: "300px", overflowY: "auto", textAlign: "left" },
  dropdownHeader: { padding: "10px 16px", borderBottom: "1px solid rgba(255,255,255,0.05)", fontSize: "12px", color: "#64748b", fontWeight: "600" },
  searchResultItem: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 16px", borderBottom: "1px solid rgba(255,255,255,0.05)" },
  downloadSmallBtn: { backgroundColor: "#6366f1", color: "#fff", textDecoration: "none", padding: "6px 12px", borderRadius: "6px", fontSize: "12px", fontWeight: "600", display: "flex", alignItems: "center", gap: "6px" },

  btnRow: { display: "flex", justifyContent: "center", gap: "16px", flexWrap: "wrap" },
  primaryBtn: { backgroundColor: "#6366f1", color: "#ffffff", border: "none", padding: "12px 30px", borderRadius: "10px", fontSize: "15px", fontWeight: "600", cursor: "pointer" },
  secondaryBtn: { backgroundColor: "rgba(255, 255, 255, 0.04)", color: "#ffffff", border: "1px solid rgba(255, 255, 255, 0.08)", padding: "12px 30px", borderRadius: "10px", fontSize: "15px", fontWeight: "600", textDecoration: "none" },
  
  section: { padding: "60px 40px", maxWidth: "1200px", margin: "0 auto", borderRadius: "24px", marginBottom: "30px" },
  sectionHeading: { fontSize: "30px", fontWeight: "800", color: "#ffffff", textAlign: "center", marginBottom: "20px", letterSpacing: "-1px" },
  sectionHeaderFlex: { display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "20px" },
  collegeFilterGroup: { display: "flex", gap: "10px", flexWrap: "wrap" },
  chipBtn: { color: "#ffffff", border: "1px solid", padding: "8px 16px", borderRadius: "20px", cursor: "pointer", fontSize: "13px", fontWeight: "600" },

  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px" },
  card: { backgroundColor: "rgba(30, 41, 59, 0.15)", border: "1px solid rgba(255, 255, 255, 0.04)", borderRadius: "16px", padding: "24px" },
  cardIcon: { fontSize: "32px", marginBottom: "16px", display: "block" },
  cardTitle: { fontSize: "18px", fontWeight: "700", color: "#ffffff", marginBottom: "8px" },
  cardText: { fontSize: "14px", color: "#94a3b8", lineHeight: "1.5" },

  noteCard: { backgroundColor: "rgba(30, 41, 59, 0.25)", border: "1px solid rgba(255, 255, 255, 0.08)", borderRadius: "16px", padding: "20px", display: "flex", flexDirection: "column", justifyContent: "space-between" },
  noteCardHeader: { display: "flex", justifyContent: "space-between", marginBottom: "12px" },
  collegeBadge: { backgroundColor: "rgba(99, 102, 241, 0.2)", color: "#818cf8", fontSize: "11px", fontWeight: "bold", padding: "4px 8px", borderRadius: "6px" },
  typeBadge: { backgroundColor: "rgba(16, 185, 129, 0.2)", color: "#34d399", fontSize: "11px", fontWeight: "bold", padding: "4px 8px", borderRadius: "6px" },
  noteTitle: { fontSize: "16px", color: "#ffffff", margin: "0 0 8px 0" },
  noteDetails: { fontSize: "12px", color: "#94a3b8", margin: "0 0 16px 0" },
  downloadFullBtn: { backgroundColor: "#1e293b", color: "#ffffff", border: "1px solid rgba(255,255,255,0.1)", padding: "10px", borderRadius: "8px", textDecoration: "none", textAlign: "center", fontSize: "13px", fontWeight: "600", display: "flex", justifyContent: "center", alignItems: "center" },

  whyList: { maxWidth: "600px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "16px" },
  whyItem: { fontSize: "15px", color: "#cbd5e1" },
  statsRow: { display: "flex", justifyContent: "space-around", flexWrap: "wrap", gap: "30px" },
  statBox: { textAlign: "center" },
  statCount: { fontSize: "40px", fontWeight: "800", color: "#6366f1" },
  statLabel: { fontSize: "13px", color: "#94a3b8", fontWeight: "600", marginTop: "4px" },
  reviewCard: { backgroundColor: "rgba(30, 41, 59, 0.15)", border: "1px solid rgba(255, 255, 255, 0.04)", borderRadius: "16px", padding: "20px" },
  stars: { color: "#f59e0b", marginBottom: "10px", fontSize: "14px" },
  reviewText: { fontSize: "13px", color: "#cbd5e1", lineHeight: "1.6", fontStyle: "italic", marginBottom: "12px" },
  reviewAuthor: { fontSize: "12px", color: "#64748b", fontWeight: "600" },
  ctaSection: { padding: "80px 40px", textAlign: "center", borderTop: "1px solid rgba(255, 255, 255, 0.05)" },
  ctaHeading: { fontSize: "26px", fontWeight: "800", color: "#ffffff", marginBottom: "24px" },
  footer: { position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 1000, backgroundColor: "#0b0f19", borderTop: "1px solid rgba(255, 255, 255, 0.1)", padding: "16px 40px" },
  footerRow: { display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px", maxWidth: "1200px", margin: "0 auto", fontSize: "13px", color: "#64748b" },
  footerLinks: { display: "flex", gap: "24px", alignItems: "center" },
  footerLink: { color: "#64748b", textDecoration: "none" },
  socialLink: { color: "#64748b", fontSize: "18px", display: "flex", alignItems: "center" }
};

export default LandingPage;