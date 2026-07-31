import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { 
  FaGithub, FaLinkedin, FaInstagram, FaSearch, FaDownload, 
  FaGraduationCap, FaLaptopCode, FaMobileAlt, FaExternalLinkAlt, 
  FaCheckCircle, FaRocket, FaArrowLeft, FaCalculator, FaQuestionCircle, FaChevronDown, FaChevronUp 
} from 'react-icons/fa';

function LandingPage() {
  const navigate = useNavigate();
  const [openDropdown, setOpenDropdown] = useState(null);
  const scrollNavRef = useRef(null);

  // SEARCH SYSTEM STATE
  const [searchQuery, setSearchQuery] = useState("");
  const [searchFocus, setSearchFocus] = useState(false);
  const searchRef = useRef(null);

  // HIERARCHICAL NOTES BROWSER STATE (College -> Courses -> Semester -> Notes)
  const [browseStep, setBrowseStep] = useState("college");
  const [selectedCollege, setSelectedCollege] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedSem, setSelectedSem] = useState(null);

  // HOVER EFFECT STATE FOR COLLEGE CARDS
  const [hoveredCollege, setHoveredCollege] = useState(null);

  // SERVICES & PRICING TAB STATE
  const [activeTab, setActiveTab] = useState("web"); // 'web' | 'app'

  // SGPA CALCULATOR STATES
  const [sgpaMarks, setSgpaMarks] = useState("");
  const [sgpaCredits, setSgpaCredits] = useState("");
  const [calculatedSgpa, setCalculatedSgpa] = useState(null);

  // FAQ ACCORDION STATES
  const [faqSearch, setFaqSearch] = useState("");
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  // HERO SLIDESHOW STATE
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const heroSlides = [
    {
      college: "LNCT",
      fullName: "Lakshmi Narain College of Technology",
      image: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1920&q=80"
    },
    {
      college: "ORIENTAL",
      fullName: "Oriental University & Institute",
      image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1920&q=80"
    },
    {
      college: "TIT",
      fullName: "Technocrats Institute of Technology",
      image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1920&q=80"
    },
    {
      college: "SIRT",
      fullName: "Sagar Institute of Research & Technology",
      image: "https://images.unsplash.com/photo-1592280771190-3e2e4d571952?auto=format&fit=crop&w=1920&q=80"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlideIndex((prevIndex) => (prevIndex + 1) % heroSlides.length);
    }, 2500);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

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

  // HIERARCHICAL NOTES DATABASE STRUCTURE
  const notesDatabase = [
    { id: 1, title: "Data Structures & Algorithms Notes", college: "LNCT", course: "Computer Science & Engineering", sem: "Sem 3", type: "Note", link: "/notes/dsa-lnct.pdf" },
    { id: 2, title: "Operating Systems RGPV PYQ", college: "ORIENTAL", course: "Computer Science & Engineering", sem: "Sem 4", type: "PYQ", link: "/notes/os-oriental.pdf" },
    { id: 3, title: "Database Management Systems Guide", college: "TIT", course: "Information Technology", sem: "Sem 4", type: "Note", link: "/notes/dbms-tit.pdf" },
    { id: 4, title: "Object Oriented Programming Lab Manual", college: "LNCT", course: "Electronics & Communication", sem: "Sem 3", type: "Lab Manual", link: "/notes/cpp-lnct.pdf" },
    { id: 5, title: "Computer Networks & Security", college: "SIRT", course: "Computer Science & Engineering", sem: "Sem 5", type: "Note", link: "/notes/cn-sirt.pdf" },
    { id: 6, title: "Web Technology Core Concepts", college: "LNCT", course: "Information Technology", sem: "Sem 4", type: "Note", link: "/notes/webtech-lnct.pdf" }
  ];

  // COLLEGE LIST METADATA
  const collegeList = [
    { 
      name: "LNCT", 
      fullName: "Lakshmi Narain College of Technology", 
      image: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=800&q=80",
      tag: "Premier Campus"
    },
    { 
      name: "ORIENTAL", 
      fullName: "Oriental University & Institute", 
      image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80",
      tag: "Excellence Hub"
    },
    { 
      name: "TIT", 
      fullName: "Technocrats Institute of Technology", 
      image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=80",
      tag: "Tech Elite"
    },
    { 
      name: "SIRT", 
      fullName: "Sagar Institute of Research & Technology", 
      image: "https://images.unsplash.com/photo-1592280771190-3e2e4d571952?auto=format&fit=crop&w=800&q=80",
      tag: "Innovation Center"
    }
  ];

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

  const faqList = [
    { 
      q: "Are these college notes completely free to download?", 
      a: "Yes! All lecture notes, syllabus trackers, and PYQs uploaded by student coordinators for LNCT, Oriental, TIT, and SIRT are 100% free." 
    },
    { 
      q: "How do I request custom web or mobile app development?", 
      a: "You can check our Services & Pricing section, select your preferred package, and click 'Select Plan' to connect directly with our development team." 
    },
    { 
      q: "Are the PYQs updated according to the latest RGPV / university guidelines?", 
      a: "Yes, our academic coordinators update the question bank at the end of every mid-sem and end-sem examination cycle." 
    },
    { 
      q: "How does the SGPA Calculator work?", 
      a: "Simply input your total earned grade points and total registered credits to get an instant calculation corresponding to standard university CGPA scales." 
    }
  ];

  const filteredFaqs = faqList.filter(item => 
    item.q.toLowerCase().includes(faqSearch.toLowerCase()) || 
    item.a.toLowerCase().includes(faqSearch.toLowerCase())
  );

  const globalFilteredSearch = notesDatabase.filter((item) => {
    return item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
           item.course.toLowerCase().includes(searchQuery.toLowerCase()) ||
           item.college.toLowerCase().includes(searchQuery.toLowerCase()) ||
           item.type.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const getAvailableCourses = () => {
    if (!selectedCollege) return [];
    const courses = notesDatabase
      .filter(item => item.college === selectedCollege)
      .map(item => item.course);
    return [...new Set(courses)];
  };

  const getAvailableSemesters = () => {
    if (!selectedCollege || !selectedCourse) return [];
    const sems = notesDatabase
      .filter(item => item.college === selectedCollege && item.course === selectedCourse)
      .map(item => item.sem);
    return [...new Set(sems)];
  };

  const getAvailableNotes = () => {
    if (!selectedCollege || !selectedCourse || !selectedSem) return [];
    return notesDatabase.filter(
      item => item.college === selectedCollege && 
              item.course === selectedCourse && 
              item.sem === selectedSem
    );
  };

  const handleResetBrowser = () => {
    setBrowseStep("college");
    setSelectedCollege(null);
    setSelectedCourse(null);
    setSelectedSem(null);
    setHoveredCollege(null);
  };

  const handleCalculateSgpa = (e) => {
    e.preventDefault();
    const marks = parseFloat(sgpaMarks);
    const credits = parseFloat(sgpaCredits);
    if (!isNaN(marks) && !isNaN(credits) && credits > 0) {
      const result = ((marks / credits)).toFixed(2);
      setCalculatedSgpa(result);
    }
  };

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

  const activeSlide = heroSlides[currentSlideIndex];

  return (
    <div style={styles.container}>
      
      {/* 1. PUBLIC HEADER NAVBAR */}
      <header style={styles.navbar}>
        <div style={styles.logo} onClick={() => navigate("/")}>
          <img src="/logo.png" alt="StuVio Logo" style={{ height: "50px", width: "auto" }} />
        </div>
        
        <nav style={styles.navLinks}>
          <a href="#notes" style={styles.navLink}>College Notes</a>
          <a href="#calculator" style={styles.navLink}>SGPA Tool</a>
          <a href="#services" style={styles.navLink}>Services</a>
          <a href="#faq" style={styles.navLink}>FAQ</a>
          <a href="#reviews" style={styles.navLink}>Reviews</a>
        </nav>
        
        <button onClick={() => navigate("/login")} style={styles.loginBtn}>Portal Login</button>
      </header>

      {/* 2. SCROLLING CATEGORY NAV WITH DROPDOWNS */}
      <nav style={styles.scrollNav} ref={scrollNavRef}>
        <div style={styles.scrollNavInner}>
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
        </div>
      </nav>

      {/* 3. FULL-WIDTH HERO SECTION */}
      <section style={styles.heroSection}>
        <div style={styles.heroGlassCard}>
          <div style={styles.heroGlassImageWrapper}>
            {heroSlides.map((slide, idx) => (
              <img 
                key={slide.college}
                src={slide.image} 
                alt={slide.college} 
                style={{
                  ...styles.heroSlideImg,
                  opacity: currentSlideIndex === idx ? 1 : 0,
                  transform: currentSlideIndex === idx ? "scale(1)" : "scale(1.05)"
                }} 
              />
            ))}
            <div style={styles.heroGlassOverlay}></div>
            
            <div style={styles.heroBadgeFloating}>
              <span style={styles.liveDot}></span> {activeSlide.college} Campus Hub
            </div>
          </div>

          <div style={styles.heroGlassTextContent}>
            <h1 style={styles.heroHeading}>Student Collaboration & Learning Platform</h1>
            <p style={styles.heroDescription}>
              Access notes for <strong style={{ color: "#ffffff" }}>{activeSlide.fullName}</strong> ({activeSlide.college}), track schedules, and practice real coding challenges.
            </p>

            <div style={styles.searchWrapper} ref={searchRef}>
              <div style={styles.searchBarContainer}>
                <FaSearch style={styles.searchIcon} />
                <input 
                  type="text" 
                  placeholder="Search notes, courses, or colleges (e.g., CSE, LNCT, Sem 3)..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setSearchFocus(true)}
                  style={styles.searchInput}
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery("")} style={styles.clearSearchBtn}>✕</button>
                )}
              </div>

              {searchFocus && searchQuery.length > 0 && (
                <div style={styles.searchResultsDropdown}>
                  <div style={styles.dropdownHeader}>
                    <span>Matching Resources ({globalFilteredSearch.length})</span>
                  </div>
                  {globalFilteredSearch.length > 0 ? (
                    globalFilteredSearch.map((res) => (
                      <div key={res.id} style={styles.searchResultItem}>
                        <div>
                          <div style={{ fontWeight: "600", color: "#ffffff" }}>{res.title}</div>
                          <div style={{ fontSize: "12px", color: "#94a3b8" }}>
                            <span style={styles.collegeBadge}>{res.college}</span> • {res.course} • {res.sem}
                          </div>
                        </div>
                        <a href={res.link} download style={styles.downloadSmallBtn}>
                          <FaDownload /> PDF
                        </a>
                      </div>
                    ))
                  ) : (
                    <div style={{ padding: "16px", color: "#94a3b8", textAlign: "center" }}>
                      No specific notes found for "{searchQuery}". Try searching CSE, LNCT, or OS.
                    </div>
                  )}
                </div>
              )}
            </div>

            <div style={styles.btnRow}>
              <button onClick={() => navigate("/login")} style={styles.primaryBtn}>Get Started</button>
              <a href="#notes" style={styles.secondaryBtn}>Browse College Notes</a>
            </div>

            <div style={styles.slideDotsRow}>
              {heroSlides.map((_, idx) => (
                <button 
                  key={idx}
                  onClick={() => setCurrentSlideIndex(idx)}
                  style={{
                    ...styles.slideDot,
                    backgroundColor: currentSlideIndex === idx ? "#6366f1" : "rgba(255, 255, 255, 0.2)",
                    width: currentSlideIndex === idx ? "28px" : "8px"
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* MAIN SYSTEM CONTAINER WRAPPER FOR FULL-WIDTH ALIGNMENT */}
      <div style={styles.mainContentWrapper}>

        {/* 4. HIERARCHICAL COLLEGE NOTES DIRECTORY */}
        <section id="notes" style={styles.sectionBlock}>
          <div style={styles.sectionHeaderFlex}>
            <div>
              <h2 style={styles.sectionHeadingLeft}>
                <FaGraduationCap style={{ color: "#6366f1", marginRight: "10px" }} />
                College Notes Directory
              </h2>
              <p style={{ color: "#94a3b8", margin: 0, fontSize: "14px" }}>
                {browseStep === "college" && "Step 1: Select your institution"}
                {browseStep === "courses" && `Step 2: Select course/branch for ${selectedCollege}`}
                {browseStep === "semester" && `Step 3: Select semester for ${selectedCourse}`}
                {browseStep === "notes" && `Step 4: Available resources for ${selectedCollege} > ${selectedCourse} > ${selectedSem}`}
              </p>
            </div>

            {browseStep !== "college" && (
              <button onClick={handleResetBrowser} style={styles.backBtn}>
                <FaArrowLeft style={{ marginRight: "6px" }} /> Start Over
              </button>
            )}
          </div>

          {browseStep === "college" && (
            <div style={{ ...styles.collegeImageGrid, marginTop: "24px" }}>
              {collegeList.map((clg) => {
                const isHovered = hoveredCollege === clg.name;
                const isAnyHovered = hoveredCollege !== null;

                return (
                  <div 
                    key={clg.name} 
                    style={{
                      ...styles.collegeImageCard,
                      transform: isHovered ? "scale(1.03)" : isAnyHovered ? "scale(0.98)" : "scale(1)",
                      filter: isAnyHovered && !isHovered ? "blur(3px) brightness(0.6)" : "blur(0px) brightness(1)",
                      opacity: isAnyHovered && !isHovered ? 0.45 : 1,
                      zIndex: isHovered ? 10 : 1,
                      borderColor: isHovered ? "#6366f1" : "rgba(255, 255, 255, 0.08)",
                      boxShadow: isHovered ? "0 12px 35px rgba(99, 102, 241, 0.35)" : "0 4px 20px rgba(0,0,0,0.3)"
                    }}
                    onMouseEnter={() => setHoveredCollege(clg.name)}
                    onMouseLeave={() => setHoveredCollege(null)}
                    onClick={() => {
                      setSelectedCollege(clg.name);
                      setBrowseStep("courses");
                    }}
                  >
                    <div style={styles.collegeImageWrapper}>
                      <img 
                        src={clg.image} 
                        alt={clg.name} 
                        style={{
                          ...styles.collegeBgImg,
                          transform: isHovered ? "scale(1.08)" : "scale(1)"
                        }} 
                      />
                      <div style={styles.collegeImageOverlay}></div>
                      <span style={styles.collegeTagBubble}>{clg.tag}</span>
                    </div>
                    <div style={styles.collegeCardContent}>
                      <h3 style={styles.collegeCardTitle}>{clg.name}</h3>
                      <p style={styles.collegeCardSub}>{clg.fullName}</p>
                      <div style={styles.collegeActionRow}>
                        <span>Explore Curriculum</span>
                        <span style={{
                          ...styles.arrowIconStyle,
                          transform: isHovered ? "translateX(4px)" : "translateX(0)"
                        }}>→</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {browseStep === "courses" && (
            <div style={{ ...styles.grid4Cols, marginTop: "24px" }}>
              {getAvailableCourses().map((course) => (
                <div 
                  key={course} 
                  style={styles.stepCard}
                  onClick={() => {
                    setSelectedCourse(course);
                    setBrowseStep("semester");
                  }}
                >
                  <span style={styles.stepCardIcon}>📚</span>
                  <h3 style={styles.stepCardTitle}>{course}</h3>
                  <p style={styles.stepCardText}>Click to select semester</p>
                </div>
              ))}
            </div>
          )}

          {browseStep === "semester" && (
            <div style={{ ...styles.grid4Cols, marginTop: "24px" }}>
              {getAvailableSemesters().map((sem) => (
                <div 
                  key={sem} 
                  style={styles.stepCard}
                  onClick={() => {
                    setSelectedSem(sem);
                    setBrowseStep("notes");
                  }}
                >
                  <span style={styles.stepCardIcon}>📅</span>
                  <h3 style={styles.stepCardTitle}>{sem}</h3>
                  <p style={styles.stepCardText}>Click to view downloadable notes and PYQs</p>
                </div>
              ))}
            </div>
          )}

          {browseStep === "notes" && (
            <div style={{ ...styles.grid3Cols, marginTop: "24px" }}>
              {getAvailableNotes().length > 0 ? (
                getAvailableNotes().map((note) => (
                  <div key={note.id} style={styles.noteCard}>
                    <div style={styles.noteCardHeader}>
                      <span style={styles.collegeBadge}>{note.college}</span>
                      <span style={styles.typeBadge}>{note.type}</span>
                    </div>
                    <h3 style={styles.noteTitle}>{note.title}</h3>
                    <p style={styles.noteDetails}>Course: {note.course} | {note.sem}</p>
                    <a href={note.link} download style={styles.downloadFullBtn}>
                      <FaDownload style={{ marginRight: "8px" }} /> Download Resource
                    </a>
                  </div>
                ))
              ) : (
                <div style={{ gridColumn: "1 / -1", textAlign: "center", padding: "40px", color: "#94a3b8" }}>
                  No notes available for this path right now.
                </div>
              )}
            </div>
          )}
        </section>

        {/* 5. SGPA CALCULATOR WIDGET SECTION */}
        <section id="calculator" style={styles.sectionBlock}>
          <div style={styles.calcWrapper}>
            <div style={styles.calcHeader}>
              <FaCalculator style={{ color: "#6366f1", fontSize: "28px", marginBottom: "12px" }} />
              <h2 style={styles.sectionHeadingCenter}>Instant SGPA Calculator</h2>
              <p style={{ color: "#94a3b8", fontSize: "14px", maxWidth: "500px", margin: "0 auto" }}>
                Quickly estimate your semester grade point average based on total points and registered credits.
              </p>
            </div>

            <form onSubmit={handleCalculateSgpa} style={styles.calcForm}>
              <div style={styles.inputGroup}>
                <label style={styles.calcLabel}>Total Grade Points Earned</label>
                <input 
                  type="number" 
                  step="any"
                  placeholder="e.g. 85" 
                  value={sgpaMarks} 
                  onChange={(e) => setSgpaMarks(e.target.value)} 
                  style={styles.calcInput}
                  required
                />
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.calcLabel}>Total Course Credits</label>
                <input 
                  type="number" 
                  step="any"
                  placeholder="e.g. 20" 
                  value={sgpaCredits} 
                  onChange={(e) => setSgpaCredits(e.target.value)} 
                  style={styles.calcInput}
                  required
                />
              </div>
              <button type="submit" style={styles.calcSubmitBtn}>Calculate SGPA</button>
            </form>

            {calculatedSgpa !== null && (
              <div style={styles.calcResultBox}>
                <div style={styles.calcResultTitle}>Estimated SGPA Result</div>
                <div style={styles.calcResultValue}>{calculatedSgpa}</div>
              </div>
            )}
          </div>
        </section>

        {/* 6. SERVICES & PRICING SECTION */}
        <section id="services" style={styles.sectionBlock}>
          <div style={styles.headerBox}>
            <span style={styles.badge}>Services & Solutions</span>
            <h2 style={styles.sectionHeadingCenter}>Custom Web & Mobile App Development</h2>
            <p style={styles.subHeading}>
              High-performance, modern digital products engineered for modern businesses.
            </p>
          </div>

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
                  onClick={() => navigate("/login")}
                >
                  <FaRocket style={{ marginRight: "8px" }} /> Select Plan
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* 7. DYNAMIC FEATURES */}
        <section id="features" style={styles.sectionBlock}>
          <h2 style={styles.sectionHeadingCenter}>Engineered for Academic Success</h2>
          <div style={styles.grid3Cols}>
            {features.map((feat, idx) => (
              <div key={idx} style={styles.card}>
                <span style={styles.cardIcon}>{feat.icon}</span>
                <h3 style={styles.cardTitle}>{feat.title}</h3>
                <p style={styles.cardText}>{feat.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 8. WHY STUVIO? */}
        <section style={{ ...styles.sectionBlock, backgroundColor: "rgba(30, 41, 59, 0.2)" }}>
          <h2 style={styles.sectionHeadingCenter}>Why StuVio?</h2>
          <div style={styles.whyList}>
            <div style={styles.whyItem}>⚡ <strong>Modern UI:</strong> Dark-themed, lightning-fast response times, zero lag.</div>
            <div style={styles.whyItem}>📦 <strong>College-Centric:</strong> Dedicated PDF archives for LNCT, Oriental, TIT & SIRT.</div>
            <div style={styles.whyItem}>📊 <strong>Track Progress:</strong> Integrated coding practice and SGPA estimation tools.</div>
            <div style={styles.whyItem}>🔒 <strong>Secure Access:</strong> Authenticated sessions powered by fast security tokens.</div>
          </div>
        </section>

        {/* 9. PLATFORM STATISTICS */}
        <section id="stats" style={styles.sectionBlock}>
          <h2 style={styles.sectionHeadingCenter}>Platform Impact</h2>
          <div style={styles.statsRow}>
            {stats.map((stat, idx) => (
              <div key={idx} style={styles.statBox}>
                <div style={styles.statCount}>{stat.count}</div>
                <div style={styles.statLabel}>{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* 10. INTERACTIVE FAQ SECTION */}
        <section id="faq" style={styles.sectionBlock}>
          <div style={{ textAlign: "center", marginBottom: "30px" }}>
            <FaQuestionCircle style={{ color: "#6366f1", fontSize: "28px", marginBottom: "12px" }} />
            <h2 style={styles.sectionHeadingCenter}>Frequently Asked Questions</h2>
            <p style={{ color: "#94a3b8", fontSize: "14px" }}>Got questions? Search or browse through our common queries.</p>
          </div>

          <div style={styles.faqSearchWrapper}>
            <input 
              type="text" 
              placeholder="Search questions..." 
              value={faqSearch} 
              onChange={(e) => setFaqSearch(e.target.value)}
              style={styles.faqSearchInput}
            />
          </div>

          <div style={styles.faqListContainer}>
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div key={idx} style={styles.faqCard}>
                    <div 
                      style={styles.faqQuestionRow} 
                      onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    >
                      <span style={{ fontWeight: "600", color: "#ffffff", fontSize: "15px" }}>{faq.q}</span>
                      {isOpen ? <FaChevronUp style={{ color: "#6366f1" }} /> : <FaChevronDown style={{ color: "#94a3b8" }} />}
                    </div>
                    {isOpen && (
                      <div style={styles.faqAnswerBox}>
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })
            ) : (
              <div style={{ textAlign: "center", color: "#94a3b8", padding: "20px" }}>
                No FAQs matched your search term.
              </div>
            )}
          </div>
        </section>

        {/* 11. STUDENT REVIEWS */}
        <section id="reviews" style={{ ...styles.sectionBlock, backgroundColor: "rgba(30, 41, 59, 0.2)" }}>
          <h2 style={styles.sectionHeadingCenter}>Scholar Testimonials</h2>
          <div style={styles.grid2Cols}>
            {reviews.map((rev, idx) => (
              <div key={idx} style={styles.reviewCard}>
                <div style={styles.stars}>{rev.stars}</div>
                <p style={styles.reviewText}>"{rev.text}"</p>
                <div style={styles.reviewAuthor}>— {rev.author}</div>
              </div>
            ))}
          </div>
        </section>

        {/* 12. CALL TO ACTION */}
        <section style={styles.ctaSection}>
          <h2 style={styles.ctaHeading}>Ready to optimize your academic cycle?</h2>
          <div style={styles.btnRow}>
            <button onClick={() => navigate("/login")} style={styles.primaryBtn}>Access Workspace Portal</button>
          </div>
        </section>

      </div>

      {/* 13. FOOTER */}
      <footer style={styles.footer}>
        <div style={styles.footerRow}>
          <div>© {new Date().getFullYear()} StuVio. Constructed by Neeraj Singh Baghel.</div>
          
          <div style={styles.footerLinks}>
            <a href="#notes" style={styles.footerLink}>Notes</a>
            <a href="#calculator" style={styles.footerLink}>SGPA Tool</a>
            <a href="#services" style={styles.footerLink}>Services</a>
            <a href="#faq" style={styles.footerLink}>FAQ</a>
            
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
  container: { backgroundColor: "#0b0f19", color: "#cbd5e1", minHeight: "100vh", paddingBottom: "0px", width: "100%", overflowX: "hidden", boxSizing: "border-box" },
  
  // 100% WIDTH SYSTEMIZED WRAPPERS
  mainContentWrapper: { width: "100%", maxWidth: "1320px", margin: "0 auto", padding: "0 24px", boxSizing: "border-box" },
  
  navbar: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 40px", borderBottom: "1px solid rgba(255, 255, 255, 0.05)", width: "100%", boxSizing: "border-box" },
  logo: { display: "flex", alignItems: "center", cursor: "pointer" },
  navLinks: { display: "flex", gap: "24px" },
  navLink: { color: "#94a3b8", textDecoration: "none", fontSize: "14px", fontWeight: "500" },
  loginBtn: { backgroundColor: "rgba(255, 255, 255, 0.05)", border: "1px solid rgba(255, 255, 255, 0.1)", color: "#ffffff", padding: "8px 20px", borderRadius: "8px", fontSize: "14px", fontWeight: "600", cursor: "pointer" },
  
  scrollNav: { width: "100%", backgroundColor: "#1e293b", padding: "10px 40px", overflowX: "auto", position: "relative", zIndex: 100, boxSizing: "border-box", borderBottom: "1px solid rgba(255, 255, 255, 0.05)" },
  scrollNavInner: { display: "flex", gap: "12px", maxWidth: "1320px", margin: "0 auto" },
  dropdownContainer: { position: "relative", display: "inline-block" },
  navItem: { fontSize: "14px", cursor: "pointer", padding: "8px 16px", borderRadius: "6px", color: "#ffffff", display: "inline-block", userSelect: "none" },
  dropdownMenu: { position: "absolute", top: "100%", left: "0", backgroundColor: "#1e293b", border: "1px solid rgba(255, 255, 255, 0.1)", borderRadius: "8px", boxShadow: "0px 8px 16px rgba(0,0,0,0.4)", padding: "8px 0", minWidth: "160px", zIndex: 1000, marginTop: "4px" },
  dropdownItem: { padding: "10px 16px", fontSize: "13px", color: "#cbd5e1", cursor: "pointer", whiteSpace: "nowrap" },
  
  heroSection: { width: "100%", padding: "20px 0 40px 0", boxSizing: "border-box" },
  heroGlassCard: {
    position: "relative",
    width: "100%",
    minHeight: "520px",
    background: "rgba(30, 41, 59, 0.35)",
    backdropFilter: "blur(16px)",
    WebkitBackdropFilter: "blur(16px)",
    borderTop: "1px solid rgba(255, 255, 255, 0.12)",
    borderBottom: "1px solid rgba(255, 255, 255, 0.12)",
    overflow: "hidden",
    boxShadow: "0 20px 50px rgba(0, 0, 0, 0.4)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  heroGlassImageWrapper: { position: "absolute", top: 0, left: 0, width: "100%", height: "100%", zIndex: 1 },
  heroSlideImg: { position: "absolute", top: 0, left: 0, width: "100%", height: "100%", objectFit: "cover", transition: "opacity 0.8s ease-in-out, transform 2.5s ease-in-out" },
  heroGlassOverlay: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0, background: "linear-gradient(to bottom, rgba(11, 15, 25, 0.85), rgba(30, 41, 59, 0.90))", zIndex: 2 },
  heroBadgeFloating: {
    position: "absolute",
    top: "24px",
    right: "30px",
    backgroundColor: "rgba(15, 23, 42, 0.75)",
    backdropFilter: "blur(6px)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    color: "#34d399",
    padding: "8px 16px",
    borderRadius: "20px",
    fontSize: "13px",
    fontWeight: "600",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    zIndex: 4
  },
  liveDot: { width: "8px", height: "8px", backgroundColor: "#34d399", borderRadius: "50%", display: "inline-block", boxShadow: "0 0 8px #34d399" },
  heroGlassTextContent: { position: "relative", zIndex: 3, width: "100%", maxWidth: "900px", padding: "50px 20px", textAlign: "center", boxSizing: "border-box", margin: "0 auto" },
  heroHeading: { fontSize: "44px", fontWeight: "800", color: "#ffffff", lineHeight: "1.2", letterSpacing: "-1.5px", marginBottom: "16px" },
  heroDescription: { fontSize: "17px", color: "#cbd5e1", lineHeight: "1.6", marginBottom: "30px", maxWidth: "700px", margin: "0 auto 30px auto" },
  
  slideDotsRow: { display: "flex", justifyContent: "center", gap: "8px", alignItems: "center", marginTop: "30px" },
  slideDot: { height: "8px", borderRadius: "4px", border: "none", cursor: "pointer", transition: "all 0.3s ease" },

  searchWrapper: { position: "relative", width: "100%", maxWidth: "650px", margin: "0 auto 24px auto" },
  searchBarContainer: { display: "flex", alignItems: "center", backgroundColor: "rgba(15, 23, 42, 0.85)", backdropFilter: "blur(8px)", border: "1px solid rgba(255, 255, 255, 0.2)", borderRadius: "14px", padding: "14px 20px", boxShadow: "0 10px 25px rgba(0,0,0,0.3)" },
  searchIcon: { color: "#6366f1", marginRight: "12px", fontSize: "18px" },
  searchInput: { flex: 1, backgroundColor: "transparent", border: "none", color: "#ffffff", fontSize: "16px", outline: "none" },
  clearSearchBtn: { background: "none", border: "none", color: "#94a3b8", cursor: "pointer", fontSize: "16px" },
  searchResultsDropdown: { position: "absolute", top: "110%", left: 0, right: 0, backgroundColor: "#1e293b", border: "1px solid rgba(255, 255, 255, 0.1)", borderRadius: "12px", boxShadow: "0px 10px 25px rgba(0,0,0,0.5)", zIndex: 1000, maxHeight: "300px", overflowY: "auto", textAlign: "left" },
  dropdownHeader: { padding: "10px 16px", borderBottom: "1px solid rgba(255,255,255,0.05)", fontSize: "12px", color: "#64748b", fontWeight: "600" },
  searchResultItem: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 16px", borderBottom: "1px solid rgba(255,255,255,0.05)" },
  downloadSmallBtn: { backgroundColor: "#6366f1", color: "#fff", textDecoration: "none", padding: "6px 12px", borderRadius: "6px", fontSize: "12px", fontWeight: "600", display: "flex", alignItems: "center", gap: "6px" },

  btnRow: { display: "flex", justifyContent: "center", gap: "16px", flexWrap: "wrap" },
  primaryBtn: { backgroundColor: "#6366f1", color: "#ffffff", border: "none", padding: "12px 30px", borderRadius: "10px", fontSize: "15px", fontWeight: "600", cursor: "pointer" },
  secondaryBtn: { backgroundColor: "rgba(255, 255, 255, 0.08)", color: "#ffffff", border: "1px solid rgba(255, 255, 255, 0.15)", padding: "12px 30px", borderRadius: "10px", fontSize: "15px", fontWeight: "600", textDecoration: "none" },
  
  // STANDARDIZED SECTION BLOCKS
  sectionBlock: { padding: "50px 0", width: "100%", boxSizing: "border-box", borderBottom: "1px solid rgba(255, 255, 255, 0.04)" },
  sectionHeadingLeft: { fontSize: "28px", fontWeight: "800", color: "#ffffff", marginBottom: "8px", letterSpacing: "-1px" },
  sectionHeadingCenter: { fontSize: "30px", fontWeight: "800", color: "#ffffff", textAlign: "center", marginBottom: "16px", letterSpacing: "-1px" },
  sectionHeaderFlex: { display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "20px" },
  backBtn: { backgroundColor: "rgba(99, 102, 241, 0.15)", color: "#818cf8", border: "1px solid rgba(99, 102, 241, 0.3)", padding: "8px 16px", borderRadius: "8px", fontSize: "13px", fontWeight: "600", cursor: "pointer", display: "flex", alignItems: "center" },

  collegeImageGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "24px", width: "100%" },
  collegeImageCard: { backgroundColor: "#1e293b", border: "1px solid", borderRadius: "16px", overflow: "hidden", cursor: "pointer", transition: "transform 0.35s cubic-bezier(0.4, 0, 0.2, 1), filter 0.35s ease, opacity 0.35s ease, box-shadow 0.35s ease" },
  collegeImageWrapper: { position: "relative", height: "180px", overflow: "hidden" },
  collegeBgImg: { width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)" },
  collegeImageOverlay: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0, background: "linear-gradient(to top, rgba(30, 41, 59, 0.95), transparent)" },
  collegeTagBubble: { position: "absolute", top: "12px", right: "12px", backgroundColor: "rgba(99, 102, 241, 0.85)", backdropFilter: "blur(4px)", color: "#ffffff", padding: "4px 10px", borderRadius: "20px", fontSize: "11px", fontWeight: "600", zIndex: 2 },
  collegeCardContent: { padding: "20px" },
  collegeCardTitle: { fontSize: "20px", fontWeight: "700", color: "#ffffff", marginBottom: "4px" },
  collegeCardSub: { fontSize: "13px", color: "#94a3b8", marginBottom: "16px", lineHeight: "1.4" },
  collegeActionRow: { display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "13px", fontWeight: "600", color: "#818cf8", borderTop: "1px solid rgba(255, 255, 255, 0.05)", paddingTop: "12px" },
  arrowIconStyle: { fontSize: "16px", transition: "transform 0.2s ease" },

  grid4Cols: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "20px", width: "100%" },
  grid3Cols: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "20px", width: "100%" },
  grid2Cols: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))", gap: "20px", width: "100%" },

  stepCard: { backgroundColor: "#1e293b", border: "1px solid rgba(255, 255, 255, 0.08)", padding: "24px", borderRadius: "16px", textAlign: "center", cursor: "pointer", transition: "transform 0.2s ease, border-color 0.2s ease" },
  stepCardIcon: { fontSize: "32px", display: "block", marginBottom: "12px" },
  stepCardTitle: { fontSize: "18px", fontWeight: "700", color: "#ffffff", marginBottom: "6px" },
  stepCardText: { fontSize: "13px", color: "#94a3b8" },

  noteCard: { backgroundColor: "#1e293b", border: "1px solid rgba(255, 255, 255, 0.08)", padding: "24px", borderRadius: "16px", display: "flex", flexDirection: "column", justifyContent: "space-between" },
  noteCardHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" },
  collegeBadge: { backgroundColor: "rgba(99, 102, 241, 0.15)", color: "#818cf8", padding: "4px 10px", borderRadius: "6px", fontSize: "12px", fontWeight: "600" },
  typeBadge: { backgroundColor: "rgba(16, 185, 129, 0.15)", color: "#34d399", padding: "4px 10px", borderRadius: "6px", fontSize: "12px", fontWeight: "600" },
  noteTitle: { fontSize: "16px", fontWeight: "700", color: "#ffffff", marginBottom: "8px", lineHeight: "1.4" },
  noteDetails: { fontSize: "13px", color: "#94a3b8", marginBottom: "20px" },
  downloadFullBtn: { backgroundColor: "#6366f1", color: "#ffffff", textDecoration: "none", padding: "10px 16px", borderRadius: "8px", fontSize: "13px", fontWeight: "600", display: "flex", alignItems: "center", justifyContent: "center" },

  calcWrapper: { backgroundColor: "#1e293b", border: "1px solid rgba(255, 255, 255, 0.08)", borderRadius: "20px", padding: "40px", maxWidth: "600px", margin: "0 auto", textAlign: "center" },
  calcHeader: { marginBottom: "30px" },
  calcForm: { display: "flex", flexDirection: "column", gap: "20px", textAlign: "left" },
  inputGroup: { display: "flex", flexDirection: "column", gap: "8px" },
  calcLabel: { fontSize: "13px", fontWeight: "600", color: "#cbd5e1" },
  calcInput: { backgroundColor: "#0b0f19", border: "1px solid rgba(255, 255, 255, 0.15)", borderRadius: "10px", padding: "12px", color: "#ffffff", fontSize: "15px", outline: "none" },
  calcSubmitBtn: { backgroundColor: "#6366f1", color: "#ffffff", border: "none", padding: "14px", borderRadius: "10px", fontSize: "15px", fontWeight: "600", cursor: "pointer", marginTop: "10px" },
  calcResultBox: { marginTop: "30px", padding: "20px", backgroundColor: "rgba(99, 102, 241, 0.1)", borderRadius: "12px", border: "1px solid rgba(99, 102, 241, 0.3)" },
  calcResultTitle: { fontSize: "13px", color: "#818cf8", fontWeight: "600", marginBottom: "6px", textTransform: "uppercase" },
  calcResultValue: { fontSize: "32px", fontWeight: "800", color: "#ffffff" },

  faqSearchWrapper: { maxWidth: "500px", margin: "0 auto 24px auto" },
  faqSearchInput: { width: "100%", backgroundColor: "#1e293b", border: "1px solid rgba(255, 255, 255, 0.1)", borderRadius: "10px", padding: "12px 16px", color: "#ffffff", fontSize: "14px", outline: "none", boxSizing: "border-box" },
  faqListContainer: { maxWidth: "700px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "12px" },
  faqCard: { backgroundColor: "#1e293b", border: "1px solid rgba(255, 255, 255, 0.08)", borderRadius: "12px", overflow: "hidden" },
  faqQuestionRow: { padding: "16px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer" },
  faqAnswerBox: { padding: "0 20px 16px 20px", fontSize: "14px", color: "#94a3b8", lineHeight: "1.6", borderTop: "1px solid rgba(255, 255, 255, 0.05)", paddingTop: "12px" },

  headerBox: { textAlign: "center", marginBottom: "40px" },
  badge: { backgroundColor: "rgba(99, 102, 241, 0.1)", color: "#818cf8", padding: "6px 14px", borderRadius: "20px", fontSize: "12px", fontWeight: "600", textTransform: "uppercase", letterSpacing: "1px" },
  subHeading: { fontSize: "16px", color: "#94a3b8", marginTop: "8px" },

  clientShowcase: { backgroundColor: "#1e293b", border: "1px solid rgba(255, 255, 255, 0.1)", borderRadius: "20px", padding: "30px", marginBottom: "40px", width: "100%", boxSizing: "border-box" },
  showcaseHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", borderBottom: "1px solid rgba(255,255,255,0.05)", paddingBottom: "15px" },
  liveTag: { display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", fontWeight: "600", color: "#34d399" },
  visitSiteBtn: { backgroundColor: "rgba(99, 102, 241, 0.15)", color: "#818cf8", textDecoration: "none", padding: "6px 14px", borderRadius: "8px", fontSize: "12px", fontWeight: "600", display: "flex", alignItems: "center" },
  showcaseBody: { display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "30px", alignItems: "center" },
  projectTitle: { fontSize: "22px", fontWeight: "700", color: "#ffffff", marginBottom: "4px" },
  projectDomain: { fontSize: "13px", color: "#818cf8", marginBottom: "12px", fontWeight: "500" },
  projectDesc: { fontSize: "14px", color: "#94a3b8", lineHeight: "1.6", marginBottom: "20px" },
  techStackRow: { display: "flex", gap: "8px", flexWrap: "wrap" },
  techBadge: { backgroundColor: "rgba(255,255,255,0.05)", color: "#cbd5e1", padding: "4px 10px", borderRadius: "6px", fontSize: "12px", fontWeight: "500" },
  highlightsBox: { backgroundColor: "rgba(15, 23, 42, 0.6)", padding: "20px", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.05)" },
  highlightTitle: { fontSize: "13px", fontWeight: "600", color: "#ffffff", marginBottom: "12px", textTransform: "uppercase", letterSpacing: "0.5px" },
  highlightItem: { display: "flex", alignItems: "center", fontSize: "13px", color: "#cbd5e1", marginBottom: "8px" },

  tabToggleContainer: { display: "flex", justifyContent: "center", gap: "10px", marginBottom: "30px" },
  tabBtn: { border: "1px solid rgba(255, 255, 255, 0.1)", padding: "10px 24px", borderRadius: "10px", fontSize: "14px", fontWeight: "600", cursor: "pointer", display: "flex", alignItems: "center", transition: "all 0.2s ease" },

  pricingGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "24px", width: "100%" },
  priceCard: { backgroundColor: "#1e293b", border: "1px solid", borderRadius: "20px", padding: "30px", position: "relative", display: "flex", flexDirection: "column", justifyContent: "space-between", boxSizing: "border-box" },
  popularBadge: { position: "absolute", top: "-12px", right: "24px", backgroundColor: "#6366f1", color: "#ffffff", padding: "4px 12px", borderRadius: "20px", fontSize: "11px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.5px" },
  planName: { fontSize: "20px", fontWeight: "700", color: "#ffffff", marginBottom: "8px" },
  planDesc: { fontSize: "13px", color: "#94a3b8", marginBottom: "20px", minHeight: "40px" },
  priceRow: { display: "flex", alignItems: "baseline", marginBottom: "24px", borderBottom: "1px solid rgba(255,255,255,0.05)", paddingBottom: "20px" },
  priceAmount: { fontSize: "36px", fontWeight: "800", color: "#ffffff", letterSpacing: "-1px" },
  pricePeriod: { fontSize: "13px", color: "#94a3b8", marginLeft: "6px" },
  featureList: { listStyle: "none", padding: 0, margin: "0 0 30px 0", flex: 1 },
  featureItem: { display: "flex", alignItems: "center", fontSize: "13px", color: "#cbd5e1", marginBottom: "12px" },
  checkIcon: { color: "#10b981", marginRight: "10px", flexShrink: 0 },
  actionBtn: { width: "100%", padding: "12px", borderRadius: "10px", color: "#ffffff", fontSize: "14px", fontWeight: "600", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" },

  card: { backgroundColor: "#1e293b", border: "1px solid rgba(255, 255, 255, 0.08)", padding: "30px 24px", borderRadius: "16px", textAlign: "left" },
  cardIcon: { fontSize: "28px", display: "block", marginBottom: "16px" },
  cardTitle: { fontSize: "18px", fontWeight: "700", color: "#ffffff", marginBottom: "8px" },
  cardText: { fontSize: "14px", color: "#94a3b8", lineHeight: "1.5" },

  whyList: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "20px", marginTop: "24px", width: "100%" },
  whyItem: { backgroundColor: "#1e293b", border: "1px solid rgba(255, 255, 255, 0.08)", padding: "20px", borderRadius: "12px", fontSize: "14px", color: "#cbd5e1", lineHeight: "1.5" },

  statsRow: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "20px", textAlign: "center", marginTop: "24px", width: "100%" },
  statBox: { backgroundColor: "#1e293b", border: "1px solid rgba(255, 255, 255, 0.08)", padding: "30px 20px", borderRadius: "16px" },
  statCount: { fontSize: "36px", fontWeight: "800", color: "#ffffff", marginBottom: "6px" },
  statLabel: { fontSize: "13px", color: "#94a3b8", fontWeight: "500" },

  reviewCard: { backgroundColor: "#1e293b", border: "1px solid rgba(255, 255, 255, 0.08)", padding: "30px", borderRadius: "16px" },
  stars: { color: "#fbbf24", fontSize: "14px", marginBottom: "12px", letterSpacing: "2px" },
  reviewText: { fontSize: "14px", color: "#cbd5e1", fontStyle: "italic", marginBottom: "16px", lineHeight: "1.6" },
  reviewAuthor: { fontSize: "13px", color: "#94a3b8", fontWeight: "600" },

  ctaSection: { padding: "60px 20px", textAlign: "center", background: "radial-gradient(circle at 50% 50%, rgba(99, 102, 241, 0.15), transparent 70%)", width: "100%", boxSizing: "border-box" },
  ctaHeading: { fontSize: "32px", fontWeight: "800", color: "#ffffff", marginBottom: "20px", letterSpacing: "-1px" },

  footer: { borderTop: "1px solid rgba(255, 255, 255, 0.05)", padding: "40px 24px", width: "100%", maxWidth: "1320px", margin: "0 auto", color: "#64748b", fontSize: "13px", boxSizing: "border-box" },
  footerRow: { display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "20px", width: "100%" },
  footerLinks: { display: "flex", gap: "24px", alignItems: "center", flexWrap: "wrap" },
  footerLink: { color: "#94a3b8", textDecoration: "none" },
  socialLink: { color: "#94a3b8", fontSize: "16px", textDecoration: "none" }
};
export default LandingPage;