import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../api/api";

function SubjectResourcesPage() {
  const navigate = useNavigate();
  const { subjectId } = useParams();

  const [notes, setNotes] = useState([]);
  const [videos, setVideos] = useState([]);
  const [assignments, setAssignments] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("notes");
  const [isLogoutHovered, setIsLogoutHovered] = useState(false);

  useEffect(() => {
    fetchResources();
  }, [subjectId]);

  const fetchResources = async () => {
    try {
      setLoading(true);
      setError("");

      const videosPromise = API.get(`/videos/subject/${subjectId}`);
      const notesPromise = API.get(`/notes/subject/${subjectId}`);
      const assignmentsPromise = API.get(`/assignments/subject/${subjectId}`);

      const [videosRes, notesRes, assignmentsRes] = await Promise.allSettled([
        videosPromise,
        notesPromise,
        assignmentsPromise
      ]);

      if (videosRes.status === "fulfilled") {
        setVideos(videosRes.value.data || []);
      } else {
        console.error("Videos API failed:", videosRes.reason);
        setVideos([]);
      }

      if (notesRes.status === "fulfilled") {
        setNotes(notesRes.value.data || []);
      } else {
        console.error("Notes API failed:", notesRes.reason);
        setNotes([]);
      }

      if (assignmentsRes.status === "fulfilled") {
        setAssignments(assignmentsRes.value.data || []);
      } else {
        console.error("Assignments API failed:", assignmentsRes.reason);
        setAssignments([]);
      }

      if (
        videosRes.status === "rejected" ||
        notesRes.status === "rejected" ||
        assignmentsRes.status === "rejected"
      ) {
        setError("Some subject resources could not be loaded. Check console for details.");
      }
    } catch (error) {
      console.error("Error fetching resources:", error);
      setError("Failed to load subject resources.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div style={styles.dashboardContainer}>

      {/* MAIN CONTENT */}
      <main style={styles.mainContent}>
        <header style={styles.contentHeader}>
          <div style={styles.breadcrumbWrapper}>
            <span style={styles.breadcrumb} onClick={() => navigate("/courses")}>
              Courses
            </span>
            <span style={styles.breadcrumbSeparator}>/</span>
            <span style={styles.breadcrumb} onClick={() => navigate(-1)}>
              Subjects
            </span>
            <span style={styles.breadcrumbSeparator}>/</span>
            <span style={styles.breadcrumbActive}>Resources</span>
          </div>

          <h1 style={styles.pageTitle}>Subject Resources</h1>
          <p style={styles.pageSubtitle}>
            Access notes, videos, and assignments for this subject.
          </p>
        </header>

        {error && <div style={styles.errorBanner}>{error}</div>}

        {/* TOP TAB BAR */}
        <div style={styles.tabContainer}>
          <button
            onClick={() => setActiveTab("notes")}
            style={{
              ...styles.tabButton,
              ...(activeTab === "notes" ? styles.tabButtonActive : {})
            }}
          >
            📘 Notes ({notes.length})
          </button>

          <button
            onClick={() => setActiveTab("videos")}
            style={{
              ...styles.tabButton,
              ...(activeTab === "videos" ? styles.tabButtonActive : {})
            }}
          >
            🎥 Videos ({videos.length})
          </button>

          <button
            onClick={() => setActiveTab("assignments")}
            style={{
              ...styles.tabButton,
              ...(activeTab === "assignments" ? styles.tabButtonActive : {})
            }}
          >
            📝 Assignments ({assignments.length})
          </button>
        </div>

        {loading ? (
          <p style={styles.emptyStateText}>Loading resources...</p>
        ) : (
          <div style={styles.resourceList}>
            {activeTab === "notes" && (
              <>
                {notes.length === 0 ? (
                  <p style={styles.emptyStateText}>No notes available.</p>
                ) : (
                  notes.map((note) => (
                    <div key={note.id} style={styles.resourceRow}>
                      <div style={styles.resourceMetaInfo}>
                        <span style={styles.rowIcon}>📘</span>
                        <div>
                          <h4 style={styles.resourceItemTitle}>
                            {note.title || "Untitled Note"}
                          </h4>
                          <p style={styles.resourceItemSub}>
                            {note.description || "Study material / note file"}
                          </p>
                        </div>
                      </div>

                      {note.fileUrl ? (
                        <a
                          href={note.fileUrl}
                          target="_blank"
                          rel="noreferrer"
                          style={styles.actionAnchorButton}
                        >
                          Open Note
                        </a>
                      ) : (
                        <span style={styles.noLinkText}>No file</span>
                      )}
                    </div>
                  ))
                )}
              </>
            )}

            {activeTab === "videos" && (
              <>
                {videos.length === 0 ? (
                  <p style={styles.emptyStateText}>No videos available.</p>
                ) : (
                  videos.map((video) => (
                    <div key={video.id} style={styles.resourceRow}>
                      <div style={styles.resourceMetaInfo}>
                        <span style={styles.rowIcon}>🎥</span>
                        <div>
                          <h4 style={styles.resourceItemTitle}>
                            {video.title || "Untitled Video"}
                          </h4>
                          <p style={styles.resourceItemSub}>
                            {video.description || "Video lecture"}
                          </p>
                        </div>
                      </div>

                      {video.youtubeUrl ? (
                        <a
                          href={video.youtubeUrl}
                          target="_blank"
                          rel="noreferrer"
                          style={styles.actionAnchorButton}
                        >
                          Watch Video
                        </a>
                      ) : (
                        <span style={styles.noLinkText}>No link</span>
                      )}
                    </div>
                  ))
                )}
              </>
            )}

            {activeTab === "assignments" && (
              <>
                {assignments.length === 0 ? (
                  <p style={styles.emptyStateText}>No assignments available.</p>
                ) : (
                  assignments.map((assignment) => (
                    <div key={assignment.id} style={styles.resourceRow}>
                      <div style={styles.resourceMetaInfo}>
                        <span style={styles.rowIcon}>📝</span>
                        <div>
                          <h4 style={styles.resourceItemTitle}>
                            {assignment.title || "Untitled Assignment"}
                          </h4>
                          <p style={styles.resourceItemSub}>
                            {assignment.description || "Assignment file / task"}
                          </p>
                        </div>
                      </div>

                      {assignment.attachmentUrl ? (
                        <a
                          href={assignment.attachmentUrl}
                          target="_blank"
                          rel="noreferrer"
                          style={{
                            ...styles.actionAnchorButton,
                            backgroundColor: "#10b981"
                          }}
                        >
                          Open Assignment
                        </a>
                      ) : (
                        <span style={styles.noLinkText}>No file</span>
                      )}
                    </div>
                  ))
                )}
              </>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

const styles = {
  dashboardContainer: {
    display: "flex",
    minHeight: "100vh",
    width: "100%",
    backgroundColor: "#f8fafc",
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
  },

  sidebar: {
    width: "270px",
    minHeight: "100vh",
    backgroundColor: "#ffffff",
    borderRight: "1px solid #e2e8f0",
    padding: "24px 16px",
    display: "flex",
    flexDirection: "column",
    boxSizing: "border-box",
    position: "sticky",
    top: 0
  },

  brandWrapper: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "8px 10px",
    marginBottom: "26px"
  },

  logo: {
    height: "42px",
    width: "42px",
    objectFit: "cover",
    borderRadius: "12px"
  },

  brandName: {
    fontSize: "20px",
    fontWeight: "800",
    color: "#0f172a"
  },

  brandSubText: {
    fontSize: "12px",
    color: "#64748b",
    marginTop: "2px"
  },

  sidebarSectionTitle: {
    fontSize: "11px",
    fontWeight: "800",
    color: "#94a3b8",
    letterSpacing: "1px",
    margin: "16px 10px 10px"
  },

  navMenu: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    marginBottom: "8px"
  },

  navItem: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "12px 14px",
    borderRadius: "12px",
    fontSize: "14px",
    fontWeight: "600",
    color: "#475569",
    cursor: "pointer",
    transition: "all 0.2s ease"
  },

  navItemActive: {
    backgroundColor: "#eff6ff",
    color: "#2563eb",
    boxShadow: "inset 0 0 0 1px #bfdbfe"
  },

  navEmoji: {
    fontSize: "16px",
    width: "20px",
    textAlign: "center"
  },

  logoutButton: {
    marginTop: "auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    padding: "12px",
    backgroundColor: "#fef2f2",
    color: "#dc2626",
    border: "none",
    borderRadius: "12px",
    fontSize: "14px",
    fontWeight: "700",
    cursor: "pointer",
    transition: "all 0.2s ease"
  },

  logoutButtonHover: {
    backgroundColor: "#fee2e2",
    transform: "translateY(-1px)"
  },

  mainContent: {
    flexGrow: 1,
    padding: "40px",
    overflowY: "auto",
    boxSizing: "border-box"
  },

  contentHeader: {
    marginBottom: "32px"
  },

  breadcrumbWrapper: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    marginBottom: "12px",
    fontSize: "13px",
    fontWeight: "600"
  },

  breadcrumb: {
    color: "#2563eb",
    cursor: "pointer"
  },

  breadcrumbSeparator: {
    color: "#94a3b8"
  },

  breadcrumbActive: {
    color: "#64748b"
  },

  pageTitle: {
    fontSize: "30px",
    fontWeight: "800",
    color: "#1e293b",
    margin: "0 0 6px 0"
  },

  pageSubtitle: {
    fontSize: "14px",
    color: "#64748b",
    margin: 0
  },

  errorBanner: {
    backgroundColor: "#fef2f2",
    color: "#dc2626",
    padding: "14px",
    borderRadius: "10px",
    fontSize: "14px",
    marginBottom: "24px",
    border: "1px solid #fee2e2",
    fontWeight: "500"
  },

  emptyStateText: {
    color: "#64748b",
    fontSize: "14px"
  },

  tabContainer: {
    display: "flex",
    gap: "12px",
    borderBottom: "2px solid #e2e8f0",
    paddingBottom: "12px",
    marginBottom: "24px",
    flexWrap: "wrap"
  },

  tabButton: {
    padding: "10px 18px",
    fontSize: "14px",
    fontWeight: "600",
    color: "#64748b",
    background: "none",
    border: "none",
    cursor: "pointer",
    borderRadius: "8px",
    transition: "all 0.2s"
  },

  tabButtonActive: {
    backgroundColor: "#eff6ff",
    color: "#2563eb"
  },

  resourceList: {
    display: "flex",
    flexDirection: "column",
    gap: "14px"
  },

  resourceRow: {
    backgroundColor: "#ffffff",
    padding: "18px 24px",
    borderRadius: "14px",
    border: "1px solid #e2e8f0",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    boxShadow: "0 2px 10px rgba(15, 23, 42, 0.03)"
  },

  resourceMetaInfo: {
    display: "flex",
    alignItems: "center",
    gap: "16px"
  },

  rowIcon: {
    fontSize: "20px"
  },

  resourceItemTitle: {
    margin: "0 0 4px 0",
    fontSize: "15px",
    fontWeight: "700",
    color: "#1e293b"
  },

  resourceItemSub: {
    margin: 0,
    fontSize: "13px",
    color: "#64748b"
  },

  actionAnchorButton: {
    textDecoration: "none",
    backgroundColor: "#2563eb",
    color: "white",
    padding: "9px 16px",
    borderRadius: "8px",
    fontSize: "13px",
    fontWeight: "600"
  },

  noLinkText: {
    fontSize: "13px",
    color: "#94a3b8",
    fontWeight: "600"
  }
};

export default SubjectResourcesPage;