import { useState } from "react";

function SemestersPage() {
  const [selectedSem, setSelectedSem] = useState("Semester 4");

  const semesterData = [
    { name: "Semester 1", sgpa: "8.50", status: "Completed", subjects: ["Mathematics-I", "Engineering Physics", "Basic Electrical Eng."] },
    { name: "Semester 2", sgpa: "8.65", status: "Completed", subjects: ["Mathematics-II", "Engineering Chemistry", "Programming in C"] },
    { name: "Semester 3", sgpa: "9.10", status: "Completed", subjects: ["Data Structures", "Digital Logic Design", "Discrete Mathematics"] },
    { name: "Semester 4", sgpa: "8.84", status: "Ongoing", subjects: ["Advanced Operating Systems", "Design & Analysis of Algorithms", "Network Security & Cryptography", "Web Application Architectures"] }
  ];

  const currentSem = semesterData.find(s => s.name === selectedSem);

  return (
    <div style={styles.canvas}>
      <div style={styles.header}>
        <h2 style={styles.heading}>Semester Tracking Terminal</h2>
        <p style={styles.subheading}>Monitor historical SGPA milestones, cumulative credits, and ongoing academic terms.</p>
      </div>

      {/* Degree Progress Banner */}
      <div style={styles.progressCard}>
        <div style={styles.progressInfo}>
          <span style={styles.progressTitle}>B.Tech Degree Completion Progress</span>
          <span style={styles.progressPercentage}>50% Complete</span>
        </div>
        <div style={styles.track}>
          <div style={styles.bar} />
        </div>
        <div style={styles.metricsRow}>
          <div style={styles.metricItem}>
            <span style={styles.metricLabel}>Cumulative CGPA</span>
            <span style={styles.metricVal}>8.77 / 10</span>
          </div>
          <div style={styles.metricItem}>
            <span style={styles.metricLabel}>Completed Credits</span>
            <span style={styles.metricVal}>76 / 152</span>
          </div>
          <div style={styles.metricItem}>
            <span style={styles.metricLabel}>Target CGPA</span>
            <span style={styles.metricVal}>9.00 Max</span>
          </div>
        </div>
      </div>

      <div style={styles.splitLayout}>
        {/* Semester Selection List */}
        <div style={styles.listColumn}>
          <h3 style={styles.columnTitle}>Academic Terms</h3>
          <div style={styles.termStack}>
            {semesterData.map((sem) => {
              const isSelected = sem.name === selectedSem;
              return (
                <div
                  key={sem.name}
                  onClick={() => setSelectedSem(sem.name)}
                  style={{
                    ...styles.termCard,
                    backgroundColor: isSelected ? "rgba(99, 102, 241, 0.12)" : "rgba(15, 23, 42, 0.2)",
                    borderColor: isSelected ? "#6366f1" : "rgba(255, 255, 255, 0.04)"
                  }}
                >
                  <div style={styles.termHeader}>
                    <span style={{ ...styles.termName, color: isSelected ? "#ffffff" : "#cbd5e1" }}>{sem.name}</span>
                    <span style={{
                      ...styles.statusBadge,
                      color: sem.status === "Ongoing" ? "#38bdf8" : "#10b981",
                      backgroundColor: sem.status === "Ongoing" ? "rgba(56, 189, 248, 0.1)" : "rgba(16, 185, 129, 0.1)"
                    }}>
                      {sem.status}
                    </span>
                  </div>
                  <div style={styles.termDetails}>
                    <span style={styles.metricLabel}>SGPA:</span>
                    <span style={styles.termSgpa}>{sem.sgpa || "Pending Evaluation"}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Semester Details View */}
        <div style={styles.detailsColumn}>
          <h3 style={styles.columnTitle}>{selectedSem} Subject Matrix</h3>
          <p style={styles.detailSub}>Curriculum structure and course syllabus registration keys for this term.</p>
          
          <div style={styles.subjectStack}>
            {currentSem.subjects.map((sub, idx) => (
              <div key={idx} style={styles.subjectItem}>
                <div style={styles.subjectIcon}>⚛️</div>
                <div>
                  <div style={styles.subjectTitle}>{sub}</div>
                  <div style={styles.subjectMeta}>Course Module Unit — Track Certified</div>
                </div>
              </div>
            ))}
          </div>
        </div>
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
  header: {
    marginBottom: "8px"
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
  progressCard: {
    backgroundColor: "rgba(30, 41, 59, 0.15)",
    border: "1px solid rgba(255, 255, 255, 0.04)",
    borderRadius: "20px",
    padding: "28px",
    display: "flex",
    flexDirection: "column",
    gap: "16px"
  },
  progressInfo: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  progressTitle: {
    fontSize: "15px",
    fontWeight: "700",
    color: "#ffffff"
  },
  progressPercentage: {
    fontSize: "13px",
    fontWeight: "600",
    color: "#818cf8"
  },
  track: {
    height: "8px",
    backgroundColor: "rgba(255, 255, 255, 0.03)",
    borderRadius: "4px",
    overflow: "hidden"
  },
  bar: {
    height: "100%",
    backgroundColor: "#6366f1",
    width: "50%",
    borderRadius: "4px"
  },
  metricsRow: {
    display: "flex",
    justifyContent: "space-between",
    borderTop: "1px solid rgba(255, 255, 255, 0.04)",
    paddingTop: "20px",
    flexWrap: "wrap",
    gap: "16px"
  },
  metricItem: {
    display: "flex",
    flexDirection: "column",
    gap: "4px"
  },
  metricLabel: {
    fontSize: "11px",
    color: "#475569",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    fontWeight: "700"
  },
  metricVal: {
    fontSize: "16px",
    fontWeight: "700",
    color: "#cbd5e1"
  },
  splitLayout: {
    display: "grid",
    gridTemplateColumns: "1fr 1.5fr",
    gap: "28px",
    alignItems: "start",
    "@media(max-width: 850px)": {
      gridTemplateColumns: "1fr"
    }
  },
  listColumn: {
    backgroundColor: "rgba(30, 41, 59, 0.15)",
    border: "1px solid rgba(255, 255, 255, 0.04)",
    borderRadius: "22px",
    padding: "24px"
  },
  columnTitle: {
    fontSize: "18px",
    fontWeight: "700",
    color: "#ffffff",
    marginBottom: "20px"
  },
  termStack: {
    display: "flex",
    flexDirection: "column",
    gap: "12px"
  },
  termCard: {
    border: "1px solid",
    borderRadius: "14px",
    padding: "16px",
    cursor: "pointer",
    transition: "all 0.2s"
  },
  termHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  termName: {
    fontSize: "14px",
    fontWeight: "700"
  },
  statusBadge: {
    fontSize: "11px",
    fontWeight: "600",
    padding: "3px 8px",
    borderRadius: "6px"
  },
  termDetails: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "12px"
  },
  termSgpa: {
    fontSize: "13px",
    fontWeight: "600",
    color: "#cbd5e1"
  },
  detailsColumn: {
    backgroundColor: "rgba(30, 41, 59, 0.15)",
    border: "1px solid rgba(255, 255, 255, 0.04)",
    borderRadius: "22px",
    padding: "28px"
  },
  detailSub: {
    fontSize: "13px",
    color: "#64748b",
    marginTop: "4px",
    marginBottom: "24px"
  },
  subjectStack: {
    display: "flex",
    flexDirection: "column",
    gap: "14px"
  },
  subjectItem: {
    display: "flex",
    gap: "16px",
    alignItems: "center",
    backgroundColor: "rgba(15, 23, 42, 0.3)",
    border: "1px solid rgba(255, 255, 255, 0.02)",
    padding: "16px",
    borderRadius: "14px"
  },
  subjectIcon: {
    fontSize: "20px"
  },
  subjectTitle: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#ffffff"
  },
  subjectMeta: {
    fontSize: "11px",
    color: "#475569",
    marginTop: "4px",
    fontWeight: "500"
  }
};

export default SemestersPage;