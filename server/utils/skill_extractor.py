import pandas as pd

skills_df = pd.read_csv(
    "dataset/skills_dataset.csv"
)

SKILLS = (
    skills_df["skill"]
    .dropna()
    .str.lower()
    .tolist()
)


def extract_skills(resume_text):

    resume_text = resume_text.lower()

    extracted_skills = []

    for skill in SKILLS:

        if skill in resume_text:
            extracted_skills.append(skill)

    return list(set(extracted_skills))