import sqlite3

conn = sqlite3.connect(
    "resume_analyzer.db"
)

cursor = conn.cursor()

cursor.execute(
    "DELETE FROM upload_history"
)

cursor.execute(
    "DELETE FROM resume_comparisons"
)

conn.commit()
conn.close()

print("Database cleared!")