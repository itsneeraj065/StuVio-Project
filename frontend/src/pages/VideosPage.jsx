import { useState } from "react";

function VideosPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedVideo, setSelectedVideo] = useState(null);

  const videosData = [
    {
      id: "1",
      title: "Lecture 12: Process Synchronization & Classic Semaphore Problems",
      subject: "CS-402",
      duration: "45:12",
      instructor: "Dr. A. K. Sharma",
      embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Replace with actual course material embed
      thumbnail: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&auto=format&fit=crop&q=60"
    },
    {
      id: "2",
      title: "Lecture 14: Distributed Deadlock Prevention & Recovery Strategies",
      subject: "CS-402",
      duration: "52:40",
      instructor: "Dr. A. K. Sharma",
      embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      thumbnail: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&auto=format&fit=crop&q=60"
    },
    {
      id: "3",
      title: "Algorithms Workshop: Backtracking & Dynamic Programming Analysis",
      subject: "CS-406",
      duration: "1:15:30",
      instructor: "Prof. R. N. Verma",
      embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      thumbnail: "https://images.unsplash.com/photo-1607799279861-4dd421887fb3?w=600&auto=format&fit=crop&q=60"
    },
    {
      id: "4",
      title: "Network Security: Practical Demonstration of MitM Attacks & SSL Stripping",
      subject: "CS-408",
      duration: "38:15",
      instructor: "Dr. S. Srivastava",
      embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      thumbnail: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&auto=format&fit=crop&q=60"
    }
  ];

  const filteredVideos = videosData.filter(video => 
    video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    video.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={styles.canvas}>
      <div style={styles.headerRow}>
        <div>
          <h2 style={styles.heading}>Lecture Video Archives</h2>
          <p style={styles.subheading}>Review stream recordings, live-session backups, and custom tutorial modules.</p>
        </div>
        
        {/* Search Input */}
        <input 
          type="text" 
          placeholder="Search videos by title or code..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={styles.searchBar}
        />
      </div>

      {/* Embedded Video Theater (Displays when a video card is clicked) */}
      {selectedVideo && (
        <div style={styles.theaterContainer}>
          <div style={styles.theaterHeader}>
            <div>
              <span style={styles.theaterSubject}>{selectedVideo.subject}</span>
              <h3 style={styles.theaterTitle}>{selectedVideo.title}</h3>
            </div>
            <button style={styles.closeBtn} onClick={() => setSelectedVideo(null)}>Close Theater ✕</button>
          </div>
          <div style={styles.videoWrapper}>
            <iframe
              src={selectedVideo.embedUrl}
              title={selectedVideo.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={styles.iframe}
            ></iframe>
          </div>
        </div>
      )}

      {/* Grid List */}
      <div style={styles.grid}>
        {filteredVideos.map((video) => (
          <div key={video.id} style={styles.card} onClick={() => setSelectedVideo(video)}>
            <div style={styles.thumbnailWrapper}>
              <img src={video.thumbnail} alt={video.title} style={styles.thumbnail} />
              <div style={styles.durationBadge}>{video.duration}</div>
              <div style={styles.playHoverOverlay}>
                <span style={styles.playIcon}>▶</span>
              </div>
            </div>
            <div style={styles.cardBody}>
              <span style={styles.subBadge}>{video.subject}</span>
              <h4 style={styles.videoTitle}>{video.title}</h4>
              <p style={styles.instructorText}>By {video.instructor}</p>
            </div>
          </div>
        ))}
        {filteredVideos.length === 0 && (
          <div style={styles.emptyState}>No lecture streams found matching your search.</div>
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
    gap: "20px"
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
  searchBar: {
    padding: "12px 20px",
    backgroundColor: "rgba(255, 255, 255, 0.03)",
    border: "1px solid rgba(255, 255, 255, 0.05)",
    borderRadius: "14px",
    color: "#ffffff",
    fontSize: "13px",
    width: "300px",
    outline: "none",
    transition: "border-color 0.2s"
  },
  theaterContainer: {
    backgroundColor: "rgba(30, 41, 59, 0.15)",
    border: "1px solid rgba(99, 102, 241, 0.2)",
    borderRadius: "22px",
    padding: "24px",
    display: "flex",
    flexDirection: "column",
    gap: "20px"
  },
  theaterHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: "16px"
  },
  theaterSubject: {
    fontSize: "11px",
    fontWeight: "700",
    color: "#818cf8",
    backgroundColor: "rgba(99, 102, 241, 0.1)",
    padding: "4px 8px",
    borderRadius: "6px"
  },
  theaterTitle: {
    fontSize: "18px",
    fontWeight: "700",
    color: "#ffffff",
    marginTop: "8px",
    margin: 0
  },
  closeBtn: {
    backgroundColor: "rgba(239, 68, 68, 0.1)",
    color: "#f87171",
    border: "1px solid rgba(239, 68, 68, 0.2)",
    padding: "6px 14px",
    borderRadius: "10px",
    cursor: "pointer",
    fontSize: "12px",
    fontWeight: "600",
    transition: "all 0.2s"
  },
  videoWrapper: {
    position: "relative",
    paddingBottom: "56.25%", /* 16:9 Aspect Ratio */
    height: 0,
    borderRadius: "14px",
    overflow: "hidden",
    border: "1px solid rgba(255, 255, 255, 0.05)"
  },
  iframe: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%"
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: "24px"
  },
  card: {
    backgroundColor: "rgba(30, 41, 59, 0.15)",
    border: "1px solid rgba(255, 255, 255, 0.04)",
    borderRadius: "20px",
    overflow: "hidden",
    cursor: "pointer",
    transition: "transform 0.2s, border-color 0.2s"
  },
  thumbnailWrapper: {
    position: "relative",
    aspectRatio: "16/9",
    overflow: "hidden",
    backgroundColor: "#020617"
  },
  thumbnail: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    opacity: 0.8
  },
  durationBadge: {
    position: "absolute",
    bottom: "10px",
    right: "10px",
    backgroundColor: "rgba(0, 0, 0, 0.75)",
    color: "#ffffff",
    fontSize: "11px",
    fontWeight: "600",
    padding: "2px 6px",
    borderRadius: "4px"
  },
  playHoverOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(99, 102, 241, 0.2)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    opacity: 0,
    transition: "opacity 0.2s"
  },
  playIcon: {
    fontSize: "28px",
    color: "#ffffff"
  },
  cardBody: {
    padding: "20px"
  },
  subBadge: {
    fontSize: "10px",
    fontWeight: "700",
    color: "#818cf8"
  },
  videoTitle: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#ffffff",
    margin: "8px 0",
    lineHeight: "1.4"
  },
  instructorText: {
    fontSize: "12px",
    color: "#64748b",
    margin: 0
  },
  emptyState: {
    gridColumn: "1 / -1",
    textAlign: "center",
    color: "#64748b",
    padding: "40px"
  }
};

export default VideosPage;