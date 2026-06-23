import pandas as pd

# Load job roles dataset
jobs_df = pd.read_csv(
    "dataset/job_roles.csv"
)


def calculate_ats_score(
    extracted_skills,
    role
):
    """
    Calculate ATS score based on
    extracted skills and selected role.
    """

    # Handle empty skills
    if not extracted_skills:
        extracted_skills = []

    # Normalize extracted skills
    extracted_skills = list(
        set(
            skill.strip().lower()
            for skill in extracted_skills
            if skill and skill.strip()
        )
    )

    # Find selected role
    row = jobs_df[
        jobs_df["role"].str.lower()
        == role.lower()
    ]

    # Role not found
    if row.empty:
        return {
            "role": role,
            "score": 0,
            "matched_skills": [],
            "missing_skills": [],
            "message":
            "Selected role not found."
        }

    # Get required skills
    required_skills = [
        skill.strip().lower()
        for skill in
        row.iloc[0]["skills"].split(",")
        if skill.strip()
    ]

    matched_skills = []
    missing_skills = []

    # Compare skills
    for skill in required_skills:
        if skill in extracted_skills:
            matched_skills.append(
                skill
            )
        else:
            missing_skills.append(
                skill
            )

    # Prevent division by zero
    if len(required_skills) == 0:
        score = 0
    else:
        score = (
            len(matched_skills)
            / len(required_skills)
        ) * 100

    return {
        "role": role,
        "score": round(score, 2),
        "matched_skills":
        matched_skills,
        "missing_skills":
        missing_skills
    }