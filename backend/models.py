from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, UniqueConstraint
from sqlalchemy.orm import relationship
from datetime import datetime
from database import Base


# 👤 USER
class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False, index=True)
    password = Column(String, nullable=False)
    role = Column(String, default="Member")

    created_at = Column(DateTime, default=datetime.utcnow)

    # 🔗 Relationships
    tasks = relationship("Task", back_populates="assignee", cascade="all, delete-orphan")
    created_projects = relationship("Project", back_populates="creator", cascade="all, delete-orphan")
    project_memberships = relationship("ProjectMember", back_populates="user", cascade="all, delete-orphan")


# 📁 PROJECT
class Project(Base):
    __tablename__ = "projects"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    description = Column(String)

    created_by = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), index=True)

    created_at = Column(DateTime, default=datetime.utcnow)

    # 🔗 Relationships
    creator = relationship("User", back_populates="created_projects")
    tasks = relationship("Task", back_populates="project", cascade="all, delete-orphan")
    members = relationship("ProjectMember", back_populates="project", cascade="all, delete-orphan")


# 👥 PROJECT MEMBERS (Many-to-Many)
class ProjectMember(Base):
    __tablename__ = "project_members"

    id = Column(Integer, primary_key=True, index=True)
    project_id = Column(Integer, ForeignKey("projects.id", ondelete="CASCADE"), index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), index=True)

    created_at = Column(DateTime, default=datetime.utcnow)

    # 🚫 Prevent duplicate membership
    __table_args__ = (
        UniqueConstraint("project_id", "user_id", name="unique_project_user"),
    )

    # 🔗 Relationships
    project = relationship("Project", back_populates="members")
    user = relationship("User", back_populates="project_memberships")


# 📋 TASK
class Task(Base):
    __tablename__ = "tasks"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    description = Column(String)

    status = Column(String, default="Pending")  # Pending / In Progress / Completed
    due_date = Column(DateTime)

    assigned_to = Column(Integer, ForeignKey("users.id", ondelete="SET NULL"), index=True)
    project_id = Column(Integer, ForeignKey("projects.id", ondelete="CASCADE"), index=True)

    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # 🔗 Relationships
    assignee = relationship("User", back_populates="tasks")
    project = relationship("Project", back_populates="tasks")