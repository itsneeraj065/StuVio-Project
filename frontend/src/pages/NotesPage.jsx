import { useState, useEffect } from "react";

function NotesPage() {
  // Load notes from localStorage or default to your core exam notes
  const [notes, setNotes] = useState(() => {
    const saved = localStorage.getItem("student_notes");
    if (saved) return JSON.parse(saved);
    return [
      {
        id: 1,
        title: "Mutual Exclusion & Peterson's Algorithm",
        subject: "CS-402",
        date: "July 12, 2026",
        content: "Peterson's algorithm is a concurrent programming algorithm for mutual exclusion that allows two processes to share a single-use resource without conflict.\n\nKey requirements met:\n1. Mutual Exclusion: Yes\n2. Progress: Yes\n3. Bounded Waiting: Yes\n\nCode representation relies on shared flags and a turn variable."
      },
      {
        id: 2,
        title: "Asymmetric Key Math (RSA Algorithm)",
        subject: "CS-408",
        date: "July 15, 2026",
        content: "RSA security depends on the mathematical difficulty of factoring large prime numbers.\n\nSteps:\n1. Select two prime numbers, p and q.\n2. Compute n = p * q.\n3. Compute phi(n) = (p - 1) * (q - 1).\n4. Choose public exponent e.\n5. Compute private key d."
      }
    ];
  });

  const [selectedNoteId, setSelectedNoteId] = useState(() => {
    return notes.length > 0 ? notes[0].id : null;
  });

  // Editor states
  const [editingTitle, setEditingTitle] = useState("");
  const [editingContent, setEditingContent] = useState("");
  const [editingSubject, setEditingSubject] = useState("CS-402");

  // Keep localStorage continuously updated with latest logs
  useEffect(() => {
    localStorage.setItem("student_notes", JSON.stringify(notes));
  }, [notes]);

  // Safely sync editor input states when a new card is selected
  useEffect(() => {
    const activeNote = notes.find(n => n.id === selectedNoteId);
    if (activeNote) {
      setEditingTitle(activeNote.title);
      setEditingContent(activeNote.content);
      setEditingSubject(activeNote.subject);
    } else {
      setEditingTitle("");
      setEditingContent("");
      setEditingSubject("CS-402");
    }
  }, [selectedNoteId]);

  // Keystroke Auto-Save: updates active note in real-time
  const updateActiveNoteField = (field, value) => {
    if (field === "title") setEditingTitle(value);
    if (field === "content") setEditingContent(value);
    if (field === "subject") setEditingSubject(value);

    setNotes(prevNotes => prevNotes.map(n => {
      if (n.id === selectedNoteId) {
        return {
          ...n,
          [field]: value
        };
      }
      return n;
    }));
  };

  // Create a brand new blank note draft
  const handleNewNote = () => {
    const newId = notes.length > 0 ? Math.max(...notes.map(n => n.id)) + 1 : 1;
    const blankNote = {
      id: newId,
      title: "Untitled Quick Note",
      subject: "CS-402",
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      content: "Start writing your notes here..."
    };
    
    setNotes([blankNote, ...notes]);
    setSelectedNoteId(blankNote.id);
  };

  // Delete memo handler
  const handleDeleteNote = (id, e) => {
    e.stopPropagation(); // Prevent re-selecting deleted card
    const remaining = notes.filter(n => n.id !== id);
    setNotes(remaining);
    
    if (selectedNoteId === id) {
      setSelectedNoteId(remaining.length > 0 ? remaining[0].id : null);
    }
  };

  const selectedNote = notes.find(n => n.id === selectedNoteId);

  return (
    <div style={styles.canvas} className="slide-down-panel">
      {/* Dynamic Keyframes to animate sidebar cards seamlessly */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes customDropFade {
          0% {
            opacity: 0;
            transform: translateY(-16px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .slide-down-panel {
          animation: customDropFade 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .stagger-note {
          opacity: 0;
          animation: customDropFade 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .delay-1 { animation-delay: 0.05s; }
        .delay-2 { animation-delay: 0.1s; }
        .delay-3 { animation-delay: 0.15s; }
        .delay-4 { animation-delay: 0.2s; }
      `}} />

      <div style={styles.headerRow}>
        <div>
          <h2 style={styles.heading}>Personal Study Ledger</h2>
          <p style={styles.subheading}>Maintain persistent exam summaries, algorithm steps, and laboratory journals.</p>
        </div>
        <button onClick={handleNewNote} style={styles.newBtn}>+ Add New Memo</button>
      </div>

      <div style={styles.layout}>
        {/* Sidebar notes list */}
        <div style={styles.sidebar}>
          <div style={styles.listStack}>
            {notes.map((note, index) => {
              const isSelected = note.id === selectedNoteId;
              return (
                <div
                  key={note.id}
                  onClick={() => setSelectedNoteId(note.id)}
                  style={{
                    ...styles.noteCard,
                    backgroundColor: isSelected ? "rgba(99, 102, 241, 0.12)" : "rgba(15, 23, 42, 0.2)",
                    borderColor: isSelected ? "#6366f1" : "rgba(255, 255, 255, 0.04)"
                  }}
                  className={`stagger-note delay-${Math.min(index + 1, 4)}`}
                >
                  <div style={styles.cardHeader}>
                    <span style={styles.subTag}>{note.subject}</span>
                    <div style={styles.rightHeaderNode}>
                      <span style={styles.dateText}>{note.date}</span>
                      <button 
                        onClick={(e) => handleDeleteNote(note.id, e)} 
                        style={styles.deleteBtn}
                        title="Delete Note"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                  <h4 style={styles.cardTitle}>{note.title}</h4>
                  <p style={styles.cardExcerpt}>
                    {note.content && note.content.length > 60 ? `${note.content.substring(0, 60)}...` : note.content}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Note Editor Area */}
        {selectedNote ? (
          <div style={styles.editor}>
            <div style={styles.editorHeader}>
              <div style={styles.metaInputs}>
                <input
                  type="text"
                  value={editingTitle}
                  onChange={(e) => updateActiveNoteField("title", e.target.value)}
                  style={styles.titleInput}
                  placeholder="Note Title"
                />
                <select
                  value={editingSubject}
                  onChange={(e) => updateActiveNoteField("subject", e.target.value)}
                  style={styles.selectInput}
                >
                  <option value="CS-402">CS-402 (Operating Systems)</option>
                  <option value="CS-406">CS-406 (Algorithms)</option>
                  <option value="CS-408">CS-408 (Cryptography)</option>
                  <option value="CS-410">CS-410 (Web Arch)</option>
                </select>
              </div>
              <span style={styles.autoSavedBadge}>✓ Auto-saving live</span>
            </div>

            <textarea
              value={editingContent}
              onChange={(e) => updateActiveNoteField("content", e.target.value)}
              style={styles.textArea}
              placeholder="Write your study notes here..."
            />
          </div>
        ) : (
          <div style={styles.emptyEditor}>
            Select a note from the ledger or add a new memo to start editing.
          </div>
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
  newBtn: {
    backgroundColor: "#6366f1",
    color: "#ffffff",
    border: "none",
    padding: "12px 24px",
    borderRadius: "14px",
    fontSize: "13px",
    fontWeight: "700",
    cursor: "pointer",
    transition: "background-color 0.2s"
  },
  layout: {
    display: "grid",
    gridTemplateColumns: "1fr 2fr",
    gap: "28px",
    minHeight: "550px"
  },
  sidebar: {
    backgroundColor: "rgba(30, 41, 59, 0.15)",
    border: "1px solid rgba(255, 255, 255, 0.04)",
    borderRadius: "22px",
    padding: "20px",
    maxHeight: "600px",
    overflowY: "auto"
  },
  listStack: {
    display: "flex",
    flexDirection: "column",
    gap: "12px"
  },
  noteCard: {
    border: "1px solid",
    borderRadius: "14px",
    padding: "16px",
    cursor: "pointer",
    transition: "all 0.2s",
    display: "flex",
    flexDirection: "column",
    gap: "8px"
  },
  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  rightHeaderNode: {
    display: "flex",
    alignItems: "center",
    gap: "10px"
  },
  subTag: {
    fontSize: "10px",
    fontWeight: "700",
    color: "#818cf8"
  },
  dateText: {
    fontSize: "11px",
    color: "#475569",
    fontWeight: "500"
  },
  deleteBtn: {
    background: "none",
    border: "none",
    cursor: "pointer",
    fontSize: "13px",
    padding: 0,
    opacity: 0.5,
    transition: "opacity 0.2s"
  },
  cardTitle: {
    fontSize: "14px",
    fontWeight: "700",
    color: "#ffffff",
    margin: 0,
    lineHeight: "1.4"
  },
  cardExcerpt: {
    fontSize: "12px",
    color: "#64748b",
    lineHeight: "1.5",
    margin: 0
  },
  editor: {
    backgroundColor: "rgba(30, 41, 59, 0.15)",
    border: "1px solid rgba(255, 255, 255, 0.04)",
    borderRadius: "22px",
    padding: "28px",
    display: "flex",
    flexDirection: "column",
    gap: "24px"
  },
  editorHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "1px solid rgba(255, 255, 255, 0.04)",
    paddingBottom: "20px"
  },
  metaInputs: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    flex: 1
  },
  titleInput: {
    backgroundColor: "transparent",
    border: "none",
    fontSize: "20px",
    fontWeight: "800",
    color: "#ffffff",
    outline: "none",
    width: "90%"
  },
  selectInput: {
    backgroundColor: "transparent",
    border: "none",
    color: "#64748b",
    fontSize: "12px",
    fontWeight: "600",
    outline: "none",
    cursor: "pointer"
  },
  autoSavedBadge: {
    fontSize: "12px",
    fontWeight: "600",
    color: "#10b981",
    backgroundColor: "rgba(16, 185, 129, 0.1)",
    padding: "6px 12px",
    borderRadius: "8px"
  },
  textArea: {
    flex: 1,
    backgroundColor: "transparent",
    border: "none",
    color: "#cbd5e1",
    fontSize: "14px",
    lineHeight: "1.7",
    outline: "none",
    resize: "none",
    fontFamily: "inherit",
    minHeight: "350px"
  },
  emptyEditor: {
    backgroundColor: "rgba(30, 41, 59, 0.15)",
    border: "1px solid rgba(255, 255, 255, 0.04)",
    borderRadius: "22px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#475569",
    fontSize: "14px"
  }
};

export default NotesPage;