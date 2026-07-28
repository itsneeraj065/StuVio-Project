import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const PracticePage = () => {
  const { language } = useParams();
  const navigate = useNavigate();
  const langKey = language?.toLowerCase() || 'html';

  // Sample Challenges Data Structure
  const challenges = [
    {
      id: 1,
      title: `1. Print Output in ${language?.toUpperCase()}`,
      difficulty: 'Easy',
      points: 50,
      description: `Write a statement that outputs "Hello StuVio!" using standard ${language?.toUpperCase()} syntax.`,
      starterCode: language?.toLowerCase() === 'html' 
        ? '<h1>Hello World</h1>' 
        : `function solution() {\n  // Write your code below\n  return "Hello StuVio!";\n}`,
      expectedOutput: 'Hello StuVio!',
      hint: 'Check your syntax and capitalization carefully.'
    },
    {
      id: 2,
      title: `2. Array / Logic Challenge`,
      difficulty: 'Medium',
      points: 100,
      description: `Create a function that takes an array of numbers and returns the sum of all positive integers.`,
      starterCode: `function sumPositives(arr) {\n  // Write your logic here\n}`,
      expectedOutput: '15',
      hint: 'Use a loop or filter/reduce methods.'
    }
  ];

  const [activeChallenge, setActiveChallenge] = useState(challenges[0]);
  const [code, setCode] = useState(activeChallenge.starterCode);
  const [testResult, setTestResult] = useState(null); // null | { status: 'pass'|'fail', message: string }
  const [showHint, setShowHint] = useState(false);
  const [score, setScore] = useState(0);
  const [solvedIds, setSolvedIds] = useState([]);

  // Switch challenge handler
  const handleSelectChallenge = (ch) => {
    setActiveChallenge(ch);
    setCode(ch.starterCode);
    setTestResult(null);
    setShowHint(false);
  };

  // Run/Submit Evaluation Logic
  const handleRunTests = () => {
    // Simple verification check for demonstration
    const isPassing = code.includes(activeChallenge.expectedOutput) || code.length > 20;

    if (isPassing) {
      setTestResult({
        status: 'pass',
        message: `✅ Test Passed! +${activeChallenge.points} XP added.`
      });
      if (!solvedIds.includes(activeChallenge.id)) {
        setSolvedIds([...solvedIds, activeChallenge.id]);
        setScore(score + activeChallenge.points);
      }
    } else {
      setTestResult({
        status: 'fail',
        message: `❌ Test Failed: Output did not match expected value "${activeChallenge.expectedOutput}".`
      });
    }
  };

  return (
    <div style={styles.container}>
      {/* TOP HEADER BAR */}
      <div style={styles.headerRow}>
        <button onClick={() => navigate('/')} style={styles.backBtn}>
          ← Back to Home
        </button>

        <div style={styles.statsBadge}>
          <span>🔥 Streak: 3 Days</span>
          <span style={styles.divider}>|</span>
          <span style={{ color: '#6366f1', fontWeight: 'bold' }}>⚡ {score} XP</span>
        </div>

        <div style={styles.actionGroup}>
          <button 
            onClick={() => navigate(`/learn/${langKey}`)} 
            style={styles.navBtn}
          >
            📖 Learn Mode
          </button>
          <button 
            onClick={() => navigate(`/quiz/${langKey}`)} 
            style={styles.navBtn}
          >
            ✏️ Take Quiz
          </button>
        </div>
      </div>

      {/* PAGE TITLE */}
      <div style={styles.titleSection}>
        <h1 style={styles.heading}>💻 Practice Arena: {language?.toUpperCase()}</h1>
        <p style={styles.subtext}>Solve interactive challenges, pass test cases, and level up your skills.</p>
      </div>

      {/* MAIN PRACTICE WORKSPACE */}
      <div style={styles.grid}>
        
        {/* LEFT COLUMN: PROBLEM LIST & DESCRIPTION */}
        <div style={styles.problemCol}>
          
          {/* PROBLEM SELECTOR */}
          <div style={styles.card}>
            <h3 style={styles.cardTitle}>Select Challenge</h3>
            <div style={styles.problemList}>
              {challenges.map((ch) => {
                const isSolved = solvedIds.includes(ch.id);
                const isActive = activeChallenge.id === ch.id;

                return (
                  <button
                    key={ch.id}
                    onClick={() => handleSelectChallenge(ch)}
                    style={{
                      ...styles.problemItem,
                      borderColor: isActive ? '#6366f1' : 'rgba(255, 255, 255, 0.08)',
                      backgroundColor: isActive ? 'rgba(99, 102, 241, 0.1)' : 'rgba(30, 41, 59, 0.2)'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span>{isSolved ? '✅' : '🎯'}</span>
                      <span style={{ color: '#ffffff', fontWeight: '600' }}>{ch.title}</span>
                    </div>
                    <span style={ch.difficulty === 'Easy' ? styles.tagEasy : styles.tagMed}>
                      {ch.difficulty}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* PROBLEM DETAILS */}
          <div style={{ ...styles.card, marginTop: '20px' }}>
            <div style={styles.flexBetween}>
              <h2 style={{ color: '#ffffff', margin: 0 }}>{activeChallenge.title}</h2>
              <span style={styles.pointsTag}>+{activeChallenge.points} XP</span>
            </div>
            
            <p style={{ color: '#cbd5e1', lineHeight: '1.6', marginTop: '16px' }}>
              {activeChallenge.description}
            </p>

            {/* HINT TOGGLE */}
            <div style={{ marginTop: '20px' }}>
              <button 
                onClick={() => setShowHint(!showHint)} 
                style={styles.hintBtn}
              >
                💡 {showHint ? 'Hide Hint' : 'Show Hint'}
              </button>
              {showHint && (
                <div style={styles.hintBox}>
                  <strong>Hint:</strong> {activeChallenge.hint}
                </div>
              )}
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: CODE EDITOR & TEST RESULTS */}
        <div style={styles.editorCol}>
          <div style={styles.card}>
            <div style={styles.flexBetween}>
              <h3 style={styles.cardTitle}>Interactive Code Workspace</h3>
              <button 
                onClick={() => setCode(activeChallenge.starterCode)} 
                style={styles.resetBtn}
              >
                🔄 Reset Template
              </button>
            </div>

            {/* EDITOR TEXTAREA */}
            <textarea 
              value={code}
              onChange={(e) => setCode(e.target.value)}
              style={styles.editor} 
              rows={12}
            />

            {/* CONTROLS */}
            <div style={styles.btnRow}>
              <button onClick={handleRunTests} style={styles.submitBtn}>
                🚀 Submit & Evaluate
              </button>
            </div>

            {/* TEST CASE RESULTS BOX */}
            {testResult && (
              <div 
                style={{
                  ...styles.resultBox,
                  borderColor: testResult.status === 'pass' ? '#10b981' : '#ef4444',
                  backgroundColor: testResult.status === 'pass' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)'
                }}
              >
                <p style={{ margin: 0, fontWeight: '600', color: testResult.status === 'pass' ? '#34d399' : '#f87171' }}>
                  {testResult.message}
                </p>
              </div>
            )}

          </div>
        </div>

      </div>
    </div>
  );
};

const styles = {
  container: { backgroundColor: '#0b0f19', color: '#cbd5e1', minHeight: '100vh', padding: '30px 40px' },
  headerRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' },
  backBtn: { backgroundColor: '#1e293b', color: '#fff', border: '1px solid rgba(255,255,255,0.1)', padding: '10px 18px', borderRadius: '8px', cursor: 'pointer' },
  statsBadge: { backgroundColor: '#1e293b', padding: '8px 16px', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.08)', fontSize: '14px', display: 'flex', gap: '10px' },
  divider: { color: '#475569' },
  actionGroup: { display: 'flex', gap: '10px' },
  navBtn: { backgroundColor: 'rgba(255,255,255,0.05)', color: '#fff', border: '1px solid rgba(255,255,255,0.1)', padding: '8px 14px', borderRadius: '8px', cursor: 'pointer', fontSize: '13px' },
  titleSection: { marginBottom: '24px' },
  heading: { fontSize: '28px', color: '#ffffff', margin: 0 },
  subtext: { color: '#94a3b8', marginTop: '6px' },
  grid: { display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '24px' },
  problemCol: { display: 'flex', flexDirection: 'column' },
  editorCol: { display: 'flex', flexDirection: 'column' },
  card: { backgroundColor: 'rgba(30, 41, 59, 0.25)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '16px', padding: '20px' },
  cardTitle: { fontSize: '16px', color: '#ffffff', margin: '0 0 14px 0' },
  problemList: { display: 'flex', flexDirection: 'column', gap: '10px' },
  problemItem: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 14px', borderRadius: '8px', border: '1px solid transparent', cursor: 'pointer', width: '100%', textAlign: 'left' },
  tagEasy: { backgroundColor: 'rgba(16, 185, 129, 0.2)', color: '#34d399', fontSize: '11px', padding: '4px 8px', borderRadius: '4px', fontWeight: 'bold' },
  tagMed: { backgroundColor: 'rgba(245, 158, 11, 0.2)', color: '#fbbf24', fontSize: '11px', padding: '4px 8px', borderRadius: '4px', fontWeight: 'bold' },
  flexBetween: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  pointsTag: { backgroundColor: '#6366f1', color: '#fff', fontSize: '12px', padding: '4px 10px', borderRadius: '12px', fontWeight: 'bold' },
  hintBtn: { background: 'none', border: 'none', color: '#38bdf8', cursor: 'pointer', padding: 0, fontSize: '13px' },
  hintBox: { marginTop: '10px', backgroundColor: '#0f172a', border: '1px solid #334155', padding: '12px', borderRadius: '8px', fontSize: '13px', color: '#94a3b8' },
  resetBtn: { background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', fontSize: '12px' },
  editor: { width: '100%', backgroundColor: '#0f172a', color: '#38bdf8', border: '1px solid #334155', borderRadius: '8px', padding: '14px', fontFamily: 'monospace', fontSize: '14px', boxSizing: 'border-box', marginTop: '10px' },
  btnRow: { display: 'flex', justifyContent: 'flex-end', marginTop: '14px' },
  submitBtn: { backgroundColor: '#6366f1', color: '#fff', border: 'none', padding: '12px 24px', borderRadius: '8px', fontWeight: '600', cursor: 'pointer' },
  resultBox: { marginTop: '16px', padding: '14px', borderRadius: '8px', border: '1px solid transparent' }
};

export default PracticePage;