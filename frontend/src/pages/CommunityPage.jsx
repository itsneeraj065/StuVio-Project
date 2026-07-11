import { useState } from "react";
import { useNavigate } from "react-router-dom";

// HOVER WRAPPER COMPONENT
const HoverCard = ({ children, style }) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div
      style={{
        ...style,
        boxShadow: isHovered ? "0 10px 15px -3px rgba(0,0,0,0.1)" : "0 1px 3px rgba(0,0,0,0.1)",
        transform: isHovered ? "translateY(-2px)" : "translateY(0)",
        borderColor: isHovered ? "#cbd5e1" : "#e2e8f0",
        transition: "all 0.2s ease"
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
    </div>
  );
};

function CommunityPage() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  
  const currentUser = { name: "Sam Wilson", avatar: "S", major: "Computer Science & Engineering" };
  const [newPostText, setNewPostText] = useState("");
  const [newPostCategory, setNewPostCategory] = useState("General");

  // NEW GROUP STATE
  const [groups, setGroups] = useState([{ id: 1, name: "DBMS Study Group", members: ["Alex", "You"] }]);
  const [newGroupName, setNewGroupName] = useState("");

  const handleCreateGroup = (e) => {
    e.preventDefault();
    if (!newGroupName.trim()) return;
    setGroups([...groups, { id: Date.now(), name: newGroupName, members: ["You"] }]);
    setNewGroupName("");
  };

  const inviteFriend = (groupId) => {
    setGroups(groups.map(g => g.id === groupId ? { ...g, members: [...g.members, "New Peer"] } : g));
  };

  const [posts, setPosts] = useState([
    { id: 1, author: "Alex Rivera", avatar: "A", role: "Student", tag: "Computer Science", title: "Stuck on SQL Join optimization query for Assignment 3", content: "Does anyone have resource tips on optimizing nested SELECT queries for the DBMS assignment?", upvotes: 14, replies: 5, timeAgo: "2 hours ago", hasUpvoted: false },
    { id: 2, author: "Dr. Sarah Jenkins", avatar: "SJ", role: "Instructor", tag: "Mathematics", title: "Office Hours update for Linear Algebra", content: "Hello everyone, I have uploaded the comprehensive vector calculus review sheet.", upvotes: 38, replies: 12, timeAgo: "5 hours ago", hasUpvoted: true }
  ]);

  const categories = ["All", "Computer Science", "DBMS" ,  "Mathematics", "Design", "General"];

  const handleUpvote = (postId) => {
    setPosts(posts.map(post => post.id === postId ? { ...post, upvotes: post.hasUpvoted ? post.upvotes - 1 : post.upvotes + 1, hasUpvoted: !post.hasUpvoted } : post));
  };

  const handleCreatePost = (e) => {
    e.preventDefault();
    if (!newPostText.trim()) return;
    const newPost = { id: Date.now(), author: currentUser.name, avatar: currentUser.avatar, role: "Student", tag: newPostCategory, title: newPostText.substring(0, 80), content: newPostText, upvotes: 0, replies: 0, timeAgo: "Just now", hasUpvoted: false };
    setPosts([newPost, ...posts]);
    setNewPostText("");
  };

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || post.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeFilter === "All" || post.tag === activeFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <div>
          <h1 style={styles.title}>Student Community Forum 💬</h1>
          <p style={styles.subtitle}>Share ideas and collaborate with peers.</p>
        </div>
        <button style={styles.backButton} onClick={() => navigate("/dashboard")}>← Back to Dashboard</button>
      </header>

      <div style={styles.mainLayout}>
        <div style={styles.feedSection}>
          {/* GROUP CREATION BOX */}
          <HoverCard style={styles.createCard}>
            <h4 style={{marginTop: 0}}>Create New Study Group</h4>
            <form onSubmit={handleCreateGroup} style={{ display: "flex", gap: "10px" }}>
              <input placeholder="Group Name..." value={newGroupName} onChange={(e) => setNewGroupName(e.target.value)} style={styles.searchInput} />
              <button type="submit" style={styles.submitBtn}>Create</button>
            </form>
          </HoverCard>

          {/* EXISTING POST FEED */}
          <div style={styles.toolbar}>
            <input type="text" placeholder="Search discussions..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} style={styles.searchInput} />
            <div style={styles.filterGroup}>
              {categories.map((cat) => (
                <button key={cat} onClick={() => setActiveFilter(cat)} style={{ ...styles.filterBtn, ...(activeFilter === cat ? styles.filterBtnActive : {}) }}>{cat}</button>
              ))}
            </div>
          </div>

          <div style={styles.postFeed}>
            {filteredPosts.map((post) => (
              <HoverCard key={post.id} style={styles.postCard}>
                <div style={styles.postMetaRow}>
                  <div style={styles.authorCluster}>
                    <div style={{ ...styles.postAvatar, backgroundColor: post.role === "Instructor" ? "#dc2626" : "#2563eb" }}>{post.avatar}</div>
                    <div>
                      <div style={styles.authorName}>{post.author}</div>
                      <span style={styles.timeText}>{post.timeAgo}</span>
                    </div>
                  </div>
                  <span style={styles.postTag}>{post.tag}</span>
                </div>
                <h3 style={styles.postTitle}>{post.title}</h3>
                <p style={styles.postContent}>{post.content}</p>
                <div style={styles.actionRow}>
                  <button style={{...styles.actionBtn, ...(post.hasUpvoted ? styles.actionBtnActive : {})}} onClick={() => handleUpvote(post.id)}>🔺 Upvote ({post.upvotes})</button>
                </div>
              </HoverCard>
            ))}
          </div>
        </div>

        <div style={styles.sidebarSection}>
          {/* UPDATED SIDEBAR WITH GROUPS */}
          <HoverCard style={styles.channelsBox}>
            <h4 style={styles.infoTitle}>Your Study Groups</h4>
            {groups.map(group => (
              <div key={group.id} style={{ marginBottom: "15px" }}>
                <div style={styles.channelRow}>
                  {group.name}
                  <button onClick={() => inviteFriend(group.id)} style={styles.miniBtn}>+ Invite</button>
                </div>
                <div style={{ fontSize: "10px", color: "#94a3b8" }}>{group.members.length} members</div>
              </div>
            ))}
          </HoverCard>
          
          <HoverCard style={styles.infoBox}>
            <h4 style={styles.infoTitle}>Community Guidelines</h4>
            <p style={styles.infoText}>🤝 Be respectful, supportive, and collaborative.</p>
            <p style={styles.infoText}>🤝 Be respectful, supportive, and collaborative.</p>
            <p style={styles.infoText}>🤝 Be respectful, supportive, and collaborative.</p>
            <p style={styles.infoText}>🤝 Be respectful, supportive, and collaborative.</p>

          </HoverCard>
        </div>
      </div>
    </div>
  );
}

