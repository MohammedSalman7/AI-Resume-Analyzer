import sqlite3
import os

BASE_DIR = os.path.dirname(
    os.path.abspath(__file__)
)

DB_PATH = os.path.join(
    BASE_DIR,
    "resume_analyzer.db"
)


def get_db_connection():
    # Ensure directory exists
    os.makedirs(
        os.path.dirname(DB_PATH),
        exist_ok=True
    )

    conn = sqlite3.connect(
        DB_PATH
    )

    conn.row_factory = (
        sqlite3.Row
    )

    return conn