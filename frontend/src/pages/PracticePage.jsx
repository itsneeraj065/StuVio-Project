import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const PracticePage = () => {
  const { language } = useParams();
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <button onClick={() => navigate('/')} style={styles.backBtn}>
        ← Back to Home
      </button>

      <h1 style={styles.heading}>💻 Practice {language?.toUpperCase()}</h1>
      <p style={styles.subtext}>
        Solve hands-on coding challenges for {language}.
      </p>

      <div style={styles.card}>
        <h2>Exercise 1: {language?.toUpperCase()} Basics</h2>
        <p>Try writing code to complete the given task below:</p>
        <textarea 
          style={styles.editor} 
          placeholder={`Write your ${language?.toUpperCase()} code here...`} 
          rows={6}
        />
        <br />
        <button style={styles.submitBtn}>Submit Solution</button>
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
  editor: { width: '100%', backgroundColor: '#1e293b', color: '#cbd5e1', border: '1px solid #334155', borderRadius: '8px', padding: '12px', marginTop: '10px' },
  submitBtn: { backgroundColor: '#6366f1', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '6px', cursor: 'pointer', marginTop: '15px' }
};

export default PracticePage;