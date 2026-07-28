import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const QuizPage = () => {
  const { language } = useParams();
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <button onClick={() => navigate('/')} style={styles.backBtn}>
        ← Back to Home
      </button>

      <h1 style={styles.heading}>✏️ {language?.toUpperCase()} Quiz</h1>
      <p style={styles.subtext}>Test your knowledge on {language}.</p>

      <div style={styles.card}>
        <h3>Question 1: What does {language?.toUpperCase()} stand for?</h3>
        <div style={styles.options}>
          <button style={styles.optionBtn}>Option A</button>
          <button style={styles.optionBtn}>Option B</button>
          <button style={styles.optionBtn}>Option C</button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: { backgroundColor: '#0b0f19', color: '#cbd5e1', minHeight: '100vh', padding: '40px' },
  backBtn: { backgroundColor: '#1e293b', color: '#fff', border: 'none', padding: '10px 16px', borderRadius: '6px', cursor: 'pointer', marginBottom: '20px' },
  heading: { fontSize: '32px', color: '#ffffff', marginBottom: '10px' },
  subtext: { color: '#94a3b8', marginBottom: '30px' },
  card: { backgroundColor: 'rgba(30, 41, 59, 0.3)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '12px', padding: '24px' },
  options: { display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '15px' },
  optionBtn: { backgroundColor: '#1e293b', color: '#cbd5e1', border: '1px solid #334155', padding: '12px', borderRadius: '6px', textAlign: 'left', cursor: 'pointer' }
};

export default QuizPage;