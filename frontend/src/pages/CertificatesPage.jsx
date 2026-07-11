import React from 'react';

// Pass your styles object down as a prop if needed, or define local styles
export default function CertificatesPage({ styles }) {
  return (
    <div>
      <h1 style={styles?.welcomeTitle || { fontSize: "2rem", fontWeight: "bold" }}>My Certificates 📜</h1>
      <p style={styles?.welcomeSubtitle || { color: "#64748b" }}>Celebrate and share your verified learning achievements.</p>
      
      <div style={{ 
        display: "grid", 
        gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", 
        gap: "20px", 
        marginTop: "24px" 
      }}>
        <div style={{ 
          background: "#fff", 
          borderRadius: "12px", 
          border: "1px solid #e2e8f0", 
          overflow: "hidden",
          boxShadow: "0 1px 3px rgba(0,0,0,0.05)"
        }}>
          <div style={{ 
            background: "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)", 
            padding: "24px", 
            textAlign: "center",
            color: "#fff"
          }}>
            <span style={{ fontSize: "2rem" }}>🏆</span>
            <h3 style={{ margin: "10px 0 0 0", fontSize: "1.1rem", fontWeight: "600" }}>Certificate of Completion</h3>
          </div>
          
          <div style={{ padding: "20px" }}>
            <h4 style={{ margin: "0 0 4px 0", fontSize: "1.1rem", color: "#1e293b" }}>Full-Stack Web Development</h4>
            <p style={{ margin: "0 0 16px 0", fontSize: "0.875rem", color: "#64748b" }}>Issued on: July 2026</p>
            
            <button 
              onClick={() => alert("Downloading certificate PDF...")}
              style={{
                width: "100%",
                padding: "10px 16px",
                background: "#2563eb",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                fontWeight: "500",
                cursor: "pointer"
              }}
            >
              Download PDF ⬇️
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}