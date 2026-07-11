import { useState } from "react";

function SchedulePage() {
  const [selectedDay, setSelectedDay] = useState("Monday");

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

  const classes = {
    Monday: [
      { id: 1, time: "09:00 AM - 10:30 AM", subject: "Advanced Data Structures", room: "Lab 3", prof: "Dr. Sharma" },
      { id: 2, time: "11:00 AM - 12:30 PM", subject: "Database Management Systems", room: "Room 402", prof: "Prof. Verma" },
      { id: 3, time: "02:00 PM - 03:30 PM", subject: "Discrete Mathematics", room: "Room 101", prof: "Dr. Joshi" }
    ]
  };

  return (
    <>
      <header style={styles.contentHeader}>
        <h1 style={styles.welcomeTitle}>Class Schedule 🗓️</h1>
        <p style={styles.welcomeSubtitle}>
          Plan your academic week and track upcoming sessions.
        </p>
      </header>

      <div style={styles.dayTabsContainer}>
        {days.map((day) => (
          <button
            key={day}
            onClick={() => setSelectedDay(day)}
            style={{
              ...styles.dayTabButton,
              ...(selectedDay === day ? styles.dayTabButtonActive : {})
            }}
          >
            {day}
          </button>
        ))}
      </div>

      <div style={styles.timelineStack}>
        {classes[selectedDay]?.map((item) => (
          <div key={item.id} style={styles.classCard}>
            <div style={styles.timeBadge}>{item.time}</div>
            <div>
              <h3 style={styles.classSubject}>{item.subject}</h3>
              <div style={styles.classMeta}>
                <span>📍 {item.room}</span>
                <span>•</span>
                <span>👨‍🏫 {item.prof}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

const styles = {
  contentHeader: { marginBottom: "32px" },
  welcomeTitle: { fontSize: "28px", fontWeight: "800", color: "#1e293b", margin: "0 0 6px 0" },
  welcomeSubtitle: { fontSize: "14px", color: "#64748b", margin: 0 },
  dayTabsContainer: { display: "flex", gap: "8px", backgroundColor: "#e2e8f0", padding: "4px", borderRadius: "10px", marginBottom: "20px" },
  dayTabButton: { flex: 1, padding: "10px", border: "none", borderRadius: "8px", backgroundColor: "transparent", cursor: "pointer" },
  dayTabButtonActive: { backgroundColor: "#fff", color: "#2563eb" },
  timelineStack: { display: "flex", flexDirection: "column", gap: "14px" },
  classCard: { display: "flex", gap: "24px", backgroundColor: "#fff", padding: "20px", borderRadius: "14px", border: "1px solid #e2e8f0" },
  timeBadge: { width: "160px", textAlign: "center", backgroundColor: "#eff6ff", color: "#2563eb", padding: "8px 12px", borderRadius: "8px", fontWeight: "700" },
  classSubject: { margin: 0, fontSize: "16px", fontWeight: "700", color: "#1e293b" },
  classMeta: { display: "flex", gap: "12px", fontSize: "13px", color: "#64748b" }
};

export default SchedulePage;