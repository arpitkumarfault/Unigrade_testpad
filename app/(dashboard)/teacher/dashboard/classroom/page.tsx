"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import Link from "next/link";

interface Classroom {
  _id: string;
  className: string;
  subject: string;
  classCode: string;
  roomNumber: string;
  section: string;
  capacity: number;
  studentCount: number;
  createdAt: string;
}

interface NewClassForm {
  className: string;
  subject: string;
  roomNumber: string;
  section: string;
  capacity: number;
  description: string;
}

export default function TeacherClassroomPage() {
  const [classrooms, setClassrooms] = useState<Classroom[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [teacherId, setTeacherId] = useState('')
  const [newClass, setNewClass] = useState<NewClassForm>({
    className: "",
    subject: "",
    roomNumber: "",
    section: "",
    capacity: 60,
    description: "",
  });

  // Fetch classrooms from API

  const loadData = async () => {
    try {
      setLoading(true);
      // Adjust URL to match your backend route
      const res = await axios.get<Classroom[]>("/api/teacher/classrooms");
      setClassrooms(res.data);
      toast.success("successfuly got your classrooms")
    } catch (error) {
      console.error(error);
      toast.error("Failed to load classrooms");
    } finally {
      setLoading(false);
    }
  };

  const fetchTeacherDetails = async (): Promise<Teacher | null> => {
    try {
      const res = await axios.get("/api/teachers/gettingteacherdetail", {
        withCredentials: true,
      });

      if (!res.data?.status) {
        return null;
      }
      console.log('the teacher details are >>', res)
      
     setTeacherId(res.data.teacher._id)
      return res.data.teacher as Teacher;
    } catch (err) {
      console.error("fetchTeacherDetails error:", err);
      return null;
    }
  };
  useEffect(() => {

    fetchTeacherDetails()
    loadData();
  }, []);

  interface Teacher {
    id: string;
    name: string;
    email: string;
    department: string;
    universityEmail: string;
    isApproved: boolean;
  }




  // Create classroom according to Mongoose model
  const handleCreateClassroom = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await axios.post<Classroom>("/api/classroom/create", {
        className: newClass.className,
        subject: newClass.subject,
        roomNumber: newClass.roomNumber,
        section: newClass.section,
        capacity: newClass.capacity,
        description: newClass.description,
        teacherId:teacherId
      });

      const created = res.data;
      setClassrooms((prev) => [created, ...prev]);
      toast.success("Classroom created successfully! Code: " + created.classCode);
      setShowCreateModal(false);
      setNewClass({
        className: "",
        subject: "",
        roomNumber: "",
        section: "",
        capacity: 60,
        description: "",
      });
    } catch (err: any) {
      console.error(err);
      const msg =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        "Failed to create classroom";
      toast.error(msg);
    }
  };

  return (
    <div style={{ padding: "1.5rem", maxWidth: "1200px", margin: "auto" }}>
      {/* Page Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "2rem",
        }}
      >
        <div>
          <h1 style={{ fontSize: "2rem", fontWeight: 700, color: "var(--color-text)" }}>
            My Classrooms
          </h1>
          <p style={{ color: "var(--color-text-muted)" }}>
            Manage your classes, students, and curriculum
          </p>
        </div>
        <button
          className="btn btn-primary"
          onClick={() => setShowCreateModal(true)}
          style={{
            padding: "0.75rem 1.5rem",
            borderRadius: "0.5rem",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          <span>+</span> Create New Class
        </button>
      </div>

      {/* Loading State */}
      {loading && <p>Loading your classrooms...</p>}

      {/* Empty State */}
      {!loading && classrooms.length === 0 && (
        <div
          style={{
            textAlign: "center",
            padding: "4rem",
            background: "var(--color-surface)",
            borderRadius: "1rem",
            border: "1px dashed var(--color-border)",
          }}
        >
          <h3>No classrooms found</h3>
          <p style={{ color: "var(--color-text-muted)", marginBottom: "1rem" }}>
            Start by creating your first classroom to engage with students.
          </p>
          <button
            className="btn btn-primary"
            onClick={() => setShowCreateModal(true)}
          >
            Create Classroom
          </button>
        </div>
      )}

      {/* Classroom Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "1.5rem",
        }}
      >
        {classrooms.map((cls) => (
          <div
            key={cls._id}
            className="card"
            style={{
              padding: "1.5rem",
              borderRadius: "1rem",
              border: "1px solid var(--color-border)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              transition: "transform 0.2s",
              background: "var(--color-surface)",
            }}
          >
            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "start",
                  marginBottom: "1rem",
                }}
              >
                <h2
                  style={{
                    fontSize: "1.25rem",
                    fontWeight: 600,
                    margin: 0,
                  }}
                >
                  {cls.className}
                </h2>
                <span
                  className="badge"
                  style={{
                    background: "var(--color-bg)",
                    border: "1px solid var(--color-border)",
                    padding: "0.25rem 0.5rem",
                    borderRadius: "0.25rem",
                    fontSize: "0.8rem",
                  }}
                >
                  {cls.subject}
                </span>
              </div>

              <div
                style={{
                  background: "var(--color-bg)",
                  padding: "0.75rem",
                  borderRadius: "0.5rem",
                  marginBottom: "1rem",
                }}
              >
                <p
                  style={{
                    fontSize: "0.875rem",
                    color: "var(--color-text-muted)",
                    margin: 0,
                  }}
                >
                  Class Code
                </p>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span
                    style={{
                      fontSize: "1.25rem",
                      fontWeight: 700,
                      color: "var(--color-primary)",
                      fontFamily: "monospace",
                    }}
                  >
                    {cls.classCode}
                  </span>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(cls.classCode);
                      toast.success("Code copied!");
                    }}
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      fontSize: "1.25rem",
                    }}
                    title="Copy Code"
                  >
                    📋
                  </button>
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "0.75rem",
                  fontSize: "0.875rem",
                  color: "var(--color-text-muted)",
                  marginBottom: "1.5rem",
                }}
              >
                <span>👥 {cls.studentCount} Students</span>
                <span>🏫 Room {cls.roomNumber}</span>
                <span>📚 Section {cls.section}</span>
                <span>🧍 Capacity {cls.capacity}</span>
                <span>📅 {new Date(cls.createdAt).toLocaleDateString()}</span>
              </div>
            </div>

            <Link
              href={`/teacher/dashboard/classroom/${cls._id}`}
              className="btn btn-secondary"
              style={{
                textAlign: "center",
                padding: "0.75rem",
                borderRadius: "0.5rem",
                textDecoration: "none",
              }}
            >
              Manage Classroom →
            </Link>
          </div>
        ))}
      </div>

      {/* Create Classroom Modal */}
      {showCreateModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 50,
          }}
        >
          <div
            style={{
              background: "var(--color-bg)",
              padding: "2rem",
              borderRadius: "1rem",
              width: "100%",
              maxWidth: "500px",
            }}
          >
            <h2 style={{ marginBottom: "1.5rem" }}>Create New Classroom</h2>
            <form
              onSubmit={handleCreateClassroom}
              style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
            >
              <div>
                <label
                  style={{
                    display: "block",
                    marginBottom: "0.5rem",
                    fontWeight: 500,
                  }}
                >
                  Class Name
                </label>
                <input
                  required
                  type="text"
                  placeholder="e.g., Advanced Mathematics"
                  value={newClass.className}
                  onChange={(e) =>
                    setNewClass({ ...newClass, className: e.target.value })
                  }
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    borderRadius: "0.5rem",
                    border: "1px solid var(--color-border)",
                    background: "var(--color-surface)",
                  }}
                />
              </div>

              <div>
                <label
                  style={{
                    display: "block",
                    marginBottom: "0.5rem",
                    fontWeight: 500,
                  }}
                >
                  Subject
                </label>
                <input
                  required
                  type="text"
                  placeholder="e.g., Math 101"
                  value={newClass.subject}
                  onChange={(e) =>
                    setNewClass({ ...newClass, subject: e.target.value })
                  }
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    borderRadius: "0.5rem",
                    border: "1px solid var(--color-border)",
                    background: "var(--color-surface)",
                  }}
                />
              </div>

              <div style={{ display: "flex", gap: "1rem" }}>
                <div style={{ flex: 1 }}>
                  <label
                    style={{
                      display: "block",
                      marginBottom: "0.5rem",
                      fontWeight: 500,
                    }}
                  >
                    Room Number
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="e.g., A-203"
                    value={newClass.roomNumber}
                    onChange={(e) =>
                      setNewClass({ ...newClass, roomNumber: e.target.value })
                    }
                    style={{
                      width: "100%",
                      padding: "0.75rem",
                      borderRadius: "0.5rem",
                      border: "1px solid var(--color-border)",
                      background: "var(--color-surface)",
                    }}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <label
                    style={{
                      display: "block",
                      marginBottom: "0.5rem",
                      fontWeight: 500,
                    }}
                  >
                    Section
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="e.g., A"
                    value={newClass.section}
                    onChange={(e) =>
                      setNewClass({ ...newClass, section: e.target.value })
                    }
                    style={{
                      width: "100%",
                      padding: "0.75rem",
                      borderRadius: "0.5rem",
                      border: "1px solid var(--color-border)",
                      background: "var(--color-surface)",
                    }}
                  />
                </div>
              </div>

              <div>
                <label
                  style={{
                    display: "block",
                    marginBottom: "0.5rem",
                    fontWeight: 500,
                  }}
                >
                  Capacity
                </label>
                <input
                  required
                  type="number"
                  min={1}
                  placeholder="e.g., 60"
                  value={newClass.capacity}
                  onChange={(e) =>
                    setNewClass({
                      ...newClass,
                      capacity: Number(e.target.value) || 0,
                    })
                  }
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    borderRadius: "0.5rem",
                    border: "1px solid var(--color-border)",
                    background: "var(--color-surface)",
                  }}
                />
              </div>

              <div>
                <label
                  style={{
                    display: "block",
                    marginBottom: "0.5rem",
                    fontWeight: 500,
                  }}
                >
                  Description (Optional)
                </label>
                <textarea
                  rows={3}
                  placeholder="Brief description of the course..."
                  value={newClass.description}
                  onChange={(e) =>
                    setNewClass({
                      ...newClass,
                      description: e.target.value,
                    })
                  }
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    borderRadius: "0.5rem",
                    border: "1px solid var(--color-border)",
                    background: "var(--color-surface)",
                  }}
                />
              </div>

              <div
                style={{
                  display: "flex",
                  gap: "1rem",
                  marginTop: "1rem",
                }}
              >
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  style={{
                    flex: 1,
                    padding: "0.75rem",
                    borderRadius: "0.5rem",
                    border: "1px solid var(--color-border)",
                    background: "transparent",
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{
                    flex: 1,
                    padding: "0.75rem",
                    borderRadius: "0.5rem",
                  }}
                >
                  Create Class
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
