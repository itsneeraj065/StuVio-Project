import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const QuizPage = () => {
  const { language } = useParams();
  const navigate = useNavigate();
  const langKey = language?.toLowerCase() || 'html';

  // Sample Dynamic Questions Database
  const quizQuestions = [
    {
      id: 1,
      question: `What primary role does ${language?.toUpperCase()} play in web development?`,
      options: [
        'Defining structure and layout',
        'Handling database queries directly',
        'Managing server OS kernels',
        'Styling hardware GPU memory'
      ],
      correctAnswer: 0
    },
    {
      id: 2,
      question: `Which of the following is considered standard syntax in ${language?.toUpperCase()}?`,
      options: [
        'Using correct opening and closing tags/brackets',
        'Writing everything inside SQL tables',
        'Ignoring variable declaration scopes',
        'Compiling straight into machine bytecodes'
      ],
      correctAnswer: 0
    },
    {
      id: 3,
      question: `What is a best practice when writing production-ready ${language?.toUpperCase()}?`,
      options: [
        'Using clear naming conventions and comments',
        'Putting all code on a single line without spaces',
        'Hardcoding passwords directly in front-end files',
        'Never testing code before deployment'
      ],
      correctAnswer: 0
    }
  ];

  // State Management
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60); // 60-second timer

  // Live Timer Effect
  useEffect(() => {
    if (quizFinished || timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, quizFinished]);

  // Handle Option Click
  const handleSelectOption = (index) => {
    if (isSubmitted) return; // Prevent changing choice after check
    setSelectedOption(index);
  };

  // Submit Current Answer
  const handleConfirmAnswer = () => {
    if (selectedOption === null) return;

    setIsSubmitted(true);
    if (selectedOption === quizQuestions[currentIdx].correctAnswer) {
      setScore((prev) => prev + 1);
    }
  };

  // Next Question or Finish Quiz
  const handleNextQuestion = () => {
    if (currentIdx + 1 < quizQuestions.length) {
      setCurrentIdx((prev) => prev + 1);
      setSelectedOption(null);
      setIsSubmitted(false);
    } else {
      setQuizFinished(true);
    }
  };

  // Reset Quiz
  const handleRestart = () => {
    setCurrentIdx(0);
    setSelectedOption(null);
    setScore(0);
    setIsSubmitted(false);
    setQuizFinished(false);
    setTimeLeft(60);
  };

  const currentQ = quizQuestions[currentIdx];

  return (
    <div style={styles.container}>
      {/* HEADER BAR */}
      <div style={styles.headerRow}>
        <button onClick={() => navigate('/')} style={styles.backBtn}>
          ← Back to Home
        </button>

        <div style={styles.timerBadge}>
          ⏱️ Time Left: <strong style={{ color: timeLeft < 15 ? '#ef4444' : '#ffffff' }}>{timeLeft}s</strong>
        </div>

        <div style={styles.actionGroup}>
          <button onClick={() => navigate(`/learn/${langKey}`)} style={styles.navBtn}>
            📖 Learn
          </button>
          <button onClick={() => navigate(`/practice/${langKey}`)} style={styles.navBtn}>
            💻 Practice
          </button>
        </div>
      </div>

      {/* QUIZ TITLE */}
      <div style={styles.titleSection}>
        <h1 style={styles.heading}>✏️ {language?.toUpperCase()} Knowledge Check</h1>
        <p style={styles.subtext}>Test your understanding with real-time feedback and instant score breakdown.</p>
      </div>

      {/* ACTIVE QUIZ OR RESULTS CONTAINER */}
      {!quizFinished ? (
        <div style={styles.card}>
          
          {/* PROGRESS METRICS */}
          <div style={styles.quizHeader}>
            <span style={styles.questionCounter}>
              Question <strong>{currentIdx + 1}</strong> of {quizQuestions.length}
            </span>
            <span style={styles.scoreCounter}>Current Score: {score}</span>
          </div>

          {/* QUESTION TEXT */}
          <h2 style={styles.questionText}>{currentQ.question}</h2>

          {/* OPTIONS LIST */}
          <div style={styles.optionsList}>
            {currentQ.options.map((option, idx) => {
              let btnStyle = { ...styles.optionBtn };

              // Visual styling logic after user selects/submits
              if (selectedOption === idx) {
                btnStyle.borderColor = '#6366f1';
                btnStyle.backgroundColor = 'rgba(99, 102, 241, 0.2)';
              }

              if (isSubmitted) {
                if (idx === currentQ.correctAnswer) {
                  btnStyle.borderColor = '#10b981';
                  btnStyle.backgroundColor = 'rgba(16, 185, 129, 0.2)';
                  btnStyle.color = '#34d399';
                } else if (selectedOption === idx) {
                  btnStyle.borderColor = '#ef4444';
                  btnStyle.backgroundColor = 'rgba(239, 68, 68, 0.2)';
                  btnStyle.color = '#f87171';
                }
              }

              return (
                <button
                  key={idx}
                  style={btnStyle}
                  onClick={() => handleSelectOption(idx)}
                >
                  <span style={styles.optionLetter}>{String.fromCharCode(65 + idx)}.</span> {option}
                </button>
              );
            })}
          </div>

          {/* FOOTER ACTIONS */}
          <div style={styles.footerRow}>
            {!isSubmitted ? (
              <button 
                onClick={handleConfirmAnswer} 
                disabled={selectedOption === null}
                style={{
                  ...styles.primaryBtn,
                  opacity: selectedOption === null ? 0.5 : 1,
                  cursor: selectedOption === null ? 'not-allowed' : 'pointer'
                }}
              >
                Check Answer
              </button>
            ) : (
              <button onClick={handleNextQuestion} style={styles.primaryBtn}>
                {currentIdx + 1 === quizQuestions.length ? 'View Final Results 🏆' : 'Next Question →'}
              </button>
            )}
          </div>

        </div>
      ) : (
        /* QUIZ RESULT SCOREBOARD */
        <div style={{ ...styles.card, textAlign: 'center', padding: '40px 20px' }}>
          <h2 style={{ fontSize: '36px', margin: '0 0 10px 0' }}>🎉 Quiz Completed!</h2>
          <p style={{ color: '#94a3b8', fontSize: '16px' }}>Here is how you performed in {language?.toUpperCase()}:</p>

          <div style={styles.scoreCircle}>
            <span style={{ fontSize: '42px', fontWeight: 'bold', color: '#6366f1' }}>
              {Math.round((score / quizQuestions.length) * 100)}%
            </span>
            <span style={{ fontSize: '14px', color: '#94a3b8' }}>
              {score} / {quizQuestions.length} Correct
            </span>
          </div>

          <div style={styles.btnRowCenter}>
            <button onClick={handleRestart} style={styles.primaryBtn}>
              🔄 Retry Quiz
            </button>
            <button onClick={() => navigate(`/practice/${langKey}`)} style={styles.secondaryBtn}>
              💻 Go to Practice Arena
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: { backgroundColor: '#0b0f19', color: '#cbd5e1', minHeight: '100vh', padding: '30px 40px' },
  headerRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' },
  backBtn: { backgroundColor: '#1e293b', color: '#fff', border: '1px solid rgba(255,255,255,0.1)', padding: '10px 18px', borderRadius: '8px', cursor: 'pointer' },
  timerBadge: { backgroundColor: '#1e293b', padding: '8px 16px', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.08)', fontSize: '14px' },
  actionGroup: { display: 'flex', gap: '10px' },
  navBtn: { backgroundColor: 'rgba(255,255,255,0.05)', color: '#fff', border: '1px solid rgba(255,255,255,0.1)', padding: '8px 14px', borderRadius: '8px', cursor: 'pointer', fontSize: '13px' },
  titleSection: { marginBottom: '24px' },
  heading: { fontSize: '28px', color: '#ffffff', margin: 0 },
  subtext: { color: '#94a3b8', marginTop: '6px' },
  card: { backgroundColor: 'rgba(30, 41, 59, 0.25)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '16px', padding: '28px', maxWidth: '800px', margin: '0 auto' },
  quizHeader: { display: 'flex', justifyContent: 'space-between', marginBottom: '16px', fontSize: '14px', color: '#94a3b8' },
  questionCounter: { color: '#cbd5e1' },
  scoreCounter: { color: '#6366f1', fontWeight: 'bold' },
  questionText: { fontSize: '20px', color: '#ffffff', marginBottom: '24px', lineHeight: '1.4' },
  optionsList: { display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' },
  optionBtn: { backgroundColor: '#1e293b', color: '#cbd5e1', border: '1px solid #334155', padding: '14px 18px', borderRadius: '10px', textAlign: 'left', cursor: 'pointer', fontSize: '15px', transition: 'all 0.2s ease', display: 'flex', alignItems: 'center', gap: '10px' },
  optionLetter: { fontWeight: 'bold', color: '#6366f1' },
  footerRow: { display: 'flex', justifyContent: 'flex-end' },
  primaryBtn: { backgroundColor: '#6366f1', color: '#fff', border: 'none', padding: '12px 24px', borderRadius: '8px', fontWeight: '600', cursor: 'pointer' },
  secondaryBtn: { backgroundColor: 'rgba(255,255,255,0.05)', color: '#fff', border: '1px solid rgba(255,255,255,0.1)', padding: '12px 24px', borderRadius: '8px', fontWeight: '600', cursor: 'pointer' },
  scoreCircle: { width: '160px', height: '160px', borderRadius: '50%', border: '4px solid #6366f1', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', margin: '30px auto', backgroundColor: 'rgba(99, 102, 241, 0.05)' },
  btnRowCenter: { display: 'flex', justifyContent: 'center', gap: '16px', marginTop: '20px' }
};

export default QuizPage;