from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import Base, engine
from routers import user, project, task

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["majestic-daifuku-b39ae3.netlify.app"],  # allow React frontend
    allow_credentials=True,
    allow_methods=["*"],  # allow POST, GET, OPTIONS
    allow_headers=["*"],
)


@app.get("/")
def home():
    return {"message": "Team Task Manager API running 🚀"}

app.include_router(user.router)
app.include_router(project.router)
app.include_router(task.router)