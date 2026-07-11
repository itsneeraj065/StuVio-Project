import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ProfilePage() {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  
  const [profile, setProfile] = useState({
    name: "Sam Wilson",
    email: "sam.wilson@stuvio.edu",
    studentId: "STU-2026-8841",
    major: "Computer Science & Engineering",
    semester: "6th Semester",
    joiningYear: "2023",
    profileImage: null,
    skills: ["React", "UI/UX", "Database Design"],
    socials: { github: "github.com/samwilson", linkedin: "linkedin.com/in/samwilson" }
  });

  const [achievements] = useState([
    { id: 1, title: "Top Contributor", icon: "🏆", desc: "Top 5% in forum" },
    { id: 2, title: "Study Streak", icon: "🔥", desc: "7 days active" }
  ]);

  const handleSave = (e) => {
    e.preventDefault();
    setIsEditing(false);
    alert("Profile changes saved successfully!");
  };

  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <div>
          <h1 style={styles.title}>My Profile 👤</h1>
          <p style={styles.subtitle}>Manage your academic identity and account details.</p>
        </div>
        <button style={styles.backButton} onClick={() => navigate("/dashboard")}>← Back to Dashboard</button>
      </header>

      <div style={styles.profileLayout}>
        <div style={styles.leftColumn}>
          <div style={styles.avatarCard}>
            <div style={styles.largeAvatar}>{profile.name.charAt(0)}</div>
            <h2 style={styles.profileName}>{profile.name}</h2>
            <span style={styles.roleTag}>Student</span>
            <div style={styles.quickStats}>
              <div style={styles.quickStatBox}>
                <span style={styles.statNum}>GPA</span>
                <span style={styles.statVal}>8.84</span>
              </div>
              <div style={styles.quickStatBox}>
                <span style={styles.statNum}>Credits</span>
                <span style={styles.statVal}>92</span>
              </div>
            </div>
          </div>

          <div style={styles.socialsSection}>
         <h4 style={styles.label}>Professional Links</h4>
       <div style={styles.socialRow}>
        <a href={`https://${profile.socials.github}`} style={styles.socialLink}>GitHub</a>
        <a href={`https://${profile.socials.linkedin}`} style={styles.socialLink}>LinkedIn</a>
      </div>
</div>

          <div style={styles.achievementsCard}>
            <h3 style={styles.sectionTitle}>Achievements</h3>
            <div style={styles.achievementGrid}>
              {achievements.map((ach) => (
                <div key={ach.id} style={styles.achievementItem}>
                  <span style={styles.achIcon}>{ach.icon}</span>
                  <div>
                    <div style={styles.achTitle}>{ach.title}</div>
                    <div style={styles.achDesc}>{ach.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={styles.detailsCard}>
          <div style={styles.formHeader}>
            <h3 style={styles.sectionTitle}>Academic & Personal Details</h3>
            <button style={isEditing ? styles.cancelBtn : styles.editBtn} onClick={() => setIsEditing(!isEditing)}>
              {isEditing ? "Cancel" : "Edit Profile"}
            </button>
          </div>

          <form onSubmit={handleSave} style={styles.form}>
            <div style={styles.formGrid}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Full Name</label>
                <input type="text" disabled={!isEditing} value={profile.name} onChange={(e) => setProfile({...profile, name: e.target.value})} style={isEditing ? styles.inputEnabled : styles.inputDisabled} />
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Email Address</label>
                <input type="email" disabled={!isEditing} value={profile.email} onChange={(e) => setProfile({...profile, email: e.target.value})} style={isEditing ? styles.inputEnabled : styles.inputDisabled} />
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Student ID</label>
                <input type="text" disabled value={profile.studentId} style={styles.inputDisabled} />
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Major</label>
                <input type="text" disabled={!isEditing} value={profile.major} onChange={(e) => setProfile({...profile, major: e.target.value})} style={isEditing ? styles.inputEnabled : styles.inputDisabled} />
              </div>
            </div>

            <div style={styles.skillsSection}>
              <h4 style={styles.label}>Areas of Interest & Skills</h4>
              <div style={styles.tagContainer}>
                {profile.skills.map((skill, index) => (
                  <span key={index} style={styles.skillTag}>
                    {skill}
                    {isEditing && <button type="button" onClick={() => setProfile({...profile, skills: profile.skills.filter((_, i) => i !== index)})} style={styles.removeTagBtn}>×</button>}
                  </span>
                ))}
              </div>
              {isEditing && (
                <input 
                  placeholder="Add skill..." 
                  style={{...styles.inputEnabled, marginTop: "10px"}} 
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      setProfile({...profile, skills: [...profile.skills, e.target.value]});
                      e.target.value = "";
                    }
                  }}
                />
              )}
            </div>

            {isEditing && <button type="submit" style={styles.saveButton}>Save Changes</button>}
          </form>
        </div>
      </div>
    </div>
  );
}

