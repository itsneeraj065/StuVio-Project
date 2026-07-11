import { useState } from "react";
import { useNavigate } from "react-router-dom";

function NotesPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("All");

  // Sample data simulating notes uploaded for the student
  const notesData = [
    {
      id: 1,
      title: "Data Structures & Algorithms - Complete Cheat Sheet",
      subject: "Computer Science",
      fileType: "PDF",
      fileSize: "4.2 MB",
      dateAdded: "June 28, 2026",
      icon: "💻"
    },
    {
      id: 2,
      title: "Linear Algebra & Vector Calculus Lecture Notes",
      subject: "Mathematics",
      fileType: "PDF",
      fileSize: "8.7 MB",
      dateAdded: "July 01, 2026",
      icon: "📐"
    },
    {
      id: 3,
      title: "UI/UX Design Systems & Typography Basics",
      subject: "Design",
      fileType: "ZIP",
      fileSize: "15.4 MB",
      dateAdded: "June 15, 2026",
      icon: "🎨"
    },
    {
      id: 4,
      title: "Database Management Systems (DBMS) SQL Guide",
      subject: "Computer Science",
      fileType: "PDF",
      fileSize: "3.1 MB",
      dateAdded: "July 03, 2026",
      icon: "💾"
    }
  ];

  const subjects = ["All", "Computer Science", "Mathematics", "Design"];

  // Filter logic based on search input and selected filter tab
  const filteredNotes = notesData.filter((note) => {
    const matchesSearch = note.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSubject = selectedSubject === "All" || note.subject === selectedSubject;
    return matchesSearch && matchesSubject;
  });

  return (
    <div style={styles.page}>
      {/* HEADER SECTION */}
      <header style={styles.header}>
        <div>
          <h1 style={styles.title}>Study Notes 📝</h1>
          <p style={styles.subtitle}>
            Access, read, and download all notes uploaded by your instructors.
          </p>
        </div>
        <button style={styles.backButton} onClick={() => navigate("/dashboard")}>
          ← Back to Dashboard
        </button>
      </header>

      {/* SEARCH AND FILTER BAR */}
      <div style={styles.toolbar}>
        <input
          type="text"
          placeholder="Search notes by title..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={styles.searchInput}
        />
        
        <div style={styles.filterGroup}>
          {subjects.map((sub) => (
            <button
              key={sub}
              onClick={() => setSelectedSubject(sub)}
              style={{
                ...styles.filterBtn,
                ...(selectedSubject === sub ? styles.filterBtnActive : {})
              }}
            >
              {sub}
            </button>
          ))}
        </div>
      </div>

      {/* NOTES GRID CONTAINER */}
      {filteredNotes.length > 0 ? (
        <div style={styles.grid}>
          {filteredNotes.map((note) => (
            <div key={note.id} style={styles.card}>
              <div style={styles.cardHeader}>
                <div style={styles.iconBadge}>{note.icon}</div>
                <span style={styles.subjectBadge}>{note.subject}</span>
              </div>
              
              <h3 style={styles.noteTitle}>{note.title}</h3>
              
              <div style={styles.metaRow}>
                <span style={styles.metaText}>📅 {note.dateAdded}</span>
                <span style={styles.metaText}>💾 {note.fileSize} ({note.fileType})</span>
              </div>

              <button 
                style={styles.downloadButton}
                onClick={() => alert(`Starting download for: ${note.title}`)}
              >
                <svg
                  style={{ marginRight: "6px" }}
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" x2="12" y1="15" y2="3" />
                </svg>
                Download Resource
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div style={styles.emptyState}>
          <p style={styles.emptyText}>No study notes found matching your criteria.</p>
        </div>
      )}
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    backgroundColor: "#f8fafc",
    padding: "40px",
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    boxSizing: "border-box"
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: "32px"
  },
  title: {
    fontSize: "30px",
    fontWeight: "800",
    color: "#1e293b",
    margin: "0 0 6px 0"
  },
  subtitle: {
    color: "#64748b",
    fontSize: "15px",
    margin: 0
  },
  backButton: {
    backgroundColor: "#ffffff",
    color: "#64748b",
    border: "1px solid #e2e8f0",
    padding: "10px 16px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "14px",
    transition: "all 0.2s"
  },
  toolbar: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    marginBottom: "32px"
  },
  searchInput: {
    padding: "14px 16px",
    borderRadius: "10px",
    border: "1px solid #e2e8f0",
    fontSize: "15px",
    backgroundColor: "#ffffff",
    width: "100%",
    maxWidth: "400px",
    outline: "none",
    boxSizing: "border-box"
  },
  filterGroup: {
    display: "flex",
    gap: "8px",
    flexWrap: "wrap"
  },
  filterBtn: {
    padding: "8px 16px",
    borderRadius: "20px",
    border: "1px solid #e2e8f0",
    backgroundColor: "#ffffff",
    color: "#64748b",
    fontSize: "13px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.2s"
  },
  filterBtnActive: {
    backgroundColor: "#2563eb",
    borderColor: "#2563eb",
    color: "#ffffff"
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
    gap: "24px"
  },
  card: {
    backgroundColor: "#ffffff",
    border: "1px solid #e2e8f0",
    borderRadius: "14px",
    padding: "24px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    boxShadow: "0 1px 3px rgba(0,0,0,0.02)",
    transition: "transform 0.2s"
  },
  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "16px"
  },
  iconBadge: {
    width: "40px",
    height: "40px",
    backgroundColor: "#f1f5f9",
    borderRadius: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "20px"
  },
  subjectBadge: {
    fontSize: "12px",
    fontWeight: "700",
    color: "#2563eb",
    backgroundColor: "#eff6ff",
    padding: "4px 10px",
    borderRadius: "12px"
  },
  noteTitle: {
    fontSize: "16px",
    fontWeight: "700",
    color: "#1e293b",
    margin: "0 0 12px 0",
    lineHeight: "1.4"
  },
  metaRow: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: "12px",
    color: "#64748b",
    marginBottom: "20px",
    borderTop: "1px dashed #e2e8f0",
    paddingTop: "12px"
  },
  metaText: {
    display: "flex",
    alignItems: "center",
    gap: "4px"
  },
  downloadButton: {
    width: "100%",
    backgroundColor: "#2563eb",
    color: "#ffffff",
    border: "none",
    padding: "12px",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "background-color 0.2s"
  },
  emptyState: {
    textAlign: "center",
    padding: "60px 20px",
    backgroundColor: "#ffffff",
    borderRadius: "12px",
    border: "1px dashed #e2e8f0"
  },
  emptyText: {
    color: "#64748b",
    fontSize: "15px",
    margin: 0
  }
};

export default NotesPage;