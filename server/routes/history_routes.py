from flask import (
    Blueprint,
    jsonify
)

from database import (
    get_db_connection
)

history_bp = Blueprint(
    "history_bp",
    __name__
)


@history_bp.route(
    "/history/<email>",
    methods=["GET"]
)
def get_history(email):
    """
    Get upload history
    for a specific user
    from SQLite database.
    """

    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute(
        """
        SELECT
            filename,
            role,
            ats_score,
            uploaded_at
        FROM upload_history
        WHERE email = ?
        ORDER BY id DESC
        """,
        (email,)
    )

    rows = cursor.fetchall()

    conn.close()

    history = []

    for row in rows:
        history.append({
            "filename":
                row["filename"],

            "role":
                row["role"],

            "ats_score":
                row["ats_score"],

            "uploaded_at":
                row["uploaded_at"]
        })

    return jsonify(
        history
    ), 200