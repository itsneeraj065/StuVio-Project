import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const LearnPage = () => {
  const { language } = useParams();
  const navigate = useNavigate();
  const langKey = language?.toLowerCase() || 'html';

  // Sample course module data structure
  const courseData = {
    title: `${language?.toUpperCase()} Masterclass`,
    modules: [
      { id: 1, title: '1. Fundamentals & Syntax', duration: '10 mins', completed: true },
      { id: 2, title: '2. Elements & Structure', duration: '15 mins', completed: false },
      { id: 3, title: '3. Advanced Concepts & Best Practices', duration: '20 mins', completed: false },
      { id: 4, title: '4. Real-world Project Setup', duration: '25 mins', completed: false }
    ],
    codeSnippet: `// Quick Starter Code for ${language?.toUpperCase()}\nfunction helloWorld() {\n  console.log("Welcome to ${language}!");\n}\n\nhelloWorld();`,
    keyTakeaways: [
      'Understand core syntax rules and standard conventions.',
      'Learn proper project structure for maximum scalability.',
      'Master essential debugging tools and DevTools.'
    ]
  };

  const [activeModule, setActiveModule] = useState(courseData.modules[0]);
  const [completedModules, setCompletedModules] = useState([1]);
  const [activeTab, setActiveTab] = useState('notes'); // 'notes' | 'code'
  const [userCode, setUserCode] = useState(courseData.codeSnippet);
  const [output, setOutput] = useState('');

  // Toggle Module Completion
  const toggleComplete = (id) => {
    if (completedModules.includes(id)) {
      setCompletedModules(completedModules.filter((mId) => mId !== id));
    } else {
      setCompletedModules([...completedModules, id]);
    }
  };

  // Simulate Code Execution
  const runCode = () => {
    setOutput(`[System]: Executing ${language?.toUpperCase()} snippet...\n> Console Output: Hello, World!`);
  };

  // Calculate Progress Percentage
  const progressPercent = Math.round(
    (completedModules.length / courseData.modules.length) * 100
  );

  return (
    <div style={styles.container}>
      {/* HEADER SECTION */}
      <div style={styles.headerRow}>
        <button onClick={() => navigate('/')} style={styles.backBtn}>
          ← Back to Home
        </button>

        <div style={styles.actionGroup}>
          <button 
            onClick={() => navigate(`/practice/${langKey}`)} 
            style={styles.practiceBtn}
          >
            💻 Practice {language?.toUpperCase()}
          </button>
          <button 
            onClick={() => navigate(`/quiz/${langKey}`)} 
            style={styles.quizBtn}
          >
            ✏️ Take Quiz
          </button>
        </div>
      </div>

      {/* HERO & PROGRESS */}
      <div style={styles.heroCard}>
        <div>
          <h1 style={styles.heading}>📖 Learn {language?.toUpperCase()}</h1>
          <p style={styles.subtext}>Master {language} with interactive modules and instant execution.</p>
        </div>

        {/* PROGRESS TRACKER */}
        <div style={styles.progressBox}>
          <div style={styles.progressText}>
            <span>Course Progress</span>
            <strong>{progressPercent}%</strong>
          </div>
          <div style={styles.progressBarBg}>
            <div style={{ ...styles.progressBarFill, width: `${progressPercent}%` }} />
          </div>
        </div>
      </div>

      {/* MAIN TWO-COLUMN LAYOUT */}
      <div style={styles.layoutGrid}>
        
        {/* LEFT: MODULES / ROADMAP SIDEBAR */}
        <div style={styles.sidebar}>
          <h3 style={styles.sectionTitle}>Course Roadmap</h3>
          <div style={styles.moduleList}>
            {courseData.modules.map((mod) => {
              const isCompleted = completedModules.includes(mod.id);
              const isActive = activeModule.id === mod.id;

              return (
                <div 
                  key={mod.id} 
                  style={{
                    ...styles.moduleItem,
                    borderColor: isActive ? '#6366f1' : 'rgba(255, 255, 255, 0.08)',
                    backgroundColor: isActive ? 'rgba(99, 102, 241, 0.1)' : 'rgba(30, 41, 59, 0.2)'
                  }}
                  onClick={() => setActiveModule(mod)}
                >
                  <div style={styles.moduleInfo}>
                    <input 
                      type="checkbox" 
                      checked={isCompleted} 
                      onChange={() => toggleComplete(mod.id)}
                      style={styles.checkbox}
                      onClick={(e) => e.stopPropagation()}
                    />
                    <span style={{ textDecoration: isCompleted ? 'line-through' : 'none', color: isCompleted ? '#64748b' : '#ffffff' }}>
                      {mod.title}
                    </span>
                  </div>
                  <span style={styles.durationTag}>{mod.duration}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* RIGHT: INTERACTIVE CONTENT WORKSPACE */}
        <div style={styles.workspace}>
          
          {/* CONTENT TABS */}
          <div style={styles.tabHeader}>
            <button 
              style={{ ...styles.tabBtn, borderBottom: activeTab === 'notes' ? '2px solid #6366f1' : 'none', color: activeTab === 'notes' ? '#ffffff' : '#94a3b8' }}
              onClick={() => setActiveTab('notes')}
            >
              📝 Lesson Notes
            </button>
            <button 
              style={{ ...styles.tabBtn, borderBottom: activeTab === 'code' ? '2px solid #6366f1' : 'none', color: activeTab === 'code' ? '#ffffff' : '#94a3b8' }}
              onClick={() => setActiveTab('code')}
            >
              ⚡ Live Playground
            </button>
          </div>

          {/* TAB 1: LESSON NOTES */}
          {activeTab === 'notes' && (
            <div style={styles.card}>
              <h2 style={{ color: '#ffffff', marginBottom: '12px' }}>{activeModule.title}</h2>
              <p style={{ lineHeight: '1.6', color: '#cbd5e1' }}>
                Welcome to this chapter. Here you will learn key patterns, standard syntaxes, and structural implementations for <strong>{language?.toUpperCase()}</strong>.
              </p>

              <h4 style={{ color: '#6366f1', marginTop: '24px', marginBottom: '10px' }}>💡 Key Takeaways</h4>
              <ul style={styles.takeawaysList}>
                {courseData.keyTakeaways.map((point, idx) => (
                  <li key={idx} style={styles.takeawayItem}>✓ {point}</li>
                ))}
              </ul>
            </div>
          )}

          {/* TAB 2: LIVE CODE RUNNER */}
          {activeTab === 'code' && (
            <div style={styles.card}>
              <h3 style={{ color: '#ffffff', marginBottom: '10px' }}>Interactive Playground</h3>
              <textarea 
                value={userCode}
                onChange={(e) => setUserCode(e.target.value)}
                style={styles.codeEditor}
                rows={8}
              />
              <button onClick={runCode} style={styles.runBtn}>▶ Run Code</button>

              {output && (
                <div style={styles.consoleBox}>
                  <pre style={{ margin: 0, fontFamily: 'monospace', color: '#38bdf8' }}>{output}</pre>
                </div>
              )}
            </div>
          )}

        </div>

      </div>
    </div>
  );
};

const styles = {
  container: { backgroundColor: '#0b0f19', color: '#cbd5e1', minHeight: '100vh', padding: '30px 40px' },
  headerRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' },
  backBtn: { backgroundColor: '#1e293b', color: '#fff', border: '1px solid rgba(255,255,255,0.1)', padding: '10px 18px', borderRadius: '8px', cursor: 'pointer' },
  actionGroup: { display: 'flex', gap: '12px' },
  practiceBtn: { backgroundColor: '#6366f1', color: '#fff', border: 'none', padding: '10px 18px', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' },
  quizBtn: { backgroundColor: 'rgba(255,255,255,0.05)', color: '#fff', border: '1px solid rgba(255,255,255,0.1)', padding: '10px 18px', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' },
  heroCard: { backgroundColor: 'rgba(30, 41, 59, 0.25)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '16px', padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px', marginBottom: '30px' },
  heading: { fontSize: '28px', color: '#ffffff', margin: 0 },
  subtext: { color: '#94a3b8', marginTop: '6px', margin: 0 },
  progressBox: { minWidth: '220px' },
  progressText: { display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '8px' },
  progressBarBg: { backgroundColor: '#1e293b', height: '8px', borderRadius: '4px', overflow: 'hidden' },
  progressBarFill: { backgroundColor: '#6366f1', height: '100%', transition: 'width 0.3s ease' },
  layoutGrid: { display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '24px' },
  sidebar: { backgroundColor: 'rgba(30, 41, 59, 0.15)', border: '1px solid rgba(255, 255, 255, 0.05)', borderRadius: '16px', padding: '20px' },
  sectionTitle: { fontSize: '16px', color: '#ffffff', marginBottom: '16px' },
  moduleList: { display: 'flex', flexDirection: 'column', gap: '12px' },
  moduleItem: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 14px', borderRadius: '10px', border: '1px solid transparent', cursor: 'pointer', transition: 'all 0.2s' },
  moduleInfo: { display: 'flex', alignItems: 'center', gap: '10px' },
  checkbox: { accentColor: '#6366f1', cursor: 'pointer' },
  durationTag: { fontSize: '11px', color: '#64748b' },
  workspace: { display: 'flex', flexDirection: 'column', gap: '16px' },
  tabHeader: { display: 'flex', gap: '20px', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '8px' },
  tabBtn: { background: 'none', border: 'none', fontSize: '15px', fontWeight: '600', cursor: 'pointer', padding: '6px 12px' },
  card: { backgroundColor: 'rgba(30, 41, 59, 0.25)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '16px', padding: '24px' },
  takeawaysList: { listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' },
  takeawayItem: { fontSize: '14px', color: '#cbd5e1' },
  codeEditor: { width: '100%', backgroundColor: '#0f172a', color: '#f8fafc', border: '1px solid #334155', borderRadius: '8px', padding: '14px', fontFamily: 'monospace', fontSize: '14px', boxSizing: 'border-box' },
  runBtn: { backgroundColor: '#10b981', color: '#ffffff', border: 'none', padding: '10px 20px', borderRadius: '8px', fontWeight: '600', cursor: 'pointer', marginTop: '12px' },
  consoleBox: { marginTop: '16px', backgroundColor: '#090d16', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '8px', padding: '14px' }
};

export default LearnPage;