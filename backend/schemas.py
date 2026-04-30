from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class UserCreate(BaseModel):
    name: str
    email: str
    password: str
    role: Optional[str] = "Member"

class Login(BaseModel):
    email: str
    password: str

class ProjectCreate(BaseModel):
    name: str
    description: str

class TaskCreate(BaseModel):
    title: str
    description: str
    assigned_to: int
    project_id: int
    due_date: datetime
    status: Optional[str] = "Pending"


class TaskUpdate(BaseModel):
    status: Optional[str] = None