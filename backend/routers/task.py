from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from backend.models import Task, ProjectMember
from backend.schemas import TaskCreate, TaskUpdate
from backend.dependencies import get_db, get_current_user

router = APIRouter()


# ✅ CREATE TASK (Admin only)
@router.post("/tasks")
def create_task(
    task: TaskCreate,
    db: Session = Depends(get_db),
    user=Depends(get_current_user)
):
    if user.role != "Admin":
        raise HTTPException(status_code=403, detail="Only Admin can create tasks")

    new_task = Task(
        title=task.title,
        description=task.description,
        project_id=task.project_id,
        assigned_to=task.assigned_to,
        due_date=task.due_date,
        status=task.status if task.status else "Pending"
        # status="Pending"
    )

    db.add(new_task)
    db.commit()
    db.refresh(new_task)

    return new_task


# ✅ GET TASKS (Role-based)
@router.get("/tasks")
def get_tasks(
    db: Session = Depends(get_db),
    user=Depends(get_current_user)
):
    # 👑 Admin → all tasks
    if user.role == "Admin":
        return db.query(Task).all()

    # 👤 Member → only assigned tasks
    return db.query(Task).filter(Task.assigned_to == user.id).all()


# ✅ UPDATE TASK (Admin + Assigned Member)
@router.put("/tasks/{task_id}")
def update_task(
    task_id: int,
    update: TaskUpdate,
    db: Session = Depends(get_db),
    user=Depends(get_current_user)
):
    task = db.query(Task).filter(Task.id == task_id).first()

    if not task:
        raise HTTPException(status_code=404, detail="Task not found")

    # 🚫 Permission check
    if user.role != "Admin" and task.assigned_to != user.id:
        raise HTTPException(status_code=403, detail="Not allowed")

    # ✅ Update fields safely
    if update.status:
        task.status = update.status

    if update.title:
        task.title = update.title

    if update.description:
        task.description = update.description

    db.commit()
    db.refresh(task)

    return task


# ✅ DELETE TASK (Admin only)
@router.delete("/tasks/{task_id}")
def delete_task(
    task_id: int,
    db: Session = Depends(get_db),
    user=Depends(get_current_user)
):
    if user.role != "Admin":
        raise HTTPException(status_code=403, detail="Only Admin can delete tasks")

    task = db.query(Task).filter(Task.id == task_id).first()

    if not task:
        raise HTTPException(status_code=404, detail="Task not found")

    db.delete(task)
    db.commit()

    return {"message": "Task deleted successfully"}


# ✅ GET TASKS BY PROJECT
@router.get("/projects/{project_id}/tasks")
def get_project_tasks(
    project_id: int,
    db: Session = Depends(get_db),
    user=Depends(get_current_user)
):
    # 👑 Admin → all tasks in project
    if user.role == "Admin":
        return db.query(Task).filter(Task.project_id == project_id).all()

    # 👤 Member → only if part of project
    membership = db.query(ProjectMember).filter(
        ProjectMember.project_id == project_id,
        ProjectMember.user_id == user.id
    ).first()

    if not membership:
        raise HTTPException(status_code=403, detail="Not part of this project")

    return db.query(Task).filter(Task.project_id == project_id).all()