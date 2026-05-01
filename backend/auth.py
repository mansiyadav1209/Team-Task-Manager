# from passlib.context import CryptContext
# from jose import jwt
# from datetime import datetime, timedelta

# SECRET_KEY = "secret"
# ALGORITHM = "HS256"

# pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# def hash_password(password: str):
#     return pwd_context.hash(password[:72])

# def verify_password(plain, hashed):
#     return pwd_context.verify(plain, hashed)

# def create_token(data: dict):
#     to_encode = data.copy()
#     expire = datetime.utcnow() + timedelta(hours=10)
#     to_encode.update({"exp": expire})
#     return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
from passlib.context import CryptContext
from jose import jwt
from datetime import datetime, timedelta
import os
from dotenv import load_dotenv

load_dotenv()

SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM","HS256")

# ✅ switched from bcrypt → argon2 (NO 72-byte limit)
pwd_context = CryptContext(schemes=["argon2"], deprecated="auto")


def hash_password(password: str):
    return pwd_context.hash(password)


def verify_password(plain, hashed):
    return pwd_context.verify(plain, hashed)


def create_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(hours=10)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
