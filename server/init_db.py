from database import get_db_connection


def init_db():
    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute("""
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL
    )
    """)

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