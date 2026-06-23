import os
from utils.parser import extract_resume_text
from utils.skill_extractor import extract_skills


def parse_resume(filename):

    file_path = os.path.join(
        "uploads",
        "resumes",
        filename
    )

    text = extract_resume_text(file_path)

    skills = extract_skills(text)

    return {
        "text": text,
        "skills": skills
    }