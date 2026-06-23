import os
from flask import (
    Blueprint,
    request,
    jsonify,
    send_file
)

from services.report_service import (
    generate_report
)

report_bp = Blueprint(
    "report_bp",
    __name__
)


@report_bp.route(
    "/report/download",
    methods=["POST"]
)
def download_report():
    try:
        data = request.json

        file_path = generate_report(
            data
        )

        return send_file(
            file_path,
            as_attachment=True
        )

    except Exception as e:
        return jsonify({
            "message": str(e)
        }), 500