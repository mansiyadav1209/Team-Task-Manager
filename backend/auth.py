# from passlib.context import CryptContext
# from jose import jwt
# from datetime import datetime, timedelta

# import os
# from dotenv import load_dotenv

# load_dotenv()

# SECRET_KEY = os.getenv("SECRET_KEY")
# ALGORITHM = os.getenv("ALGORITHM") 

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

SECRET_KEY = os.getenv("SECRET_KEY","se1cr2t")
ALGORITHM = os.getenv("ALGORITHM","HS256")

print("SECRET_KEY:", SECRET_KEY)
print("ALGORITHM:", ALGORITHM)

# ✅ switched from bcrypt → argon2 (NO 72-byte limit)
pwd_context = CryptContext(schemes=["argon2"], deprecated="auto")


def hash_password(password: str):
    return pwd_context.hash(password)


def verify_password(plain, hashed):
    return pwd_context.verify(plain, hashed)

def create_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(hours=1)
    to_encode.update({"exp": expire})

    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
# def create_token(data: dict):
#     to_encode = data.copy()
#     expire = datetime.utcnow() + timedelta(hours=10)
#     to_encode.update({"exp": expire})
#     return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
