import { useState, useEffect } from "react";
import { useApp } from "../context/AppContext";

function DashboardPage() {
  const { user } = useApp();
  
  // Load real assignments from localStorage
  const [assignments, setAssignments] = useState(() => {
    const saved = localStorage.getItem("student_assignments");
    if (saved) return JSON.parse(saved);
    return [
      { id: 1, title: "Operating Systems Thread Sync Lab", subject: "CS-402", dueDate: "Tomorrow, 11:59 PM", status: "Pending" },
      { id: 2, title: "NP-Complete Proof Worksheet", subject: "CS-406", dueDate: "Oct 24, 2026", status: "Pending" },
      { id: 3, title: "RSA Cryptosystem Implementation", subject: "CS-408", dueDate: "Oct 28, 2026", status: "Completed" }
    ];
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskInput, setTaskInput] = useState("");
  const [subjectInput, setSubjectInput] = useState("CS-402");

  // Keep localStorage sync'd with our state
  useEffect(() => {
    localStorage.setItem("student_assignments", JSON.stringify(assignments));
  }, [assignments]);

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!taskInput.trim()) return;
    
    const newAssignment = {
      id: Date.now(),
      title: taskInput,
      subject: subjectInput,
      dueDate: "Set by Professor",
      status: "Pending"
    };

    setAssignments(prev => [newAssignment, ...prev]);
    setTaskInput("");
    setIsModalOpen(false);
  };

  const pendingTasks = assignments.filter(a => a.status === "Pending").length;

  return (
    <div style={styles.canvas} className="slide-down-panel">
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes customDropFade {
          0% { opacity: 0; transform: translateY(-24px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .slide-down-panel { animation: customDropFade 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .stagger-card { opacity: 0; animation: customDropFade 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .delay-1 { animation-delay: 0.1s; }
        .delay-2 { animation-delay: 0.2s; }
        .delay-3 { animation-delay: 0.3s; }

        /* Social Glow Icons Styling */
        .glow-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          color: #94a3b8;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: pointer;
        }

        /* Facebook Glow */
        .glow-icon.facebook:hover {
          color: #1877f2;
          background: rgba(24, 119, 242, 0.1);
          border-color: #1877f2;
          box-shadow: 0 0 20px rgba(24, 119, 242, 0.5);
          transform: translateY(-4px);
        }

        /* Instagram Glow */
        .glow-icon.instagram:hover {
          color: #e1306c;
          background: rgba(225, 48, 108, 0.1);
          border-color: #e1306c;
          box-shadow: 0 0 20px rgba(225, 48, 108, 0.5);
          transform: translateY(-4px);
        }

        /* WhatsApp Glow */
        .glow-icon.whatsapp:hover {
          color: #25d366;
          background: rgba(37, 211, 102, 0.1);
          border-color: #25d366;
          box-shadow: 0 0 20px rgba(37, 211, 102, 0.5);
          transform: translateY(-4px);
        }

        /* Twitter / X Glow */
        .glow-icon.twitter:hover {
          color: #ffffff;
          background: rgba(255, 255, 255, 0.08);
          border-color: #ffffff;
          box-shadow: 0 0 20px rgba(255, 255, 255, 0.6);
          transform: translateY(-4px);
        }
      `}} />
      
      <div style={styles.headerRow}>
        <div style={styles.header}>
          <h2 style={styles.heading}>Welcome back, {user?.name || "Student"}!</h2>
          <p style={styles.subheading}>Here is your academic overview for Semester 4.</p>
        </div>
        <button style={styles.actionButton} onClick={() => setIsModalOpen(true)}>
          + New Task
        </button>
      </div>

      <div style={styles.metricsGrid}>
        {/* Metric 1: CGPA */}
        <div style={styles.statCard} className="stagger-card delay-1">
          <div style={styles.cardInfo}>
            <span style={styles.cardLabel}>Cumulative GPA</span>
            <h3 style={styles.cardValue}>8.77 <span style={styles.outOf}>/ 10</span></h3>
            <p style={styles.cardTrend}>↗ +0.12 from last semester</p>
          </div>
          <div style={styles.radialContainer}>
            <svg style={styles.svgRing}>
              <circle cx="40" cy="40" r="32" style={styles.ringTrack} />
              <circle cx="40" cy="40" r="32" style={{ ...styles.ringProgress, strokeDashoffset: 201 - (201 * 0.877) }} />
            </svg>
            <span style={styles.radialText}>87%</span>
          </div>
        </div>

        {/* Metric 2: Attendance */}
        <div style={styles.statCard} className="stagger-card delay-2">
          <div style={styles.cardInfo}>
            <span style={styles.cardLabel}>Overall Attendance</span>
            <h3 style={styles.cardValue}>91.2%</h3>
            <p style={styles.cardTrend}><span style={{ color: "#10b981" }}>Safe Zone</span> • Min req. 75%</p>
          </div>
          <div style={styles.radialContainer}>
            <svg style={styles.svgRing}>
              <circle cx="40" cy="40" r="32" style={styles.ringTrack} />
              <circle cx="40" cy="40" r="32" style={{ ...styles.ringProgress, stroke: "#10b981", strokeDashoffset: 201 - (201 * 0.912) }} />
            </svg>
            <span style={{ ...styles.radialText, color: "#10b981" }}>91%</span>
          </div>
        </div>

        {/* Metric 3: Assignments */}
        <div style={styles.statCard} className="stagger-card delay-3">
          <div style={styles.cardInfo}>
            <span style={styles.cardLabel}>Pending Assignments</span>
            <h3 style={styles.cardValue}>{pendingTasks} <span style={styles.outOf}>Tasks</span></h3>
            <p style={styles.cardTrend}>⏰ Synced across app routes</p>
          </div>
          <div style={styles.radialContainer}>
            <svg style={styles.svgRing}>
              <circle cx="40" cy="40" r="32" style={styles.ringTrack} />
              <circle cx="40" cy="40" r="32" style={{ ...styles.ringProgress, stroke: "#f59e0b", strokeDashoffset: 201 - (201 * Math.min(pendingTasks / 5, 1)) }} />
            </svg>
            <span style={{ ...styles.radialText, color: "#f59e0b" }}>{pendingTasks}</span>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div style={styles.modalOverlay} onClick={() => setIsModalOpen(false)}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <h3 style={styles.modalTitle}>Add New Academic Task</h3>
            <form onSubmit={handleAddTask} style={styles.modalForm}>
              
              <label style={styles.inputLabel}>Task Name / Description</label>
              <input 
                type="text" 
                placeholder="e.g., Complete Advanced Calculus Assignment 3" 
                value={taskInput}
                onChange={(e) => setTaskInput(e.target.value)}
                style={styles.textInput}
                autoFocus
              />

              <label style={styles.inputLabel}>Course ID</label>
              <select 
                value={subjectInput} 
                onChange={(e) => setSubjectInput(e.target.value)}
                style={styles.selectInput}
              >
                <option value="CS-402">CS-402 (Operating Systems)</option>
                <option value="CS-406">CS-406 (Algorithms)</option>
                <option value="CS-408">CS-408 (Security)</option>
                <option value="CS-410">CS-410 (Web Arch)</option>
              </select>

              <div style={styles.modalActions}>
                <button type="button" style={styles.cancelBtn} onClick={() => setIsModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" style={styles.submitBtn}>
                  Create Assignment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modern Dashboard Footer with Custom SVG Glowing Icons */}
      <footer style={styles.footer}>
        <hr style={styles.divider} />
        <div style={styles.footerRow}>
          <span style={styles.footerText}>© 2026 StuVio. Constructed By Neeraj Singh Baghel.</span>
          <div style={styles.iconContainer}>
  {/* Facebook */}
  <a href="https://facebook.com" target="_blank" rel="noreferrer" className="glow-icon facebook" title="Facebook" style={{ color: "#94a3b8" }}>
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" style={{ display: "block" }}>
      <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z"/>
    </svg>
  </a>

  {/* Instagram */}
  <a href="https://instagram.com" target="_blank" rel="noreferrer" className="glow-icon instagram" title="Instagram" style={{ color: "#94a3b8" }}>
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" style={{ display: "block" }}>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
    </svg>
  </a>

  {/* WhatsApp */}
  <a href="https://whatsapp.com" target="_blank" rel="noreferrer" className="glow-icon whatsapp" title="WhatsApp" style={{ color: "#94a3b8" }}>
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" style={{ display: "block" }}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.372-.025-.52-.075-.149-.67-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.384a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.955c-.003 5.445-4.439 9.88-9.886 9.88z"/>
    </svg>
  </a>

  {/* Twitter */}
  <a href="https://twitter.com" target="_blank" rel="noreferrer" className="glow-icon twitter" title="Twitter" style={{ color: "#94a3b8" }}>
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" style={{ display: "block" }}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  </a>
</div>
        </div>
      </footer>
    </div>
  );
}

const styles = {
  canvas: { display: "flex", flexDirection: "column", gap: "32px", width: "100%", maxWidth: "1200px", margin: "0 auto", backgroundColor: "#0b0f19", padding: "40px", borderRadius: "24px" ,minHeight: "90vh" },
  headerRow: { display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" },
  header: { marginBottom: "8px" },
  heading: { fontSize: "28px", fontWeight: "800", margin: "0 0 6px 0", letterSpacing: "-0.5px", background: "linear-gradient(to right, #ffffff, #cbd5e1)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" },
  subheading: { margin: 0, fontSize: "14px", color: "#94a3b8" },
  actionButton: { backgroundColor: "#6366f1", color: "#ffffff", border: "none", borderRadius: "12px", padding: "12px 20px", fontWeight: "600", cursor: "pointer", transition: "background 0.2s", boxShadow: "0 4px 14px rgba(99, 102, 241, 0.3)" },
  metricsGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "24px" },
  statCard: { backgroundColor: "rgba(30, 41, 59, 0.15)", border: "1px solid rgba(255, 255, 255, 0.04)", borderRadius: "20px", padding: "24px", display: "flex", justifyContent: "space-between", alignItems: "center" },
  cardLabel: { fontSize: "12px", color: "#64748b", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.5px" },
  cardValue: { fontSize: "28px", fontWeight: "800", color: "#ffffff", margin: "8px 0" },
  outOf: { fontSize: "14px", color: "#475569", fontWeight: "500" },
  cardTrend: { margin: 0, fontSize: "12px", color: "#818cf8", fontWeight: "500" },
  radialContainer: { position: "relative", width: "80px", height: "80px" },
  svgRing: { width: "80px", height: "80px", transform: "rotate(-90deg)" },
  ringTrack: { fill: "transparent", stroke: "rgba(255, 255, 255, 0.03)", strokeWidth: "6px" },
  ringProgress: { fill: "transparent", stroke: "#6366f1", strokeWidth: "6px", strokeDasharray: "201", strokeLinecap: "round", transition: "stroke-dashoffset 0.5s ease" },
  radialText: { position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", fontSize: "13px", fontWeight: "700", color: "#818cf8" },
  modalOverlay: { position: "fixed", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(3, 7, 18, 0.8)", backdropFilter: "blur(8px)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 },
  modalContent: { backgroundColor: "#1e293b", border: "1px solid rgba(255, 255, 255, 0.08)", borderRadius: "20px", padding: "32px", width: "100%", maxWidth: "480px", boxShadow: "0 20px 25px -5px rgba(0,0,0,0.5)" },
  modalTitle: { color: "#ffffff", fontSize: "20px", fontWeight: "700", margin: "0 0 20px 0" },
  modalForm: { display: "flex", flexDirection: "column", gap: "16px" },
  inputLabel: { color: "#94a3b8", fontSize: "12px", fontWeight: "600", textTransform: "uppercase" },
  textInput: { backgroundColor: "#0b0f19", border: "1px solid rgba(255, 255, 255, 0.1)", borderRadius: "10px", padding: "12px", color: "#ffffff", fontSize: "14px", outline: "none" },
  selectInput: { backgroundColor: "#0b0f19", border: "1px solid rgba(255, 255, 255, 0.1)", borderRadius: "10px", padding: "12px", color: "#ffffff", fontSize: "14px", outline: "none" },
  modalActions: { display: "flex", justifyContent: "flex-end", gap: "12px", marginTop: "12px" },
  cancelBtn: { backgroundColor: "transparent", border: "none", color: "#94a3b8", padding: "10px 16px", borderRadius: "10px", cursor: "pointer", fontWeight: "600" },
  submitBtn: { backgroundColor: "#6366f1", border: "none", color: "#ffffff", padding: "10px 16px", borderRadius: "10px", cursor: "pointer", fontWeight: "600" },
  
  // Footer Specific Styles
  footer: { marginTop: "auto", display: "flex", flexDirection: "column", gap: "20px", paddingTop: "12px" },
  divider: { border: "none", height: "1px", backgroundColor: "rgba(255, 255, 255, 0.04)" },
  footerRow: { display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" },
  footerText: { fontSize: "12px", color: "#475569" },
  iconContainer: { display: "flex", gap: "12px", alignItems: "center" }
};

export default DashboardPage;