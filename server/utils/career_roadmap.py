from dataset.roadmaps import ROADMAPS


def generate_roadmap(
        missing_skills
):

    roadmap = {}

    for skill in missing_skills:

        skill = skill.lower()

        if skill in ROADMAPS:
            roadmap[skill] = ROADMAPS[skill]

    return roadmap