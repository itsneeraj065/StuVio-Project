import { useState } from "react";

function SubjectsPage() {
  const [selectedSubject, setSelectedSubject] = useState("CS-402");

  const subjectsData = [
    {
      code: "CS-402",
      name: "Advanced Operating Systems",
      credits: 4,
      status: "Active",
      units: [
        { title: "Unit 1: Process Synchronization & Semaphores", status: "Completed", progress: 100 },
        { title: "Unit 2: Distributed Deadlock Detection", status: "Completed", progress: 100 },
        { title: "Unit 3: Multiprocessor & Real-Time Scheduling", status: "Ongoing", progress: 60 },
        { title: "Unit 4: Distributed Shared Memory", status: "Locked", progress: 0 },
        { title: "Unit 5: Failure Recovery & Fault Tolerance", status: "Locked", progress: 0 }
      ]
    },
    {
      code: "CS-406",
      name: "Design & Analysis of Algorithms",
      credits: 4,
      status: "Active",
      units: [
        { title: "Unit 1: Growth of Functions & Recurrence Relations", status: "Completed", progress: 100 },
        { title: "Unit 2: Divide & Conquer and Greedy Paradigms", status: "Completed", progress: 100 },
        { title: "Unit 3: Dynamic Programming (LCS, Knapsack)", status: "Ongoing", progress: 40 },
        { title: "Unit 4: Graph Algorithms (Dijkstra, MST)", status: "Locked", progress: 0 },
        { title: "Unit 5: NP-Completeness & Approximation", status: "Locked", progress: 0 }
      ]
    },
    {
      code: "CS-408",
      name: "Network Security & Cryptography",
      credits: 3,
      status: "Active",
      units: [
        { title: "Unit 1: Classical Encryption Techniques", status: "Completed", progress: 100 },
        { title: "Unit 2: Symmetric Block Ciphers (DES, AES)", status: "Completed", progress: 100 },
        { title: "Unit 3: Asymmetric Cryptography (RSA, ECC)", status: "Ongoing", progress: 10 },
        { title: "Unit 4: Hash Functions & Digital Signatures", status: "Locked", progress: 0 },
        { title: "Unit 5: System Security (IPSec, Firewalls)", status: "Locked", progress: 0 }
      ]
    }
  ];

  const activeSubject = subjectsData.find(s => s.code === selectedSubject);

  return (
    <div style={styles.canvas}>
      <div style={styles.header}>
        <h2 style={styles.heading}>Course Subjects Matrix</h2>
        <p style={styles.subheading}>Deconstruct academic subjects into core syllabus blocks, check milestone goals, and inspect laboratory items.</p>
      </div>

      <div style={styles.splitLayout}>
        {/* Subject Selector Sidebar (Inside Content Area) */}
        <div style={styles.subjectListColumn}>
          <h3 style={styles.columnTitle}>Core Catalog</h3>
          <div style={styles.subStack}>
            {subjectsData.map((sub) => {
              const isSelected = sub.code === selectedSubject;
              return (
                <div
                  key={sub.code}
                  onClick={() => setSelectedSubject(sub.code)}
                  style={{
                    ...styles.subSelectorCard,
                    backgroundColor: isSelected ? "rgba(99, 102, 241, 0.12)" : "rgba(15, 23, 42, 0.2)",
                    borderColor: isSelected ? "#6366f1" : "rgba(255, 255, 255, 0.04)"
                  }}
                >
                  <span style={styles.codeBadge}>{sub.code}</span>
                  <div style={{ ...styles.subTitleText, color: isSelected ? "#ffffff" : "#cbd5e1" }}>
                    {sub.name}
                  </div>
                  <div style={styles.creditsLabel}>{sub.credits} Academic Credits</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Subject Units Inspector */}
        <div style={styles.syllabusInspectorColumn}>
          <div style={styles.inspectorHeader}>
            <div>
              <span style={styles.instructorTag}>Course Breakdown</span>
              <h3 style={styles.inspectorTitle}>{activeSubject.name}</h3>
            </div>
          </div>

          <div style={styles.unitList}>
            {activeSubject.units.map((unit, index) => (
              <div key={index} style={styles.unitCard}>
                <div style={styles.unitHeaderRow}>
                  <span style={styles.unitTitleText}>{unit.title}</span>
                  <span style={{
                    ...styles.statusBadge,
                    color: unit.status === "Completed" ? "#10b981" : unit.status === "Ongoing" ? "#38bdf8" : "#64748b",
                    backgroundColor: unit.status === "Completed" ? "rgba(16, 185, 129, 0.1)" : unit.status === "Ongoing" ? "rgba(56, 189, 248, 0.1)" : "rgba(255, 255, 255, 0.02)"
                  }}>
                    {unit.status}
                  </span>
                </div>

                {unit.progress > 0 && (
                  <div style={styles.progressRow}>
                    <div style={styles.progressBarTrack}>
                      <div style={{ ...styles.progressBarFill, width: `${unit.progress}%` }} />
                    </div>
                    <span style={styles.percentageText}>{unit.progress}% Ready</span>
                  </div>
                )}
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
  splitLayout: {
    display: "grid",
    gridTemplateColumns: "1fr 1.6fr",
    gap: "28px",
    alignItems: "start",
    "@media(max-width: 900px)": {
      gridTemplateColumns: "1fr"
    }
  },
  subjectListColumn: {
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
  subStack: {
    display: "flex",
    flexDirection: "column",
    gap: "12px"
  },
  subSelectorCard: {
    border: "1px solid",
    borderRadius: "14px",
    padding: "18px",
    cursor: "pointer",
    transition: "all 0.2s",
    display: "flex",
    flexDirection: "column",
    gap: "8px"
  },
  codeBadge: {
    fontSize: "10px",
    fontWeight: "700",
    color: "#818cf8",
    backgroundColor: "rgba(99, 102, 241, 0.12)",
    padding: "3px 8px",
    borderRadius: "5px",
    alignSelf: "flex-start"
  },
  subTitleText: {
    fontSize: "14px",
    fontWeight: "700",
    lineHeight: "1.4"
  },
  creditsLabel: {
    fontSize: "11px",
    color: "#475569",
    fontWeight: "600"
  },
  syllabusInspectorColumn: {
    backgroundColor: "rgba(30, 41, 59, 0.15)",
    border: "1px solid rgba(255, 255, 255, 0.04)",
    borderRadius: "22px",
    padding: "28px"
  },
  inspectorHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
    paddingBottom: "20px",
    marginBottom: "24px"
  },
  instructorTag: {
    fontSize: "11px",
    color: "#818cf8",
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: "0.5px"
  },
  inspectorTitle: {
    fontSize: "20px",
    fontWeight: "800",
    color: "#ffffff",
    marginTop: "6px"
  },
  unitList: {
    display: "flex",
    flexDirection: "column",
    gap: "14px"
  },
  unitCard: {
    backgroundColor: "rgba(15, 23, 42, 0.3)",
    border: "1px solid rgba(255, 255, 255, 0.02)",
    borderRadius: "14px",
    padding: "18px"
  },
  unitHeaderRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "16px"
  },
  unitTitleText: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#cbd5e1"
  },
  statusBadge: {
    fontSize: "10px",
    fontWeight: "700",
    padding: "4px 10px",
    borderRadius: "6px",
    whiteSpace: "nowrap"
  },
  progressRow: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginTop: "14px"
  },
  progressBarTrack: {
    flex: 1,
    height: "5px",
    backgroundColor: "rgba(255, 255, 255, 0.03)",
    borderRadius: "3px",
    overflow: "hidden"
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: "#6366f1",
    borderRadius: "3px"
  },
  percentageText: {
    fontSize: "11px",
    color: "#94a3b8",
    fontWeight: "600",
    minWidth: "50px",
    textAlign: "right"
  }
};

export default SubjectsPage;