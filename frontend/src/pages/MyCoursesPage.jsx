import { useState, useEffect } from "react";

function MyCoursesPage() {
  // Load courses from localStorage, or fall back to default catalog
  const [courses, setCourses] = useState(() => {
    const saved = localStorage.getItem("student_courses");
    if (saved) return JSON.parse(saved);
    return [
      { id: "CS-402", title: "Advanced Operating Systems", department: "Computer Science", enrolled: true, color: "#818cf8" },
      { id: "CS-406", title: "Design & Analysis of Algorithms", department: "Computer Science", enrolled: true, color: "#38bdf8" },
      { id: "CS-408", title: "Network Security & Cryptography", department: "Information Security", enrolled: true, color: "#a78bfa" },
      { id: "CS-410", title: "Web Application Architectures", department: "Software Engineering", enrolled: false, color: "#f472b6" },
      { id: "CS-412", title: "Machine Learning Foundations", department: "Artificial Intelligence", enrolled: false, color: "#fb7185" }
    ];
  });

  // Persist course enrollment decisions
  useEffect(() => {
    localStorage.setItem("student_courses", JSON.stringify(courses));
  }, [courses]);

  const toggleEnrollment = (id) => {
    setCourses(prev => prev.map(course => {
      if (course.id === id) {
        return { ...course, enrolled: !course.enrolled };
      }
      return course;
    }));
  };

  const enrolledCount = courses.filter(c => c.enrolled).length;

  return (
    <div style={styles.canvas} className="slide-down-panel">
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes customDropFade {
          0% {
            opacity: 0;
            transform: translateY(-24px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .slide-down-panel {
          animation: customDropFade 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .stagger-course {
          opacity: 0;
          animation: customDropFade 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .delay-1 { animation-delay: 0.05s; }
        .delay-2 { animation-delay: 0.1s; }
        .delay-3 { animation-delay: 0.15s; }
        .delay-4 { animation-delay: 0.2s; }
        .delay-5 { animation-delay: 0.25s; }
      `}} />

      <div style={styles.headerRow}>
        <div>
          <h2 style={styles.heading}>Course Registration Terminal</h2>
          <p style={styles.subheading}>Register for core lectures, manage curriculum tracks, and toggle enrollments.</p>
        </div>
        <div style={styles.counterBadge}>
          Active Registrations: {enrolledCount}
        </div>
      </div>

      <div style={styles.grid}>
        {courses.map((course, index) => (
          <div 
            key={course.id} 
            style={styles.card} 
            className={`stagger-course delay-${index + 1}`}
          >
            <div style={styles.cardHeader}>
              <span style={{ ...styles.deptTag, color: course.color, backgroundColor: `${course.color}15` }}>
                {course.department}
              </span>
              <span style={styles.idLabel}>{course.id}</span>
            </div>
            
            <h3 style={styles.courseTitle}>{course.title}</h3>

            <div style={styles.actionArea}>
              <button 
                onClick={() => toggleEnrollment(course.id)}
                style={{
                  ...styles.enrollBtn,
                  backgroundColor: course.enrolled ? "rgba(239, 68, 68, 0.1)" : "rgba(16, 185, 129, 0.1)",
                  color: course.enrolled ? "#ef4444" : "#10b981",
                  border: `1px solid ${course.enrolled ? "rgba(239, 68, 68, 0.2)" : "rgba(16, 185, 129, 0.2)"}`
                }}
              >
                {course.enrolled ? "Drop Course" : "Enroll Now"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  canvas: {
    display: "flex",
    flexDirection: "column",
    gap: "32px",
    width: "100%",
    maxWidth: "1200px",
    margin: "0 auto",
    backgroundColor: "#0b0f19",
    padding: "40px",
    borderRadius: "24px"
  },
  headerRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "16px"
  },
  heading: {
    fontSize: "28px",
    fontWeight: "800",
    margin: "0 0 6px 0",
    letterSpacing: "-0.5px",
    background: "linear-gradient(to right, #ffffff, #cbd5e1)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent"
  },
  subheading: {
    margin: 0,
    fontSize: "14px",
    color: "#94a3b8"
  },
  counterBadge: {
    backgroundColor: "rgba(99, 102, 241, 0.1)",
    border: "1px solid rgba(99, 102, 241, 0.2)",
    color: "#818cf8",
    padding: "10px 18px",
    borderRadius: "12px",
    fontSize: "13px",
    fontWeight: "700"
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
    gap: "24px"
  },
  card: {
    backgroundColor: "rgba(30, 41, 59, 0.15)",
    border: "1px solid rgba(255, 255, 255, 0.04)",
    borderRadius: "20px",
    padding: "24px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    minHeight: "180px"
  },
  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  deptTag: {
    fontSize: "10px",
    fontWeight: "700",
    padding: "4px 8px",
    borderRadius: "6px",
    textTransform: "uppercase",
    letterSpacing: "0.5px"
  },
  idLabel: {
    fontSize: "12px",
    color: "#475569",
    fontWeight: "700"
  },
  courseTitle: {
    fontSize: "16px",
    fontWeight: "700",
    color: "#ffffff",
    margin: "16px 0 24px 0",
    lineHeight: "1.4"
  },
  actionArea: {
    display: "flex",
    justifyContent: "flex-end"
  },
  enrollBtn: {
    padding: "8px 16px",
    borderRadius: "10px",
    fontSize: "12px",
    fontWeight: "700",
    cursor: "pointer",
    transition: "all 0.2s"
  }
};

export default MyCoursesPage;