# from fastapi import APIRouter, Depends, HTTPException
# from sqlalchemy.orm import Session
# from backend.database import SessionLocal
# from backend.models import User
# from backend.schemas import UserCreate, Login
# from backend.auth import hash_password, verify_password, create_token
# from backend.dependencies import get_db

# router = APIRouter()

# @router.post("/signup")
# def signup(user: UserCreate, db: Session = Depends(get_db)):
#     existing = db.query(User).filter(User.email == user.email).first()
#     if existing:
#         raise HTTPException(400, "Email already exists")

#     new_user = User(
#         name=user.name,
#         email=user.email,
#         password=hash_password(user.password),
#         role=user.role
#     )
#     db.add(new_user)
#     db.commit()
#     return {"message": "User created"}

# @router.post("/login")
# def login(user: Login, db: Session = Depends(get_db)):
#     db_user = db.query(User).filter(User.email == user.email).first()
#     if not db_user or not verify_password(user.password, db_user.password):
#         raise HTTPException(400, "Invalid credentials")

#     token = create_token({"id": db_user.id})
#     return {"access_token": token,
#             "role": db_user.role,
#             "id": db_user.id,
#             "email": db_user.email
#             }
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from models import User
from schemas import UserCreate, Login
from auth import hash_password, verify_password, create_token
from dependencies import get_db

router = APIRouter()

@router.post("/signup")
def signup(user: UserCreate, db: Session = Depends(get_db)):
    try:
        existing = db.query(User).filter(User.email == user.email).first()
        if existing:
            raise HTTPException(status_code=400, detail="Email already exists")

        new_user = User(
            name=user.name,
            email=user.email,
            password=hash_password(user.password),
            role=user.role
        )

        db.add(new_user)
        db.commit()
        db.refresh(new_user)  # 👈 important

        return {"message": "User created"}

    except Exception as e:
        print("SIGNUP ERROR:", e)
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/login")
def login(user: Login, db: Session = Depends(get_db)):
    try:
        print("LOGIN EMAIL:", user.email)
        print("LOGIN PASSWORD:", user.password)

        db_user = db.query(User).filter(User.email == user.email).first()
        print("USER FOUND:", db_user is not None)

        if not db_user or not verify_password(user.password, db_user.password):
            print("PASSWORD MATCH FAILED")
            raise HTTPException(status_code=400, detail="Invalid credentials")

        token = create_token({"id": db_user.id})

        return {
            "access_token": token,
            "role": db_user.role,
            "id": db_user.id,
            "email": db_user.email
        }

    except Exception as e:
        print("LOGIN ERROR:", e)
        raise HTTPException(status_code=500, detail=str(e))
# @router.post("/login")
# def login(user: Login, db: Session = Depends(get_db)):
#     try:
#         db_user = db.query(User).filter(User.email == user.email).first()

#         if not db_user or not verify_password(user.password, db_user.password):
#             raise HTTPException(status_code=400, detail="Invalid credentials")

#         token = create_token({"id": db_user.id})

#         return {
#             "access_token": token,
#             "role": db_user.role,
#             "id": db_user.id,
#             "email": db_user.email
#         }

#     except Exception as e:
#         print("LOGIN ERROR:", e)
#         raise HTTPException(status_code=500, detail=str(e))