FROM python:3.10-slim

WORKDIR /app

COPY backend/ ./backend/

RUN pip install --no-cache-dir --upgrade pip
RUN pip install --no-cache-dir -r backend/requirements.txt

ENV PYTHONPATH=/app/backend

CMD ["sh", "-c", "uvicorn backend.main:app --host 0.0.0.0 --port $PORT"]