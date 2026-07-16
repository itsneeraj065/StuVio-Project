import { useState } from "react";
import { useApp } from "../context/AppContext";

function AssignmentsPage() {
  const { globalTasks, setGlobalTasks } = useApp();
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newCourse, setNewCourse] = useState("CS-402");
  const [newDeadline, setNewDeadline] = useState("");

  // Move tasks between status gates
  const moveTask = (taskId, nextStatus) => {
    setGlobalTasks(globalTasks.map(task => {
      if (task.id === taskId) {
        return { ...task, status: nextStatus };
      }
      return task;
    }));
  };

  // Add a new task to the system
  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newTask = {
      id: Date.now(),
      title: newTitle,
      course: newCourse,
      deadline: newDeadline || "No deadline set",
      daysLeft: 5, // Simulated default priority
      status: "Pending"
    };

    setGlobalTasks([...globalTasks, newTask]);
    setNewTitle("");
    setNewDeadline("");
    setShowAddForm(false);
  };

  const categories = ["Pending", "In Progress", "Completed"];

  return (
    <div style={styles.canvas}>
      <div style={styles.headerRow}>
        <div>
          <h2 style={styles.heading}>Task & Assignments Terminal</h2>
          <p style={styles.subheading}>Deconstruct project sprints, monitor due milestones, and progress deliverables.</p>
        </div>
        <button 
          onClick={() => setShowAddForm(!showAddForm)} 
          style={styles.addBtn}
        >
          {showAddForm ? "Cancel Creation" : "+ Register New Task"}
        </button>
      </div>

      {/* Task Creation Form Overlay */}
      {showAddForm && (
        <form onSubmit={handleAddTask} style={styles.formContainer}>
          <h4 style={styles.formTitle}>New Project / Homework Parameters</h4>
          <div style={styles.formGrid}>
            <input 
              type="text" 
              placeholder="Task name (e.g., Lab 4 Implementation)" 
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              style={styles.input}
              required
            />
            <select 
              value={newCourse} 
              onChange={(e) => setNewCourse(e.target.value)} 
              style={styles.select}
            >
              <option value="Advanced Operating Systems">Advanced Operating Systems</option>
              <option value="Design & Analysis of Algorithms">Design & Analysis of Algorithms</option>
              <option value="Network Security & Cryptography">Network Security & Cryptography</option>
            </select>
            <input 
              type="text" 
              placeholder="Deadline (e.g., Tomorrow, 11:59 PM)" 
              value={newDeadline}
              onChange={(e) => setNewDeadline(e.target.value)}
              style={styles.input}
            />
            <button type="submit" style={styles.submitBtn}>Inject into Pipeline</button>
          </div>
        </form>
      )}

      {/* Kanban Columns Layout */}
      <div style={styles.board}>
        {categories.map((status) => {
          const statusTasks = globalTasks.filter(t => t.status === status || (status === "In Progress" && t.status === "Ongoing"));
          return (
            <div key={status} style={styles.column}>
              <div style={styles.columnHeader}>
                <h3 style={styles.columnTitle}>{status}</h3>
                <span style={styles.countBadge}>{statusTasks.length}</span>
              </div>

              <div style={styles.taskStack}>
                {statusTasks.map((task) => (
                  <div key={task.id} style={styles.taskCard}>
                    <div style={styles.taskHeader}>
                      <span style={styles.courseTag}>{task.course}</span>
                      <span style={styles.deadlineTag}>{task.deadline}</span>
                    </div>
                    <h4 style={styles.taskTitle}>{task.title}</h4>
                    
                    {/* Directional pipeline moving buttons */}
                    <div style={styles.actionRow}>
                      {status !== "Pending" && (
                        <button 
                          onClick={() => moveTask(task.id, status === "Completed" ? "In Progress" : "Pending")}
                          style={styles.actionBtn}
                        >
                          ◀ Back
                        </button>
                      )}
                      <div style={{ flexGrow: 1 }} />
                      {status !== "Completed" && (
                        <button 
                          onClick={() => moveTask(task.id, status === "Pending" ? "In Progress" : "Completed")}
                          style={{...styles.actionBtn, backgroundColor: "rgba(99, 102, 241, 0.1)", color: "#818cf8"}}
                        >
                          Advance ▶
                        </button>
                      )}
                    </div>
                  </div>
                ))}

                {statusTasks.length === 0 && (
                  <div style={styles.emptyColumnState}>No active sprints here</div>
                )}
              </div>
            </div>
          );
        })}
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
  addBtn: {
    backgroundColor: "rgba(255, 255, 255, 0.03)",
    border: "1px solid rgba(255, 255, 255, 0.05)",
    color: "#ffffff",
    padding: "12px 24px",
    borderRadius: "14px",
    fontSize: "13px",
    fontWeight: "700",
    cursor: "pointer",
    transition: "all 0.2s"
  },
  formContainer: {
    backgroundColor: "rgba(30, 41, 59, 0.15)",
    border: "1px solid rgba(99, 102, 241, 0.2)",
    borderRadius: "20px",
    padding: "24px",
    display: "flex",
    flexDirection: "column",
    gap: "16px"
  },
  formTitle: {
    margin: 0,
    color: "#ffffff",
    fontSize: "14px",
    fontWeight: "700"
  },
  formGrid: {
    display: "grid",
    gridTemplateColumns: "2fr 1.5fr 1.5fr 1fr",
    gap: "14px",
    alignItems: "center",
    "@media(max-width: 800px)": {
      gridTemplateColumns: "1fr"
    }
  },
  input: {
    backgroundColor: "rgba(15, 23, 42, 0.4)",
    border: "1px solid rgba(255, 255, 255, 0.05)",
    borderRadius: "10px",
    color: "#ffffff",
    padding: "12px 16px",
    fontSize: "13px",
    outline: "none"
  },
  select: {
    backgroundColor: "rgba(15, 23, 42, 0.4)",
    border: "1px solid rgba(255, 255, 255, 0.05)",
    borderRadius: "10px",
    color: "#cbd5e1",
    padding: "12px 16px",
    fontSize: "13px",
    outline: "none",
    cursor: "pointer"
  },
  submitBtn: {
    backgroundColor: "#6366f1",
    border: "none",
    color: "#ffffff",
    padding: "12px",
    borderRadius: "10px",
    fontWeight: "700",
    fontSize: "13px",
    cursor: "pointer"
  },
  board: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "24px",
    alignItems: "start",
    "@media(max-width: 900px)": {
      gridTemplateColumns: "1fr"
    }
  },
  column: {
    backgroundColor: "rgba(15, 23, 42, 0.25)",
    border: "1px solid rgba(255, 255, 255, 0.02)",
    borderRadius: "22px",
    padding: "20px"
  },
  columnHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px"
  },
  columnTitle: {
    fontSize: "15px",
    fontWeight: "800",
    color: "#ffffff",
    margin: 0,
    textTransform: "uppercase",
    letterSpacing: "0.5px"
  },
  countBadge: {
    fontSize: "11px",
    fontWeight: "700",
    backgroundColor: "rgba(255, 255, 255, 0.04)",
    color: "#94a3b8",
    padding: "3px 8px",
    borderRadius: "6px"
  },
  taskStack: {
    display: "flex",
    flexDirection: "column",
    gap: "14px"
  },
  taskCard: {
    backgroundColor: "rgba(30, 41, 59, 0.15)",
    border: "1px solid rgba(255, 255, 255, 0.04)",
    borderRadius: "16px",
    padding: "18px",
    display: "flex",
    flexDirection: "column",
    gap: "12px"
  },
  taskHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "10px"
  },
  courseTag: {
    fontSize: "10px",
    fontWeight: "700",
    color: "#818cf8",
    backgroundColor: "rgba(99, 102, 241, 0.1)",
    padding: "3px 6px",
    borderRadius: "5px",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    overflow: "hidden"
  },
  deadlineTag: {
    fontSize: "10px",
    color: "#64748b",
    fontWeight: "600"
  },
  taskTitle: {
    fontSize: "13px",
    fontWeight: "600",
    color: "#ffffff",
    margin: 0,
    lineHeight: "1.4"
  },
  actionRow: {
    display: "flex",
    marginTop: "6px",
    borderTop: "1px solid rgba(255, 255, 255, 0.03)",
    paddingTop: "12px"
  },
  actionBtn: {
    backgroundColor: "transparent",
    border: "none",
    color: "#475569",
    fontSize: "11px",
    fontWeight: "700",
    cursor: "pointer",
    padding: "4px 8px",
    borderRadius: "6px",
    transition: "color 0.2s"
  },
  emptyColumnState: {
    textAlign: "center",
    color: "#475569",
    fontSize: "12px",
    padding: "24px",
    border: "1px dashed rgba(255, 255, 255, 0.02)",
    borderRadius: "12px"
  }
};

export default AssignmentsPage;