import pandas as pd

jobs_df = pd.read_csv(
    "dataset/job_roles.csv"
)


RELATED_ROLES = {
    "Frontend Developer": [
        "Frontend Developer",
        "Full Stack Developer",
        "Backend Developer"
    ],

    "Backend Developer": [
        "Backend Developer",
        "Full Stack Developer",
        "DevOps Engineer"
    ],

    "Full Stack Developer": [
        "Full Stack Developer",
        "Frontend Developer",
        "Backend Developer"
    ],

    "Data Analyst": [
        "Data Analyst",
        "Data Scientist",
        "Machine Learning Engineer"
    ],

    "Data Scientist": [
        "Data Scientist",
        "Machine Learning Engineer",
        "Data Analyst"
    ],

    "Machine Learning Engineer": [
        "Machine Learning Engineer",
        "Data Scientist",
        "Data Analyst"
    ],

    "DevOps Engineer": [
        "DevOps Engineer",
        "Backend Developer",
        "Full Stack Developer"
    ]
}


def recommend_jobs(
        extracted_skills,
        selected_role
):
    recommendations = []

    extracted_skills = [
        skill.strip().lower()
        for skill in extracted_skills
    ]

    roles_to_check = (
        RELATED_ROLES.get(
            selected_role,
            jobs_df["role"].tolist()
        )
    )

    for role in roles_to_check:

        row = jobs_df[
            jobs_df["role"] == role
        ]

        if row.empty:
            continue

        required_skills = [
            skill.strip().lower()
            for skill in
            row.iloc[0]["skills"].split(",")
        ]

        matched = sum(
            skill in extracted_skills
            for skill in required_skills
        )

        score = (
            matched
            / len(required_skills)
        ) * 100

        recommendations.append({
            "role": role,
            "match_score":
            round(score, 2)
        })

    recommendations.sort(
        key=lambda x:
        x["match_score"],
        reverse=True
    )

    return recommendations