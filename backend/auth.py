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
<<<<<<< HEAD

=======
>>>>>>> cecfe9da860cf5a96c0a8f3257e1e2794fdf44c2
from passlib.context import CryptContext
from jose import jwt
from datetime import datetime, timedelta

SECRET_KEY = "secret"
ALGORITHM = "HS256"

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
<<<<<<< HEAD
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
=======
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

>>>>>>> cecfe9da860cf5a96c0a8f3257e1e2794fdf44c2
