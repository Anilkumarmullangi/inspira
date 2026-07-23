import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import API from "../api/axios";

export default function Profile() {
  const navigate = useNavigate();

  /* ===========================
      STATES
  =========================== */

  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [activeTab, setActiveTab] = useState("posts");
  const [hoveredPost, setHoveredPost] = useState(null);

  const isMobile = window.innerWidth <= 768;

  /* ===========================
      FETCH PROFILE
  =========================== */

  const fetchProfile = async () => {
    try {
      const res = await API.get("/users/me");

      if (res.data.success) {
        setUser(res.data.user);
      }
    } catch (err) {
      console.error(err);

      setError("Unable to load profile.");
    }
  };

  /* ===========================
      FETCH MY POSTS
  =========================== */

  const fetchPosts = async () => {
    try {
      const res = await API.get("/posts/me");

      if (res.data.success) {
        setPosts(res.data.posts);
      }
    } catch (err) {
      console.error(err);

      setError("Unable to load posts.");
    }
  };

  /* ===========================
      LOAD PAGE
  =========================== */

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);

      await Promise.all([
        fetchProfile(),
        fetchPosts(),
      ]);

      setLoading(false);
    };

    loadData();
  }, []);

  /* ===========================
      TABS
  =========================== */

  const tabs = [
    {
      id: "posts",
      label: "Posts",
      count: posts.length,
    },
    {
      id: "saved",
      label: "Saved",
      count: 0,
    },
    {
      id: "tagged",
      label: "Tagged",
      count: 0,
    },
    {
      id: "analytics",
      label: "Analytics ✦",
      count: null,
    },
  ];

  /* ===========================
      LOADING
  =========================== */

  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#0a0a0a",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "#fff",
          fontSize: "22px",
        }}
      >
        Loading Profile...
      </div>
    );
  }

  /* ===========================
      ERROR
  =========================== */

  if (error) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#0a0a0a",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "#ff5c5c",
          fontSize: "20px",
        }}
      >
        {error}
      </div>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "#0a0a0a",
        fontFamily: "'Outfit', sans-serif",
      }}
    >
      <Sidebar />

      <main
        style={{
          flex: 1,
          overflowY: "auto",
        }}
      >

                {/* ===========================
              COVER
        =========================== */}

        <div
          style={{
            height: "140px",
            background:
              "linear-gradient(135deg,#1a1208,#0f0f1a,#0a1520)",
            position: "relative",
          }}
        >
          <button
            style={{
              position: "absolute",
              top: "1rem",
              right: "1rem",
              background: "rgba(10,10,10,0.6)",
              border: "1px solid #2a2a2a",
              borderRadius: "8px",
              padding: "0.45rem 0.9rem",
              color: "#888",
              cursor: "pointer",
              backdropFilter: "blur(10px)",
            }}
          >
            Edit Cover
          </button>
        </div>

        <div
          style={{
            padding: "0 3vw",
            maxWidth: "1000px",
            margin: "0 auto",
          }}
        >
          {/* ===========================
                PROFILE HEADER
          =========================== */}

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              marginTop: "-45px",
              marginBottom: "2rem",
              flexWrap: "wrap",
              gap: "20px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "flex-end",
                gap: "20px",
              }}
            >
              {/* Avatar */}

              <div
                style={{
                  width: "110px",
                  height: "110px",
                  borderRadius: "50%",
                  overflow: "hidden",
                  border: "4px solid #0a0a0a",
                  background:
                    "linear-gradient(135deg,#e8c97e,#d8b15a)",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: "40px",
                  fontWeight: "bold",
                  color: "#111",
                  flexShrink: 0,
                }}
              >
                {user?.profilePic ? (
                  <img
                    src={user.profilePic}
                    alt="Profile"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  user?.fullName?.charAt(0).toUpperCase()
                )}
              </div>

              {/* Name */}

              <div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <h1
                    style={{
                      margin: 0,
                      color: "#f0ede8",
                      fontSize: "32px",
                      fontFamily:
                        "'Cormorant Garamond', serif",
                    }}
                  >
                    {user?.fullName}
                  </h1>

                  {user?.isVerified && (
                    <span
                      style={{
                        width: "20px",
                        height: "20px",
                        borderRadius: "50%",
                        background: "#e8c97e",
                        color: "#111",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        fontSize: "12px",
                        fontWeight: "bold",
                      }}
                    >
                      ✓
                    </span>
                  )}
                </div>

                <div
                  style={{
                    color: "#777",
                    marginTop: "5px",
                  }}
                >
                  @{user?.username}
                </div>
              </div>
            </div>

            {/* Buttons */}

            <div
              style={{
                display: "flex",
                gap: "12px",
              }}
            >
              <button
                onClick={() => navigate("/settings")}
                style={{
                  background: "transparent",
                  border: "1px solid #333",
                  color: "#fff",
                  padding: "10px 20px",
                  borderRadius: "30px",
                  cursor: "pointer",
                }}
              >
                Edit Profile
              </button>

              <button
                style={{
                  background: "transparent",
                  border: "1px solid #333",
                  color: "#fff",
                  padding: "10px 20px",
                  borderRadius: "30px",
                  cursor: "pointer",
                }}
              >
                Share Profile
              </button>
            </div>
          </div>

          {/* ===========================
                BIO
          =========================== */}

          <div
            style={{
              marginBottom: "30px",
            }}
          >
            <p
              style={{
                color: "#aaa",
                lineHeight: 1.7,
                marginBottom: "10px",
              }}
            >
              {user?.bio || "No bio added yet."}
            </p>

            {user?.website && (
              <a
                href={user.website}
                target="_blank"
                rel="noreferrer"
                style={{
                  color: "#e8c97e",
                  textDecoration: "none",
                }}
              >
                🔗 {user.website}
              </a>
            )}
          </div>

          {/* ===========================
                STATS
          =========================== */}

          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile
                ? "repeat(2,1fr)"
                : "repeat(4,1fr)",
              gap: "1px",
              background: "#2a2a2a",
              borderRadius: "14px",
              overflow: "hidden",
              marginBottom: "2rem",
              border: "1px solid #2a2a2a",
            }}
          >
            {[
              {
                label: "Posts",
                value: posts.length,
              },
              {
                label: "Followers",
                value: user?.followers?.length || 0,
              },
              {
                label: "Following",
                value: user?.following?.length || 0,
              },
              {
                label: "Email",
                value: user?.email || "-",
              },
            ].map((stat) => (
              <div
                key={stat.label}
                style={{
                  background: "#111",
                  padding: "20px",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    fontSize: "28px",
                    color: "#fff",
                    fontFamily:
                      "'Cormorant Garamond', serif",
                  }}
                >
                  {stat.value}
                </div>

                <div
                  style={{
                    color: "#777",
                    marginTop: "6px",
                    fontSize: "13px",
                  }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* ===========================
                PROFILE TABS
          =========================== */}

          <div
            style={{
              display: "flex",
              gap: "12px",
              marginBottom: "2rem",
              borderBottom: "1px solid #222",
              overflowX: "auto",
              paddingBottom: "12px",
            }}
          >
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  padding: "10px 18px",
                  borderRadius: "30px",
                  border:
                    activeTab === tab.id
                      ? "1px solid #e8c97e"
                      : "1px solid #2a2a2a",
                  background:
                    activeTab === tab.id
                      ? "#e8c97e"
                      : "transparent",
                  color:
                    activeTab === tab.id
                      ? "#111"
                      : "#aaa",
                  cursor: "pointer",
                  transition: "0.3s",
                  whiteSpace: "nowrap",
                  fontWeight: 600,
                }}
              >
                {tab.label}
                {tab.count !== null && ` (${tab.count})`}
              </button>
            ))}
          </div>

          {/* ===========================
                POSTS TAB
          =========================== */}

          {activeTab === "posts" && (
            <>
              {posts.length === 0 ? (
                <div
                  style={{
                    textAlign: "center",
                    padding: "80px 0",
                    color: "#666",
                  }}
                >
                  <h2
                    style={{
                      color: "#ddd",
                      marginBottom: "10px",
                    }}
                  >
                    No Posts Yet
                  </h2>

                  <p>
                    Share your first moment on Inspira ✨
                  </p>
                </div>
              ) : (
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns:
                      "repeat(auto-fill,minmax(260px,1fr))",
                    gap: "22px",
                    marginBottom: "50px",
                  }}
                >
                  {posts.map((post) => (
                    <div
                      key={post._id}
                      onMouseEnter={() =>
                        setHoveredPost(post._id)
                      }
                      onMouseLeave={() =>
                        setHoveredPost(null)
                      }
                      style={{
                        background: "#111",
                        border: "1px solid #222",
                        borderRadius: "18px",
                        overflow: "hidden",
                        transition: ".35s",
                        transform:
                          hoveredPost === post._id
                            ? "translateY(-6px)"
                            : "translateY(0)",
                        boxShadow:
                          hoveredPost === post._id
                            ? "0 12px 30px rgba(0,0,0,.45)"
                            : "none",
                      }}
                    >
                      <div
                        style={{
                          height: "270px",
                          overflow: "hidden",
                        }}
                      >
                        <img
                          src={post.image}
                          alt=""
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                        />
                      </div>

                      <div
                        style={{
                          padding: "16px",
                        }}
                      >
                        <p
                          style={{
                            color: "#ddd",
                            marginBottom: "14px",
                            lineHeight: 1.6,
                          }}
                        >
                          {post.caption}
                        </p>

                        <div
                          style={{
                            display: "flex",
                            justifyContent:
                              "space-between",
                            color: "#888",
                            fontSize: "14px",
                          }}
                        >
                          <span>
                            ❤️ {post.likes?.length || 0}
                          </span>

                          <span>
                            💬 {post.comments?.length || 0}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {/* ===========================
                SAVED
          =========================== */}

          {activeTab === "saved" && (
            <div
              style={{
                textAlign: "center",
                padding: "90px 0",
                color: "#666",
              }}
            >
              <h2 style={{ color: "#ddd" }}>
                Saved Posts
              </h2>

              <p>No saved posts available.</p>
            </div>
          )}

          {/* ===========================
                TAGGED
          =========================== */}

          {activeTab === "tagged" && (
            <div
              style={{
                textAlign: "center",
                padding: "90px 0",
                color: "#666",
              }}
            >
              <h2 style={{ color: "#ddd" }}>
                Tagged Posts
              </h2>

              <p>No tagged posts found.</p>
            </div>
          )}

          {/* ===========================
                ANALYTICS
          =========================== */}

          {activeTab === "analytics" && (
            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit,minmax(230px,1fr))",
                gap: "20px",
                marginBottom: "50px",
              }}
            >
              {[
                {
                  title: "Total Posts",
                  value: posts.length,
                },
                {
                  title: "Total Likes",
                  value: posts.reduce(
                    (a, p) =>
                      a + (p.likes?.length || 0),
                    0
                  ),
                },
                {
                  title: "Comments",
                  value: posts.reduce(
                    (a, p) =>
                      a + (p.comments?.length || 0),
                    0
                  ),
                },
                {
                  title: "Followers",
                  value:
                    user?.followers?.length || 0,
                },
              ].map((card) => (
                <div
                  key={card.title}
                  style={{
                    background: "#111",
                    border: "1px solid #222",
                    borderRadius: "18px",
                    padding: "28px",
                  }}
                >
                  <div
                    style={{
                      color: "#888",
                      marginBottom: "12px",
                    }}
                  >
                    {card.title}
                  </div>

                  <div
                    style={{
                      fontSize: "34px",
                      color: "#fff",
                      fontWeight: "bold",
                    }}
                  >
                    {card.value}
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      </main>
    </div>
  );
}