"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

interface Student {
  _id: string;
  name: string;
  email: string;
  universityCode: string;
  course: string;
  createdAt: string;
}

export default function PendingStudentApprovalsPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCourse, setFilterCourse] = useState("all");

  useEffect(() => {
    fetchPendingStudents();
  }, []);

  const fetchPendingStudents = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/teachers/getallpendingstudents");
      setStudents(res.data.data || []);
      
      toast.success("Successfully loaded pending students");
    } catch (error) {
      toast.error("Failed to load pending approvals");
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleApproval = async (studentId: string, isApprove: boolean) => {
    try {
      setProcessingId(studentId);

      const endpoint = isApprove
        ? "/api/teachers/approvestudent"
        : "/api/teachers/rejectstudent";

      const response = await axios.post(
        endpoint,
        { id: studentId },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (response.data.status) {
        toast.success(
          isApprove
            ? "Student approved successfully!"
            : "Student rejected successfully!"
        );

        setStudents((prevStudents) =>
          prevStudents.filter((student) => student._id !== studentId)
        );
      } else {
        toast.error(response.data.message || "Operation failed");
      }
    } catch (error) {
      console.error("Error processing approval:", error);

      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.message ||
            `Failed to ${isApprove ? "approve" : "reject"} student`
        );
      } else {
        toast.error("An unexpected error occurred");
      }
    } finally {
      setProcessingId(null);
    }
  };

  // Filter logic
  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.course.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.universityCode.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCourse =
      filterCourse === "all" || student.course === filterCourse;
    return matchesSearch && matchesCourse;
  });

  const courses = Array.from(new Set(students.map((s) => s.course)));

  return (
    <div style={{ padding: "0.5rem" }}>
      <div
        style={{
          background:
            "linear-gradient(135deg, var(--color-secondary) 0%, var(--color-primary) 100%)",
          borderRadius: "1rem",
          padding: "2rem",
          color: "white",
          marginBottom: "1.5rem",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <div>
            <h1 style={{ fontSize: "clamp(1.5rem, 4vw, 2.5rem)", fontWeight: 700, marginBottom: "0.5rem" }}>
              Pending Student Approvals
            </h1>
            <p style={{ opacity: 0.9, fontSize: "1rem" }}>
              Review and approve student registration requests
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
              {filteredStudents.length}
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
              Search Students
            </label>
            <div style={{ position: "relative" }}>
              <input
                type="text"
                placeholder="Search by name, email, course, or university code..."
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

          {/* Course Filter */}
          <div>
            <label style={{ display: "block", fontSize: "0.875rem", fontWeight: 600, color: "var(--color-text)", marginBottom: "0.5rem" }}>
              Filter by Course
            </label>
            <select
              value={filterCourse}
              onChange={(e) => setFilterCourse(e.target.value)}
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
              <option value="all">All Courses</option>
              {courses.map((course) => (
                <option key={course} value={course}>
                  {course}
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
      {!loading && filteredStudents.length === 0 && (
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
            {searchQuery || filterCourse !== "all"
              ? "No students match your search criteria"
              : "No pending student approvals at the moment"}
          </p>
        </div>
      )}

      {/* Student Cards - Mobile Friendly */}
      <div style={{ display: "grid", gap: "1rem" }}>
        {filteredStudents.map((student) => (
          <div
            key={student._id}
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
              {/* Left Section - Student Info */}
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
                    {student.name.charAt(0).toUpperCase()}
                  </div>

                  {/* Name & Email */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <h3 style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--color-text)", marginBottom: "0.25rem" }}>
                      {student.name}
                    </h3>
                    <p style={{ fontSize: "0.875rem", color: "var(--color-text-muted)", marginBottom: "0.5rem" }}>
                      {student.email}
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
                      <span>🎓</span>
                      {student.course}
                    </div>
                  </div>
                </div>

                {/* Additional Info Grid */}
                <div style={{ display: "grid", gap: "0.75rem", fontSize: "0.875rem" }} className="sm:grid-cols-2">
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <span style={{ fontSize: "1.125rem" }}>🏷️</span>
                    <div>
                      <p style={{ color: "var(--color-text-muted)", fontSize: "0.75rem" }}>University Code</p>
                      <p style={{ color: "var(--color-text)", fontWeight: 500 }}>{student.universityCode}</p>
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <span style={{ fontSize: "1.125rem" }}>📅</span>
                    <div>
                      <p style={{ color: "var(--color-text-muted)", fontSize: "0.75rem" }}>Applied On</p>
                      <p style={{ color: "var(--color-text)", fontWeight: 500 }}>
                        {new Date(student.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Section - Action Buttons */}
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", minWidth: "200px" }}>
                <button
                  onClick={() => handleApproval(student._id, true)}
                  disabled={processingId === student._id}
                  className="btn btn-primary"
                  style={{
                    padding: "0.75rem 1.5rem",
                    borderRadius: "0.5rem",
                    fontWeight: 600,
                    fontSize: "0.875rem",
                    cursor: processingId === student._id ? "not-allowed" : "pointer",
                    opacity: processingId === student._id ? 0.6 : 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.5rem",
                    transition: "all 0.2s ease",
                  }}
                >
                  <span>{processingId === student._id ? "⏳" : "✓"}</span>
                  {processingId === student._id ? "Processing..." : "Approve"}
                </button>
                <button
                  onClick={() => handleApproval(student._id, false)}
                  disabled={processingId === student._id}
                  style={{
                    padding: "0.75rem 1.5rem",
                    borderRadius: "0.5rem",
                    fontWeight: 600,
                    fontSize: "0.875rem",
                    cursor: processingId === student._id ? "not-allowed" : "pointer",
                    opacity: processingId === student._id ? 0.6 : 1,
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
                    if (processingId !== student._id) {
                      e.currentTarget.style.background = "var(--color-danger)";
                      e.currentTarget.style.color = "white";
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.color = "var(--color-danger)";
                  }}
                >
                  <span>{processingId === student._id ? "⏳" : "✕"}</span>
                  {processingId === student._id ? "Processing..." : "Reject"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
