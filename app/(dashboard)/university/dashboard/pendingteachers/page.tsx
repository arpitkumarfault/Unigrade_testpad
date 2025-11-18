"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

interface Teacher {
  _id: string;
  name: string;
  email: string;
  department: string;
  universityEmail: string;
  createdAt: string;
}

export default function PendingApprovalsPage() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterDept, setFilterDept] = useState("all");

  useEffect(() => {
    fetchPendingTeachers();
  }, []);

  const fetchPendingTeachers = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/admin/pending-teachers");
      setTeachers(res.data.teachers || []);
    } catch (error) {
      toast.error("Failed to load pending approvals");
    } finally {
      setLoading(false);
    }
  };

  const handleApproval = async (teacherId: string, approved: boolean) => {
    setProcessingId(teacherId);
    const toastId = toast.loading(approved ? "Approving teacher..." : "Rejecting teacher...");

    try {
      await axios.post("/api/admin/approve-teacher", {
        teacherId,
        approved,
        universityCode: "UNIV2025", 
      });

      toast.success(
        approved ? "Teacher approved successfully!" : "Teacher rejected",
        { id: toastId }
      );

      // Remove from list
      setTeachers((prev) => prev.filter((t) => t._id !== teacherId));
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Action failed", { id: toastId });
    } finally {
      setProcessingId(null);
    }
  };

  // Filter logic
  const filteredTeachers = teachers.filter((teacher) => {
    const matchesSearch =
      teacher.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      teacher.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      teacher.department.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDept = filterDept === "all" || teacher.department === filterDept;
    return matchesSearch && matchesDept;
  });

  const departments = Array.from(new Set(teachers.map((t) => t.department)));

  return (
    <div style={{ padding: "0.5rem" }}>
      {/* Header Section */}
      <div
        style={{
          background: "linear-gradient(135deg, var(--color-secondary) 0%, var(--color-primary) 100%)",
          borderRadius: "1rem",
          padding: "2rem",
          color: "white",
          marginBottom: "1.5rem",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <h1 style={{ fontSize: "clamp(1.5rem, 4vw, 2.5rem)", fontWeight: 700, marginBottom: "0.5rem" }}>
              Pending Teacher Approvals
            </h1>
            <p style={{ opacity: 0.9, fontSize: "1rem" }}>
              Review and approve teacher registration requests
            </p>
          </div>
          <div
            style={{
              background: "rgba(255, 255, 255, 0.2)",
              backdropFilter: "blur(10px)",
              padding: "1rem 1.5rem",
              borderRadius: "1rem",
              textAlign: "center",
            }}
          >
            <p style={{ fontSize: "2.5rem", fontWeight: 700, marginBottom: "0.25rem" }}>
              {filteredTeachers.length}
            </p>
            <p style={{ fontSize: "0.875rem", opacity: 0.9 }}>Pending Requests</p>
          </div>
        </div>
      </div>

      {/* Filters & Search Bar */}
      <div
        style={{
          background: "var(--color-surface)",
          border: "1px solid var(--color-border)",
          borderRadius: "1rem",
          padding: "1.5rem",
          marginBottom: "1.5rem",
        }}
      >
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "1rem" }} className="md:grid-cols-2">
          {/* Search */}
          <div>
            <label style={{ display: "block", fontSize: "0.875rem", fontWeight: 600, color: "var(--color-text)", marginBottom: "0.5rem" }}>
              Search Teachers
            </label>
            <div style={{ position: "relative" }}>
              <input
                type="text"
                placeholder="Search by name, email, or department..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: "100%",
                  padding: "0.75rem 1rem 0.75rem 3rem",
                  borderRadius: "0.5rem",
                  border: "1px solid var(--color-border)",
                  background: "var(--color-bg)",
                  color: "var(--color-text)",
                  fontSize: "0.875rem",
                }}
              />
              <span style={{ position: "absolute", left: "1rem", top: "50%", transform: "translateY(-50%)", fontSize: "1.25rem" }}>
                🔍
              </span>
            </div>
          </div>

          {/* Department Filter */}
          <div>
            <label style={{ display: "block", fontSize: "0.875rem", fontWeight: 600, color: "var(--color-text)", marginBottom: "0.5rem" }}>
              Filter by Department
            </label>
            <select
              value={filterDept}
              onChange={(e) => setFilterDept(e.target.value)}
              style={{
                width: "100%",
                padding: "0.75rem 1rem",
                borderRadius: "0.5rem",
                border: "1px solid var(--color-border)",
                background: "var(--color-bg)",
                color: "var(--color-text)",
                fontSize: "0.875rem",
                cursor: "pointer",
              }}
            >
              <option value="all">All Departments</option>
              {departments.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div
          style={{
            background: "var(--color-surface)",
            border: "1px solid var(--color-border)",
            borderRadius: "1rem",
            padding: "3rem",
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>⏳</div>
          <p style={{ color: "var(--color-text-muted)" }}>Loading pending approvals...</p>
        </div>
      )}

      {/* Empty State */}
      {!loading && filteredTeachers.length === 0 && (
        <div
          style={{
            background: "var(--color-surface)",
            border: "1px solid var(--color-border)",
            borderRadius: "1rem",
            padding: "3rem",
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>✅</div>
          <h3 style={{ fontSize: "1.5rem", fontWeight: 700, color: "var(--color-text)", marginBottom: "0.5rem" }}>
            All Caught Up!
          </h3>
          <p style={{ color: "var(--color-text-muted)" }}>
            {searchQuery || filterDept !== "all"
              ? "No teachers match your search criteria"
              : "No pending teacher approvals at the moment"}
          </p>
        </div>
      )}

      {/* Teacher Cards - Mobile Friendly */}
      <div style={{ display: "grid", gap: "1rem" }}>
        {filteredTeachers.map((teacher) => (
          <div
            key={teacher._id}
            style={{
              background: "var(--color-surface)",
              border: "1px solid var(--color-border)",
              borderRadius: "1rem",
              padding: "1.5rem",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.1)";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = "none";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            <div style={{ display: "grid", gap: "1rem" }} className="md:grid-cols-[1fr_auto]">
              {/* Left Section - Teacher Info */}
              <div>
                <div style={{ display: "flex", alignItems: "start", gap: "1rem", marginBottom: "1rem" }}>
                  {/* Avatar */}
                  <div
                    style={{
                      width: "3.5rem",
                      height: "3.5rem",
                      borderRadius: "50%",
                      background: "linear-gradient(135deg, var(--color-primary), var(--color-secondary))",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "1.5rem",
                      color: "white",
                      fontWeight: 700,
                      flexShrink: 0,
                    }}
                  >
                    {teacher.name.charAt(0).toUpperCase()}
                  </div>

                  {/* Name & Email */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <h3 style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--color-text)", marginBottom: "0.25rem" }}>
                      {teacher.name}
                    </h3>
                    <p style={{ fontSize: "0.875rem", color: "var(--color-text-muted)", marginBottom: "0.5rem" }}>
                      {teacher.email}
                    </p>
                    <div
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        padding: "0.25rem 0.75rem",
                        borderRadius: "1rem",
                        background: "color-mix(in oklch, var(--color-secondary), transparent 85%)",
                        color: "var(--color-secondary)",
                        fontSize: "0.75rem",
                        fontWeight: 600,
                      }}
                    >
                      <span>📚</span>
                      {teacher.department}
                    </div>
                  </div>
                </div>

                {/* Additional Info Grid */}
                <div style={{ display: "grid", gap: "0.75rem", fontSize: "0.875rem" }} className="sm:grid-cols-2">
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <span style={{ fontSize: "1.125rem" }}>🏫</span>
                    <div>
                      <p style={{ color: "var(--color-text-muted)", fontSize: "0.75rem" }}>University Email</p>
                      <p style={{ color: "var(--color-text)", fontWeight: 500 }}>{teacher.universityEmail}</p>
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <span style={{ fontSize: "1.125rem" }}>📅</span>
                    <div>
                      <p style={{ color: "var(--color-text-muted)", fontSize: "0.75rem" }}>Applied On</p>
                      <p style={{ color: "var(--color-text)", fontWeight: 500 }}>
                        {new Date(teacher.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Section - Action Buttons */}
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", minWidth: "200px" }}>
                <button
                  onClick={() => handleApproval(teacher._id, true)}
                  disabled={processingId === teacher._id}
                  className="btn btn-primary"
                  style={{
                    padding: "0.75rem 1.5rem",
                    borderRadius: "0.5rem",
                    fontWeight: 600,
                    fontSize: "0.875rem",
                    cursor: processingId === teacher._id ? "not-allowed" : "pointer",
                    opacity: processingId === teacher._id ? 0.6 : 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.5rem",
                    transition: "all 0.2s ease",
                  }}
                >
                  <span>✓</span>
                  Approve
                </button>
                <button
                  onClick={() => handleApproval(teacher._id, false)}
                  disabled={processingId === teacher._id}
                  style={{
                    padding: "0.75rem 1.5rem",
                    borderRadius: "0.5rem",
                    fontWeight: 600,
                    fontSize: "0.875rem",
                    cursor: processingId === teacher._id ? "not-allowed" : "pointer",
                    opacity: processingId === teacher._id ? 0.6 : 1,
                    background: "transparent",
                    border: "1px solid var(--color-danger)",
                    color: "var(--color-danger)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.5rem",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    if (processingId !== teacher._id) {
                      e.currentTarget.style.background = "var(--color-danger)";
                      e.currentTarget.style.color = "white";
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.color = "var(--color-danger)";
                  }}
                >
                  <span>✕</span>
                  Reject
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
