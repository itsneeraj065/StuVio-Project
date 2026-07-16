import { useState } from "react";

function SchedulePage() {
  const [selectedDay, setSelectedDay] = useState("Monday");

  const timetable = {
    Monday: [
      { id: 1, time: "09:00 AM - 10:30 AM", subject: "CS-402", title: "Advanced Operating Systems", type: "Lecture", room: "Room 301, Block B" },
      { id: 2, time: "11:00 AM - 12:30 PM", subject: "CS-406", title: "Design & Analysis of Algorithms", type: "Lecture", room: "Room 304, Block B" },
      { id: 3, time: "02:00 PM - 04:00 PM", subject: "CS-402-L", title: "Operating Systems Sandbox", type: "Lab Intensive", room: "Lab 3, CS Department" }
    ],
    Tuesday: [
      { id: 1, time: "09:00 AM - 10:30 AM", subject: "CS-408", title: "Network Security & Cryptography", type: "Lecture", room: "Room 202, Block A" },
      { id: 2, time: "11:00 AM - 12:30 PM", subject: "CS-410", title: "Web Application Architectures", type: "Lecture", room: "Room 105, Block C" }
    ],
    Wednesday: [
      { id: 1, time: "09:00 AM - 10:30 AM", subject: "CS-402", title: "Advanced Operating Systems", type: "Lecture", room: "Room 301, Block B" },
      { id: 2, time: "11:00 AM - 01:00 PM", subject: "CS-406-L", title: "Algorithms Design Lab", type: "Lab Intensive", room: "Lab 5, CS Department" },
      { id: 3, time: "03:00 PM - 04:30 PM", subject: "CS-408", title: "Network Security & Cryptography", type: "Lecture", room: "Room 202, Block A" }
    ],
    Thursday: [
      { id: 1, time: "11:00 AM - 12:30 PM", subject: "CS-406", title: "Design & Analysis of Algorithms", type: "Lecture", room: "Room 304, Block B" },
      { id: 2, time: "02:00 PM - 03:30 PM", subject: "CS-410", title: "Web Application Architectures", type: "Lecture", room: "Room 105, Block C" }
    ],
    Friday: [
      { id: 1, time: "09:00 AM - 10:30 AM", subject: "CS-408", title: "Network Security & Cryptography", type: "Lecture", room: "Room 202, Block A" },
      { id: 2, time: "01:30 PM - 03:30 PM", subject: "CS-410-L", title: "Full Stack Development Sandbox", type: "Lab Intensive", room: "Lab 1, CS Department" }
    ]
  };

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const activeClasses = timetable[selectedDay] || [];

  return (
    <div style={styles.canvas}>
      <div style={styles.headerRow}>
        <div>
          <h2 style={styles.heading}>Academic Schedule Planner</h2>
          <p style={styles.subheading}>Coordinate daily lecture blocks, laboratory milestones, and instructional locations.</p>
        </div>

        {/* Day Selector Navigation */}
        <div style={styles.daySelector}>
          {days.map((day) => (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              style={{
                ...styles.dayBtn,
                ...(selectedDay === day ? styles.activeDay : {})
              }}
            >
              {day.substring(0, 3)}
            </button>
          ))}
        </div>
      </div>

      {/* Class Schedule Timeline Card List */}
      <div style={styles.timeline}>
        {activeClasses.map((item, index) => (
          <div key={item.id} style={styles.timelineItem}>
            {/* Left side timing indicator */}
            <div style={styles.timeSection}>
              <span style={styles.clockIcon}>⏰</span>
              <span style={styles.timeText}>{item.time}</span>
            </div>

            {/* Right side course information card */}
            <div style={styles.detailsCard}>
              <div style={styles.cardHeader}>
                <span style={styles.codeTag}>{item.subject}</span>
                <span style={{
                  ...styles.typeTag,
                  color: item.type === "Lab Intensive" ? "#38bdf8" : "#818cf8",
                  backgroundColor: item.type === "Lab Intensive" ? "rgba(56, 189, 248, 0.1)" : "rgba(99, 102, 241, 0.1)"
                }}>
                  {item.type}
                </span>
              </div>
              <h4 style={styles.classTitle}>{item.title}</h4>
              <div style={styles.locationSection}>
                <span style={styles.locationIcon}>📍</span>
                <span style={styles.locationText}>{item.room}</span>
              </div>
            </div>
          </div>
        ))}

        {activeClasses.length === 0 && (
          <div style={styles.emptyState}>No scheduled lecture parameters mapped for this weekday. Enjoy your self-study slot!</div>
        )}
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
    gap: "24px"
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
  daySelector: {
    display: "flex",
    gap: "6px",
    backgroundColor: "rgba(255, 255, 255, 0.02)",
    border: "1px solid rgba(255, 255, 255, 0.04)",
    padding: "4px",
    borderRadius: "12px"
  },
  dayBtn: {
    backgroundColor: "transparent",
    border: "none",
    color: "#64748b",
    padding: "10px 16px",
    borderRadius: "8px",
    fontSize: "12px",
    fontWeight: "700",
    cursor: "pointer",
    transition: "all 0.2s"
  },
  activeDay: {
    backgroundColor: "#6366f1",
    color: "#ffffff"
  },
  timeline: {
    display: "flex",
    flexDirection: "column",
    gap: "20px"
  },
  timelineItem: {
    display: "grid",
    gridTemplateColumns: "250px 1fr",
    gap: "32px",
    alignItems: "center",
    "@media(max-width: 768px)": {
      gridTemplateColumns: "1fr",
      gap: "12px"
    }
  },
  timeSection: {
    display: "flex",
    alignItems: "center",
    gap: "12px"
  },
  clockIcon: {
    fontSize: "18px"
  },
  timeText: {
    color: "#94a3b8",
    fontSize: "14px",
    fontWeight: "600"
  },
  detailsCard: {
    backgroundColor: "rgba(30, 41, 59, 0.15)",
    border: "1px solid rgba(255, 255, 255, 0.04)",
    borderRadius: "16px",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "12px"
  },
  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  codeTag: {
    fontSize: "10px",
    fontWeight: "700",
    color: "#818cf8"
  },
  typeTag: {
    fontSize: "10px",
    fontWeight: "700",
    padding: "3px 8px",
    borderRadius: "6px"
  },
  classTitle: {
    fontSize: "15px",
    fontWeight: "700",
    color: "#ffffff",
    margin: 0
  },
  locationSection: {
    display: "flex",
    alignItems: "center",
    gap: "8px"
  },
  locationIcon: {
    fontSize: "14px"
  },
  locationText: {
    fontSize: "12px",
    color: "#475569",
    fontWeight: "600"
  },
  emptyState: {
    textAlign: "center",
    color: "#475569",
    padding: "40px",
    border: "1px dashed rgba(255, 255, 255, 0.02)",
    borderRadius: "16px"
  }
};

export default SchedulePage;