import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

function DashboardPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [searchQuery, setSearchQuery] = useState("");

  // 1. DRAGGABLE TIMER STATE
  const [position, setPosition] = useState({ x: 850, y: 150 });
  const [isDragging, setIsDragging] = useState(false);
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  const handleMouseDown = () => setIsDragging(true);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isDragging) return;
      setPosition({ x: e.clientX - 80, y: e.clientY - 20 });
    };
    const handleMouseUp = () => setIsDragging(false);
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

  useEffect(() => {
    let interval;
    if (isTimerRunning && timeLeft > 0) interval = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    else if (timeLeft === 0) setIsTimerRunning(false);
    return () => clearInterval(interval);
  }, [isTimerRunning, timeLeft]);
  const formatTime = (seconds) => `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`;

  // 2. OTHER FEATURES LOGIC
  const [countdownText, setCountdownText] = useState("00h 00m 00s");
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const target = new Date();
      target.setHours(16, 0, 0, 0);
      if (now > target) target.setDate(target.getDate() + 1);
      const diff = target - now;
      const pad = (num) => String(num).padStart(2, "0");
      setCountdownText(`${pad(Math.floor(diff / (1000 * 60 * 60)))}h ${pad(Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)))}m ${pad(Math.floor((diff % (1000 * 60)) / 1000))}s`);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const [note, setNote] = useState(() => localStorage.getItem("stuvio_sticky_note") || "");
  const handleNoteChange = (e) => {
    setNote(e.target.value);
    localStorage.setItem("stuvio_sticky_note", e.target.value);
  };

  const [checklist, setChecklist] = useState([
    { id: 1, text: "Complete Python basics quiz", checked: true },
    { id: 2, text: "Watch UI design system video", checked: false },
    { id: 3, text: "Submit DB architecture draft", checked: false },
    { id: 4, text: "Review JavaScript async logs", checked: false },
  ]);
  const handleToggleCheck = (id) => setChecklist(prev => prev.map(item => item.id === id ? { ...item, checked: !item.checked } : item));
  
  const getMilestoneStatus = (id) => (checklist[id - 1]?.checked ? "completed" : "locked");
  const milestones = [{ id: 1, title: "Fundamentals" }, { id: 2, title: "UI Design" }, { id: 3, title: "Database" }, { id: 4, title: "Async JS" }];
  const checkedCount = checklist.filter(item => item.checked).length;
  const progressPercent = Math.round((checkedCount / checklist.length) * 100);
  const [selectedDate, setSelectedDate] = useState(new Date().getDate());
  const daysInMonth = Array.from({ length: 31 }, (_, i) => i + 1);

  return (
    <div style={styles.dashboardContainer}>
      {/* FLOATING DRAGGABLE TIMER */}
      <div style={{...styles.floatingTimer, left: position.x, top: position.y, cursor: isDragging ? 'grabbing' : 'grab'}} onMouseDown={handleMouseDown}>
        <h3 style={styles.widgetTitle}>Focus Timer</h3>
        <div style={{ textAlign: "center", fontSize: "28px", fontWeight: "800", color: "#2563eb" }}>{formatTime(timeLeft)}</div>
        <button onClick={() => setIsTimerRunning(!isTimerRunning)} style={styles.timerButton}>{isTimerRunning ? "Pause" : "Start"}</button>
      </div>

      <main style={styles.mainContent}>
        <header style={styles.contentHeader}>
          <div style={{ flex: 1 }}>
            <h1 style={styles.welcomeTitle}>Welcome Back 👋</h1>
            <p style={styles.welcomeSubtitle}>Track your learning milestones and manage courses.</p>
          </div>
          <div style={styles.centerSearchGroup}>
            <div style={styles.searchContainer}>
              <input type="text" placeholder="Search courses..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} style={styles.searchInput} />
            </div>
          </div>
          <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}><div style={styles.avatarPlaceholder}>S</div></div>
        </header>

        <div style={styles.statsGrid}>
          <div onClick={() => setActiveTab("courses")} style={{ ...styles.statCard, cursor: "pointer" }}><div style={styles.iconBadge}>📘</div><div><h4 style={styles.statLabel}>Enrolled Courses</h4><p style={styles.statValue}>4 Active</p></div></div>
          <div onClick={() => setActiveTab("assignments")} style={{ ...styles.statCard, cursor: "pointer" }}><div style={styles.iconBadge}>📝</div><div><h4 style={styles.statLabel}>Assignments</h4><p style={styles.statValue}>6 Pending</p></div></div>
          <div onClick={() => setActiveTab("videos")} style={{ ...styles.statCard, cursor: "pointer" }}><div style={styles.iconBadge}>🎥</div><div><h4 style={styles.statLabel}>Videos Watched</h4><p style={styles.statValue}>12 Completed</p></div></div>
        </div>

        <div style={styles.dashboardLayoutContainer}>
          <div style={styles.leftSubColumn}>
            <div style={styles.widgetCard}>
              <h3 style={styles.widgetTitle}>Semester Roadmap</h3>
              <div style={styles.roadmapContainer}>
                {milestones.map((m, index) => (
                  <div key={m.id} style={styles.roadmapStep}>
                    <div style={{...styles.roadNode, backgroundColor: getMilestoneStatus(m.id) === 'completed' ? '#22c55e' : '#e2e8f0'}}>{getMilestoneStatus(m.id) === 'completed' ? '✓' : index + 1}</div>
                    <span style={styles.roadLabel}>{m.title}</span>
                    {index < milestones.length - 1 && <div style={styles.roadLine}></div>}
                  </div>
                ))}
              </div>
            </div>
            <div style={styles.widgetCard}>
              <h3 style={styles.widgetTitle}>Learning Progress</h3>
              <div style={styles.progressBarContainer}><div style={{ ...styles.progressBarFill, width: `${progressPercent}%` }}></div></div>
              <p style={{fontSize: "12px", color: "#64748b", marginTop: "10px"}}>{progressPercent}% Completed • {checkedCount}/{checklist.length} Goals Met</p>
            </div>
            <div style={styles.widgetCard}>
              <h3 style={styles.widgetTitle}>Daily Goal Checklist</h3>
              {checklist.map(item => (
                <label key={item.id} style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer", color: item.checked ? "#94a3b8" : "#1e293b", textDecoration: item.checked ? "line-through" : "none", fontSize: "14px", marginBottom: "8px" }}>
                  <input type="checkbox" checked={item.checked} onChange={() => handleToggleCheck(item.id)} /> {item.text}
                </label>
              ))}
            </div>
            <div style={styles.widgetCard}>
                <h3 style={styles.widgetTitle}>Quick Resources</h3>
                {[{name:"Python Docs", icon:"🐍"}, {name:"UI Design", icon:"🎨"}].map((r,i) => <div key={i} style={styles.resourceItem}><span>{r.icon}</span>{r.name}</div>)}
            </div>
            <div style={styles.widgetCard}>
                <h3 style={styles.widgetTitle}>Motivation</h3>
                <p style={{fontSize: "13px", color: "#475569", fontStyle: "italic"}}>“The secret of getting ahead is getting started.”</p>
            </div>
            <div style={styles.widgetCard}>
                <h3 style={styles.widgetTitle}>Study Streak</h3>
                <div style={{display: "flex", gap: "10px"}}>{['M','T','W','T','F','S','S'].map((d,i) => <div key={i} style={{...styles.streakNode, backgroundColor: i < 5 ? '#2563eb' : '#e2e8f0'}}>{d}</div>)}</div>
            </div>
          </div>

          <div style={styles.rightSubColumn}>
            <div style={styles.widgetCard}>
              <h3 style={styles.widgetTitle}>July 2026</h3>
              <div style={styles.calendarGrid}>{daysInMonth.map(day => <div key={day} onClick={() => setSelectedDate(day)} style={{...styles.calendarDay, ...(selectedDate === day ? styles.calendarDaySelected : {})}}>{day}</div>)}</div>
            </div>
            <div style={styles.widgetCard}>
              <h3 style={styles.widgetTitle}>Upcoming Classes</h3>
              <div style={styles.classItemRow}>
                <div><p style={styles.itemMainText}>Introduction to Python</p><p style={styles.widgetSecondaryText}>Today, 4:00 PM</p><p style={{color: "#ef4444", fontSize: "12px", fontWeight: "700"}}>Starts in: {countdownText}</p></div>
              </div>
            </div>
            <div style={styles.widgetCard}>
              <h3 style={styles.widgetTitle}>Sticky Notepad</h3>
              <textarea value={note} onChange={handleNoteChange} style={styles.stickyTextarea} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

