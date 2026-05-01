from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from backend.models import Project, ProjectMember
from backend.schemas import ProjectCreate
from backend.dependencies import get_db, get_current_user

router = APIRouter()


# ✅ CREATE PROJECT (Admin only)
@router.post("/projects")
def create_project(
    project: ProjectCreate,
    db: Session = Depends(get_db),
    user=Depends(get_current_user)
):
    if user.role != "Admin":
        raise HTTPException(status_code=403, detail="Only Admin can create project")

    new_project = Project(
        name=project.name,
        description=project.description,
        created_by=user.id
    )

    db.add(new_project)
    db.commit()
    db.refresh(new_project)

    return new_project


# ✅ GET PROJECTS (Role-based)
@router.get("/projects")
def get_projects(
    db: Session = Depends(get_db),
    user=Depends(get_current_user)
):
    # 👑 Admin sees all
    if user.role == "Admin":
        return db.query(Project).all()

    # 👤 Member sees only assigned projects
    memberships = db.query(ProjectMember).filter(
        ProjectMember.user_id == user.id
    ).all()

    project_ids = [m.project_id for m in memberships]

    return db.query(Project).filter(Project.id.in_(project_ids)).all()


# ✅ ASSIGN MEMBER TO PROJECT (Admin only)
@router.post("/projects/{project_id}/assign/{user_id}")
def assign_member(
    project_id: int,
    user_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    if current_user.role != "Admin":
        raise HTTPException(status_code=403, detail="Only Admin can assign members")

    # check duplicate
    existing = db.query(ProjectMember).filter(
        ProjectMember.project_id == project_id,
        ProjectMember.user_id == user_id
    ).first()

    if existing:
        raise HTTPException(status_code=400, detail="User already assigned")

    member = ProjectMember(
        project_id=project_id,
        user_id=user_id
    )

    db.add(member)
    db.commit()

    return {"message": "Member assigned successfully"}


# ✅ GET SINGLE PROJECT DETAILS
@router.get("/projects/{project_id}")
def get_project(
    project_id: int,
    db: Session = Depends(get_db),
    user=Depends(get_current_user)
):
    project = db.query(Project).filter(Project.id == project_id).first()

    if not project:
        raise HTTPException(status_code=404, detail="Project not found")

    # ✅ Get members of this project
    members = db.query(ProjectMember).filter(
        ProjectMember.project_id == project_id
    ).all()

    return {
        "id": project.id,
        "name": project.name,
        "description": project.description,

        # 🔥 IMPORTANT: send members to frontend
        "members": [
            {
                "user_id": m.user_id
            }
            for m in members
        ]
    }
# @router.get("/projects/{project_id}")
# def get_project(
#     project_id: int,
#     db: Session = Depends(get_db),
#     user=Depends(get_current_user)
# ):
#     project = db.query(Project).filter(Project.id == project_id).first()

#     if not project:
#         raise HTTPException(status_code=404, detail="Project not found")

#     return project