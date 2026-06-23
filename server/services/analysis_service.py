from utils.ats_score import calculate_ats_score
from utils.job_matcher import recommend_jobs
from utils.career_roadmap import generate_roadmap


def analyze_resume(
        extracted_skills,
        role="Full Stack Developer"
):
    """
    Analyze resume based on extracted skills
    and selected role.
    """

    # Handle empty skills list
    if not extracted_skills:
        extracted_skills = []

    # Normalize skills
    normalized_skills = list(
        set(
            skill.strip().lower()
            for skill in extracted_skills
            if skill and skill.strip()
        )
    )

    # Calculate ATS score
    ats_result = calculate_ats_score(
        normalized_skills,
        role
    )

    # Generate recommendations
    recommendations = recommend_jobs(
        normalized_skills,
        role
    )

    # Generate roadmap
    roadmap = generate_roadmap(
        ats_result.get(
            "missing_skills",
            []
        )
    )

    return {
        "ats": ats_result,
        "recommendations": recommendations,
        "roadmap": roadmap
    }