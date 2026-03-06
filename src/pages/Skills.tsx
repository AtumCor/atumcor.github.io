import "../styles/pages/skills.css";

type SkillGroup = {
  title: string;
  items: string[];
};

const SKILL_GROUPS: SkillGroup[] = [
  {
    title: "Languages",
    items: ["Python", "TypeScript", "JavaScript", "C++", "Java", "Ruby", "SQL"],
  },
  {
    title: "Frameworks",
    items: ["React", "Node.js", "Vite", "Jekyll"],
  },
  {
    title: "Tools",
    items: ["Git", "Docker", "Linux", "GitHub", "REST APIs", "CI/CD"],
  },
  {
    title: "Mathematics",
    items: [
      "Linear Algebra",
      "Probability",
      "Statistics",
      "Discrete Math",
      "Proofs",
      "Optimization",
    ],
  },
];

export default function Skills() {
  return (
    <article className="module skillsModule">
      <div className="skillsIntro">
        <p className="skillsEyebrow">Skills</p>
        <h2>Technical toolkit.</h2>
        <p className="skillsBlurb">
          A mix of software, systems, and mathematical foundations I use to build
          projects and solve problems.
        </p>
      </div>

      <div className="skillsStack">
        {SKILL_GROUPS.map((group) => (
          <section key={group.title} className="skillSection">
            <h3>{group.title}</h3>
            <div className="skillPills">
              {group.items.map((item) => (
                <span key={item} className="skillPill">
                  {item}
                </span>
              ))}
            </div>
          </section>
        ))}
      </div>
    </article>
  );
}