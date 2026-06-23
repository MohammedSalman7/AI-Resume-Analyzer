import os
from datetime import datetime
from werkzeug.utils import secure_filename
from flask import Blueprint, request, jsonify
from database import get_db_connection

from services.resume_service import parse_resume
from services.analysis_service import analyze_resume

upload_bp = Blueprint(
    "upload_bp",
    __name__
)

UPLOAD_FOLDER = os.path.join(
    os.getcwd(),
    "uploads",
    "resumes"
)

os.makedirs(
    UPLOAD_FOLDER,
    exist_ok=True
)

ALLOWED_EXTENSIONS = {
    "pdf",
    "doc",
    "docx"
}

MAX_FILE_SIZE = (
    5 * 1024 * 1024
)


def allowed_file(filename):
    return (
        "." in filename
        and filename.rsplit(
            ".",
            1
        )[1].lower()
        in ALLOWED_EXTENSIONS
    )


@upload_bp.route(
    "/upload",
    methods=["POST"]
)
def upload_resume():

    if "resume" not in request.files:
        return jsonify({
            "message":
            "No file uploaded"
        }), 400

    file = request.files["resume"]

    if file.filename == "":
        return jsonify({
            "message":
            "No file selected"
        }), 400

    if not allowed_file(
        file.filename
    ):
        return jsonify({
            "message":
            "Only PDF, DOC and DOCX resumes are allowed."
        }), 400

    file.seek(
        0,
        os.SEEK_END
    )

    file_size = file.tell()

    file.seek(0)

    if file_size > MAX_FILE_SIZE:
        return jsonify({
            "message":
            "Resume size should be less than 5 MB."
        }), 400

    filename = secure_filename(
        file.filename
    )

    file_path = os.path.join(
        UPLOAD_FOLDER,
        filename
    )

    file.save(file_path)

    try:
        # Parse Resume
        resume_data = parse_resume(
            filename
        )

        # Selected Role
        selected_role = request.form.get(
            "role",
            "Full Stack Developer"
        )

        # Analyze Resume
        analysis_result = analyze_resume(
            resume_data["skills"],
            selected_role
        )

        ats_result = (
            analysis_result.get(
                "ats",
                {}
            )
        )

        ats_score = (
            ats_result.get(
                "score",
                0
            )
        )

        # Logged-in email
        email = request.form.get(
            "email"
        )

        print(
            "EMAIL RECEIVED:",
            email
        )

        uploaded_at = (
            datetime.now().strftime(
                "%d %b %Y %I:%M %p"
            )
        )

        # Save history and comparison
        if email:

            conn = get_db_connection()
            cursor = conn.cursor()

            # Upload History Table
            cursor.execute(
                """
                INSERT INTO upload_history
                (
                    email,
                    filename,
                    role,
                    ats_score,
                    uploaded_at
                )
                VALUES
                (?, ?, ?, ?, ?)
                """,
                (
                    email,
                    filename,
                    selected_role,
                    ats_score,
                    uploaded_at
                )
            )

            # Resume Comparison Table
            skills_string = ",".join(
                resume_data["skills"]
            )

            cursor.execute(
                """
                INSERT INTO
                resume_comparisons
                (
                    email,
                    filename,
                    ats_score,
                    skills,
                    uploaded_at
                )
                VALUES
                (?, ?, ?, ?, ?)
                """,
                (
                    email,
                    filename,
                    ats_score,
                    skills_string,
                    uploaded_at
                )
            )

            conn.commit()
            conn.close()

            print(
                "History and comparison saved."
            )

        return jsonify({
            "message":
            "Resume uploaded successfully!",

            "filename":
            filename,

            "text":
            resume_data[
                "text"
            ][:1000],

            "skills":
            resume_data[
                "skills"
            ],

            "selected_role":
            selected_role,

            "ats":
            analysis_result[
                "ats"
            ],

            "recommendations":
            analysis_result[
                "recommendations"
            ],

            "roadmap":
            analysis_result[
                "roadmap"
            ]
        }), 200

    except Exception as e:

        print(
            "UPLOAD ERROR:",
            str(e)
        )

        return jsonify({
            "message":
            f"Error processing resume: {str(e)}"
        }), 500