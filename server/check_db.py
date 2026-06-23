import sqlite3

conn = sqlite3.connect(
    "resume_analyzer.db"
)

cursor = conn.cursor()

cursor.execute("""
SELECT
    id,
    email,
    filename,
    ats_score,
    skills,
    uploaded_at
FROM resume_comparisons
ORDER BY id;
""")

rows = cursor.fetchall()

print("\nRESUME_COMPARISONS TABLE:\n")

for row in rows:
    print(row)

conn.close()