from flask import (
    Blueprint,
    jsonify
)

from database import (
    get_db_connection
)

comparison_bp = Blueprint(
    "comparison_bp",
    __name__
)


@comparison_bp.route(
    "/compare/<email>",
    methods=["GET"]
)
def compare_resume(email):

    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute(
        """
        SELECT *
        FROM resume_comparisons
        WHERE email = ?
        ORDER BY id DESC
        LIMIT 2
        """,
        (email,)
    )

    rows = cursor.fetchall()

    conn.close()

    if len(rows) < 2:
        return jsonify({
            "message":
            "Upload at least two resumes."
        }), 200

    latest = rows[0]
    previous = rows[1]

    latest_skills = set(
        latest["skills"].split(",")
    )

    previous_skills = set(
        previous["skills"].split(",")
    )

    new_skills = list(
        latest_skills -
        previous_skills
    )

    removed_skills = list(
        previous_skills -
        latest_skills
    )

    improvement = round(
        latest["ats_score"]
        -
        previous["ats_score"],
        2
    )

    return jsonify({
        "previous_ats":
            previous["ats_score"],

        "current_ats":
            latest["ats_score"],

        "improvement":
            improvement,

        "new_skills":
            new_skills,

        "removed_skills":
            removed_skills,

        "previous_resume":
            previous["filename"],

        "current_resume":
            latest["filename"]
    }), 200