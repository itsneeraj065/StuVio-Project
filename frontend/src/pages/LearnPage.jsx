import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const LearnPage = () => {
  const { language } = useParams(); // Gets 'html', 'css', 'javascript', etc. from the URL
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <button onClick={() => navigate('/')} style={styles.backBtn}>
        ← Back to Home
      </button>

      <h1 style={styles.heading}>📖 Learn {language?.toUpperCase()}</h1>
      <p style={styles.subtext}>
        Welcome to the complete guide for mastering {language}.
      </p>

      <div style={styles.card}>
        <h2>Introduction to {language?.toUpperCase()}</h2>
        <p>
         launching soon {language}.
        </p>
      </div>
    </div>
  );
};

const styles = {
  container: { backgroundColor: '#0b0f19', color: '#cbd5e1', minHeight: '100vh', padding: '40px' },
  backBtn: { backgroundColor: '#1e293b', color: '#fff', border: 'none', padding: '10px 16px', borderRadius: '6px', cursor: 'pointer', marginBottom: '20px' },
  heading: { fontSize: '32px', color: '#ffffff', marginBottom: '10px' },
  subtext: { color: '#94a3b8', marginBottom: '30px' },
  card: { backgroundColor: 'rgba(30, 41, 59, 0.3)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '12px', padding: '24px' }
};

export default LearnPage;