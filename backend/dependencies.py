from fastapi import Depends, HTTPException
from jose import jwt
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from database import SessionLocal
from models import User
import os
from dotenv import load_dotenv

load_dotenv()

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")

SECRET_KEY = os.getenv("SECRET_KEY", "secret123")
ALGORITHM = os.getenv("ALGORITHM", "HS256")

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user = db.query(User).filter(User.id == payload["id"]).first()
        return user
    except:
        raise HTTPException(status_code=401, detail="Invalid token")