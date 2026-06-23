import sqlite3

conn = sqlite3.connect(
    "resume_analyzer.db"
)

cursor = conn.cursor()

# Users Table
cursor.execute("""
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
)
""")

# Upload History Table
cursor.execute("""
CREATE TABLE IF NOT EXISTS upload_history (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT NOT NULL,
    filename TEXT NOT NULL,
    role TEXT NOT NULL,
    ats_score REAL,
    uploaded_at TEXT
)
""")

# Resume Comparison Table
cursor.execute("""
CREATE TABLE IF NOT EXISTS resume_comparisons (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT NOT NULL,
    filename TEXT NOT NULL,
    ats_score REAL,
    skills TEXT,
    uploaded_at TEXT
)
""")

conn.commit()
conn.close()

print(
    "Database Created Successfully!"
)