const styles = {
  floatingTimer: { position: "fixed", zIndex: 1000, backgroundColor: "#fff", padding: "16px", borderRadius: "16px", boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)", border: "1px solid #e2e8f0", width: "160px", userSelect: "none" },
  timerButton: { width: "100%", marginTop: "10px", padding: "8px", borderRadius: "8px", border: "none", backgroundColor: "#2563eb", color: "#fff", cursor: "pointer" },
  dashboardContainer: { minHeight: "100vh", backgroundColor: "#f8fafc", fontFamily: '-apple-system, sans-serif', padding: "40px" },
  mainContent: { maxWidth: "1200px", margin: "0 auto" },
  contentHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "32px" },
  centerSearchGroup: { flex: 2, display: "flex", justifyContent: "center" },
  searchContainer: { display: "flex", alignItems: "center", backgroundColor: "#fff", border: "1px solid #cbd5e1", borderRadius: "10px", padding: "0 14px", width: "100%", maxWidth: "400px", height: "40px" },
  searchInput: { border: "none", outline: "none", width: "100%" },
  welcomeTitle: { fontSize: "28px", fontWeight: "800", color: "#1e293b", margin: 0 },
  avatarPlaceholder: { width: "44px", height: "44px", borderRadius: "50%", backgroundColor: "#2563eb", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "700" },
  statsGrid: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px", marginBottom: "32px" },
  statCard: { backgroundColor: "#fff", padding: "20px", borderRadius: "14px", border: "1px solid #f1f5f9", display: "flex", alignItems: "center", gap: "16px" },
  iconBadge: { width: "44px", height: "44px", borderRadius: "10px", background: "#eff6ff", color: "#2563eb", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px" },
  statLabel: { margin: 0, fontSize: "13px", color: "#64748b" },
  statValue: { margin: 0, fontSize: "18px", fontWeight: "700" },
  dashboardLayoutContainer: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" },
  widgetCard: { backgroundColor: "#fff", padding: "24px", borderRadius: "16px", border: "1px solid #e2e8f0", marginBottom: "20px" },
  widgetTitle: { fontSize: "16px", fontWeight: "700", marginBottom: "16px" },
  progressBarContainer: { width: "100%", backgroundColor: "#e2e8f0", height: "10px", borderRadius: "9999px" },
  progressBarFill: { backgroundColor: "#2563eb", height: "100%", borderRadius: "9999px" },
  calendarGrid: { display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "6px" },
  calendarDay: { aspectRatio: "1", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", borderRadius: "6px", cursor: "pointer", background: "#f8fafc" },
  calendarDaySelected: { backgroundColor: "#2563eb", color: "#fff" },
  stickyTextarea: { width: "100%", height: "90px", padding: "10px", borderRadius: "10px", border: "1px solid #cbd5e1" },
  classItemRow: { padding: "12px", backgroundColor: "#f0f9ff", borderRadius: "12px" },
  itemMainText: { margin: 0, fontWeight: "600", fontSize: "14px" },
  leftSubColumn: { display: "flex", flexDirection: "column" },
  rightSubColumn: { display: "flex", flexDirection: "column" },
  roadmapContainer: { display: "flex", justifyContent: "space-between", alignItems: "center" },
  roadmapStep: { display: "flex", flexDirection: "column", alignItems: "center", gap: "8px", position: "relative", flex: 1 },
  roadNode: { width: "30px", height: "30px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: "12px" },
  roadLabel: { fontSize: "10px", color: "#64748b" },
  roadLine: { position: "absolute", top: "15px", left: "60%", width: "100%", height: "2px", backgroundColor: "#e2e8f0" },
  resourceItem: { padding: "8px", backgroundColor: "#f8fafc", borderRadius: "8px", marginBottom: "5px", display: "flex", gap: "10px" },
  streakNode: { width: "30px", height: "30px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: "12px", fontWeight: "bold" }
};

export default DashboardPage;