// Ensure you keep your existing styles object below and add these additions:
const styles = { 
    page: {
    minHeight: "100vh",
    backgroundColor: "#f8fafc",
    padding: "40px",
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    boxSizing: "border-box"
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: "32px"
  },
  title: {
    fontSize: "30px",
    fontWeight: "800",
    color: "#1e293b",
    margin: "0 0 6px 0"
  },
  subtitle: {
    color: "#64748b",
    fontSize: "15px",
    margin: 0
  },
  backButton: {
    backgroundColor: "#ffffff",
    color: "#64748b",
    border: "1px solid #e2e8f0",
    padding: "10px 16px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "14px"
  },
  mainLayout: {
    display: "grid",
    gridTemplateColumns: "2.5fr 1fr",
    gap: "32px",
    alignItems: "start"
  },
  feedSection: {
    display: "flex",
    flexDirection: "column",
    gap: "24px"
  },
  toolbar: {
    display: "flex",
    flexDirection: "column",
    gap: "16px"
  },
  searchInput: {
    padding: "14px 16px",
    borderRadius: "10px",
    border: "1px solid #e2e8f0",
    fontSize: "15px",
    backgroundColor: "#ffffff",
    width: "100%",
    outline: "none",
    boxSizing: "border-box"
  },
  filterGroup: {
    display: "flex",
    gap: "8px",
    flexWrap: "wrap"
  },
  filterBtn: {
    padding: "8px 16px",
    borderRadius: "20px",
    border: "1px solid #e2e8f0",
    backgroundColor: "#ffffff",
    color: "#64748b",
    fontSize: "13px",
    fontWeight: "600",
    cursor: "pointer"
  },
  filterBtnActive: {
    backgroundColor: "#2563eb",
    borderColor: "#2563eb",
    color: "#ffffff"
  },
  createCard: {
    backgroundColor: "#ffffff",
    border: "1px solid #e2e8f0",
    borderRadius: "12px",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "14px"
  },
  createHeader: {
    display: "flex",
    alignItems: "center",
    gap: "12px"
  },
  miniAvatar: {
    width: "32px",
    height: "32px",
    borderRadius: "50%",
    backgroundColor: "#2563eb",
    color: "#ffffff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "700",
    fontSize: "14px"
  },
  createPrompt: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#475569",
    flexGrow: 1
  },
  categorySelect: {
    padding: "6px 12px",
    borderRadius: "6px",
    border: "1px solid #e2e8f0",
    fontSize: "13px",
    fontWeight: "600",
    color: "#334155",
    backgroundColor: "#f8fafc",
    outline: "none"
  },
  textarea: {
    width: "100%",
    border: "1px solid #e2e8f0",
    borderRadius: "8px",
    padding: "12px",
    fontSize: "14px",
    fontFamily: "inherit",
    outline: "none",
    resize: "none",
    boxSizing: "border-box"
  },
  createFooter: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "4px"
  },
  postingAs: {
    fontSize: "12px",
    color: "#94a3b8"
  },
  submitBtn: {
    backgroundColor: "#2563eb",
    color: "#ffffff",
    border: "none",
    padding: "8px 16px",
    borderRadius: "6px",
    fontSize: "13px",
    fontWeight: "600",
    cursor: "pointer"
  },
  postFeed: {
    display: "flex",
    flexDirection: "column",
    gap: "16px"
  },
  postCard: {
    backgroundColor: "#ffffff",
    border: "1px solid #e2e8f0",
    borderRadius: "12px",
    padding: "24px",
    display: "flex",
    flexDirection: "column"
  },
  postMetaRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: "14px"
  },
  authorCluster: {
    display: "flex",
    alignItems: "center",
    gap: "12px"
  },
  postAvatar: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    color: "#ffffff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "700"
  },
  authorName: {
    fontSize: "14px",
    fontWeight: "700",
    color: "#1e293b",
    display: "flex",
    alignItems: "center",
    gap: "8px"
  },
  roleBadge: {
    fontSize: "11px",
    fontWeight: "700",
    padding: "2px 8px",
    borderRadius: "12px"
  },
  timeText: {
    fontSize: "12px",
    color: "#94a3b8"
  },
  postTag: {
    fontSize: "11px",
    fontWeight: "700",
    color: "#2563eb",
    backgroundColor: "#eff6ff",
    padding: "4px 10px",
    borderRadius: "12px"
  },
  postTitle: {
    fontSize: "17px",
    fontWeight: "700",
    color: "#1e293b",
    margin: "0 0 8px 0"
  },
  postContent: {
    fontSize: "14px",
    color: "#475569",
    lineHeight: "1.5",
    margin: "0 0 16px 0"
  },
  actionRow: {
    display: "flex",
    gap: "12px",
    borderTop: "1px solid #f1f5f9",
    paddingTop: "14px"
  },
  actionBtn: {
    backgroundColor: "#f8fafc",
    border: "1px solid #e2e8f0",
    color: "#64748b",
    padding: "6px 14px",
    borderRadius: "6px",
    fontSize: "13px",
    fontWeight: "600",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "4px"
  },
  actionBtnActive: {
    backgroundColor: "#eff6ff",
    borderColor: "#bfdbfe",
    color: "#2563eb"
  },
  sidebarSection: {
    display: "flex",
    flexDirection: "column",
    gap: "20px"
  },
  infoBox: {
    backgroundColor: "#ffffff",
    border: "1px solid #e2e8f0",
    borderRadius: "12px",
    padding: "20px"
  },
  infoTitle: {
    fontSize: "14px",
    fontWeight: "700",
    color: "#1e293b",
    margin: "0 0 12px 0"
  },
  infoText: {
    fontSize: "13px",
    color: "#475569",
    lineHeight: "1.4",
    margin: "0 0 10px 0"
  },
  channelsBox: {
    backgroundColor: "#ffffff",
    border: "1px solid #e2e8f0",
    borderRadius: "12px",
    padding: "20px"
  },
  channelRow: {
    fontSize: "13px",
    fontWeight: "600",
    color: "#475569",
    padding: "8px 0",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between"
  },
  activeDot: {
    color: "#22c55e",
    fontSize: "10px"
  },
  emptyState: {
    textAlign: "center",
    padding: "40px",
    backgroundColor: "#ffffff",
    borderRadius: "12px",
    border: "1px dashed #e2e8f0"
  },
  emptyText: {
    color: "#64748b",
    margin: 0
  } ,

  // ... Keep all your original 568-line styles ...
  // JUST ADD THESE TO THE EXISTING STYLE OBJECT:
  miniBtn: { fontSize: "10px", 
    padding: "4px 8px",
     borderRadius: "6px", border: "none",
      backgroundColor: "#eff6ff", 
      color: "#2563eb",
       cursor: "pointer",
     fontWeight: "bold" },
  
  // Ensure your existing postCard and other containers are wrapped in the HoverCard or have these props:
  // (The HoverCard component already applies the boxShadow/transform logic)
};


export default CommunityPage;