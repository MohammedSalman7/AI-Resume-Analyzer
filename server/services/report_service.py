import os
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas


def generate_report(data):
    """
    Generates a PDF report and returns its file path.
    """

    reports_folder = os.path.join(
        os.getcwd(),
        "reports"
    )

    os.makedirs(
        reports_folder,
        exist_ok=True
    )

    filename = f"{data['filename']}_report.pdf"

    file_path = os.path.join(
        reports_folder,
        filename
    )

    c = canvas.Canvas(
        file_path,
        pagesize=letter
    )

    width, height = letter

    y = height - 50

    # Title
    c.setFont(
        "Helvetica-Bold",
        18
    )

    c.drawString(
        50,
        y,
        "AI Resume Analyzer Report"
    )

    y -= 40

    c.setFont(
        "Helvetica",
        12
    )

    # File Name
    c.drawString(
        50,
        y,
        f"Resume: {data['filename']}"
    )

    y -= 30

    # ATS Score
    c.drawString(
        50,
        y,
        f"ATS Score: {data['ats']['score']}%"
    )

    y -= 40

    # Matched Skills
    c.setFont(
        "Helvetica-Bold",
        14
    )

    c.drawString(
        50,
        y,
        "Matched Skills"
    )

    y -= 25

    c.setFont(
        "Helvetica",
        12
    )

    for skill in data["ats"]["matched_skills"]:
        c.drawString(
            70,
            y,
            f"• {skill}"
        )
        y -= 20

    y -= 10

    # Missing Skills
    c.setFont(
        "Helvetica-Bold",
        14
    )

    c.drawString(
        50,
        y,
        "Missing Skills"
    )

    y -= 25

    c.setFont(
        "Helvetica",
        12
    )

    if data["ats"]["missing_skills"]:
        for skill in data["ats"]["missing_skills"]:
            c.drawString(
                70,
                y,
                f"• {skill}"
            )
            y -= 20
    else:
        c.drawString(
            70,
            y,
            "None"
        )
        y -= 20

    y -= 20

    # Recommended Roles
    c.setFont(
        "Helvetica-Bold",
        14
    )

    c.drawString(
        50,
        y,
        "Recommended Roles"
    )

    y -= 25

    c.setFont(
        "Helvetica",
        12
    )

    for role in data["recommendations"]:
        c.drawString(
            70,
            y,
            f"{role['role']} - {role['match_score']}%"
        )

        y -= 20

    y -= 20

    # Career Roadmap
    c.setFont(
        "Helvetica-Bold",
        14
    )

    c.drawString(
        50,
        y,
        "Career Roadmap"
    )

    y -= 25

    c.setFont(
        "Helvetica",
        12
    )

    for skill, steps in data[
        "roadmap"
    ].items():

        c.drawString(
            70,
            y,
            skill
        )

        y -= 20

        for step in steps:
            c.drawString(
                90,
                y,
                f"- {step}"
            )

            y -= 20

        y -= 10

    c.save()

    return file_path