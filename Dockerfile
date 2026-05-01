FROM python:3.10-slim

WORKDIR /app/backend

COPY backend/ ./backend/

RUN pip install --no-cache-dir --upgrade pip
RUN pip install --no-cache-dir -r backend/requirements.txt

CMD ["sh", "-c", "uvicorn backend.main:app --host 0.0.0.0 --port $PORT"]