const styles = {

    // --- NEW STYLES FOR SOCIALS AND AVAILABILITY ---
  socialsSection: {
    marginTop: "20px",
    paddingTop: "20px",
    borderTop: "1px solid #e2e8f0",
  },
  socialRow: {
    display: "flex",
    gap: "12px",
    marginTop: "10px",
  },
  socialLink: {
    fontSize: "12px",
    fontWeight: "600",
    color: "#2563eb",
    textDecoration: "none",
    backgroundColor: "#eff6ff",
    padding: "6px 12px",
    borderRadius: "6px",
  },
  availabilitySection: {
    marginTop: "20px",
    paddingTop: "20px",
    borderTop: "1px solid #e2e8f0",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  statusBadge: {
    fontSize: "12px",
    fontWeight: "700",
    padding: "4px 10px",
    borderRadius: "20px",
  }  , 
  page: { minHeight: "100vh", backgroundColor: "#f8fafc", padding: "40px", fontFamily: 'sans-serif', boxSizing: "border-box" },
  header: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "32px" },
  title: { fontSize: "30px", fontWeight: "800", color: "#1e293b", margin: "0 0 6px 0" },
  subtitle: { color: "#64748b", fontSize: "15px", margin: 0 },
  backButton: { backgroundColor: "#ffffff", color: "#64748b", border: "1px solid #e2e8f0", padding: "10px 16px", borderRadius: "8px", cursor: "pointer", fontWeight: "600", fontSize: "14px" },
  profileLayout: { display: "grid", gridTemplateColumns: "1fr 2fr", gap: "32px", alignItems: "start" },
  leftColumn: { display: "flex", flexDirection: "column", gap: "20px" },
  avatarCard: { backgroundColor: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "14px", padding: "32px 24px", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" },
  largeAvatar: { width: "90px", height: "90px", borderRadius: "50%", backgroundColor: "#2563eb", color: "#ffffff", fontSize: "36px", fontWeight: "800", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "16px" },
  profileName: { fontSize: "20px", fontWeight: "700", color: "#1e293b", margin: "0 0 4px 0" },
  roleTag: { fontSize: "12px", fontWeight: "700", color: "#2563eb", backgroundColor: "#eff6ff", padding: "4px 12px", borderRadius: "20px", marginBottom: "24px" },
  quickStats: { display: "flex", gap: "16px", width: "100%", borderTop: "1px solid #f1f5f9", paddingTop: "20px" },
  quickStatBox: { flex: 1, backgroundColor: "#f8fafc", padding: "10px", borderRadius: "8px" },
  statNum: { fontSize: "11px", color: "#64748b", textTransform: "uppercase" },
  statVal: { fontSize: "14px", fontWeight: "700", color: "#1e293b" },
  achievementsCard: { backgroundColor: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "14px", padding: "24px" },
  achievementGrid: { display: "grid", gap: "12px", marginTop: "16px" },
  achievementItem: { display: "flex", alignItems: "center", gap: "12px", padding: "12px", backgroundColor: "#f8fafc", borderRadius: "10px" },
  achIcon: { fontSize: "20px" },
  achTitle: { fontSize: "13px", fontWeight: "700" },
  achDesc: { fontSize: "11px", color: "#64748b" },
  detailsCard: { backgroundColor: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "14px", padding: "32px" },
  formHeader: { display: "flex", justifyContent: "space-between", marginBottom: "24px" },
  sectionTitle: { fontSize: "18px", fontWeight: "700", margin: 0 },
  editBtn: { backgroundColor: "#f1f5f9", border: "none", padding: "8px 14px", borderRadius: "6px", cursor: "pointer" },
  cancelBtn: { backgroundColor: "#fef2f2", color: "#dc2626", border: "none", padding: "8px 14px", borderRadius: "6px", cursor: "pointer" },
  form: { display: "flex", flexDirection: "column", gap: "24px" },
  formGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" },
  inputGroup: { display: "flex", flexDirection: "column", gap: "6px" },
  label: { fontSize: "13px", fontWeight: "600", color: "#475569" },
  inputDisabled: { padding: "10px 14px", borderRadius: "8px", border: "1px solid #e2e8f0", backgroundColor: "#f8fafc", color: "#64748b" },
  inputEnabled: { padding: "10px 14px", borderRadius: "8px", border: "1px solid #2563eb", backgroundColor: "#ffffff" },
  skillsSection: { marginTop: "20px", borderTop: "1px solid #e2e8f0", paddingTop: "20px" },
  tagContainer: { display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "10px" },
  skillTag: { backgroundColor: "#eff6ff", color: "#2563eb", padding: "6px 12px", borderRadius: "20px", fontSize: "12px", fontWeight: "600", display: "flex", alignItems: "center", gap: "6px" },
  removeTagBtn: { background: "none", border: "none", cursor: "pointer", color: "#2563eb", fontWeight: "bold" },
  saveButton: { backgroundColor: "#2563eb", color: "#ffffff", border: "none", padding: "12px 24px", borderRadius: "8px", cursor: "pointer" }
  
};

export default ProfilePage;