import os
from flask import (
    Blueprint,
    request,
    jsonify
)
from werkzeug.utils import (
    secure_filename
)

from services.resume_service import (
    parse_resume
)
from services.analysis_service import (
    analyze_resume
)

analyze_bp = Blueprint(
    "analyze_bp",
    __name__
)

UPLOAD_FOLDER = os.path.join(
    os.getcwd(),
    "uploads",
    "resumes"
)


@analyze_bp.route(
    "/analyze",
    methods=["POST"]
)
def analyze_only():

    if "resume" not in request.files:
        return jsonify({
            "message":
            "No file uploaded."
        }), 400

    file = request.files[
        "resume"
    ]

    filename = secure_filename(
        file.filename
    )

    file_path = os.path.join(
        UPLOAD_FOLDER,
        filename
    )

    file.save(
        file_path
    )

    selected_role = (
        request.form.get(
            "role",
            "Full Stack Developer"
        )
    )

    resume_data = parse_resume(
        filename
    )

    analysis_result = (
        analyze_resume(
            resume_data["skills"],
            selected_role
        )
    )

    return jsonify({
        "filename":
        filename,

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