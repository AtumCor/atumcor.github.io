import "../styles/pages/projects.css";

export default function Projects() {
  return (
    <>
      <section className="projectsSection">


        <div className="featuredProjectsGrid">
          <article className="featuredProjectCard">
            <div className="projectCardTop">
              <span className="projectEyebrow">Featured</span>
              <time dateTime="2025-05">May 2025</time>
            </div>

            <h3>
              Portfolio Website
              <a
                href="https://github.com/AtumCor/atumcor.github.io"
                target="_blank"
                rel="noreferrer"
                className="projectLink portfolioLink"
              >
                ↗<span className="projectTooltip">You are looking at it!</span>
              </a>
            </h3>

            <p className="projectSummary">
              Personal portfolio built with React and TypeScript, designed
              around a horizontal page flow, minimal styling, and polished
              interaction details.
            </p>

            <div className="techTags">
              <span>React</span>
              <span>TypeScript</span>
              <span>CSS</span>
              <span>Vite</span>
            </div>
          </article>

          <article className="featuredProjectCard">
            <div className="projectCardTop">
              <span className="projectEyebrow">Featured</span>
              <time dateTime="2023-09">Autumn 2023</time>
            </div>

            <h3>
              Lambda Phi Epsilon Website
              <a
                href="https://www.tosulambdas.com/"
                target="_blank"
                rel="noreferrer"
                className="projectLink"
              >
                ↗
              </a>
            </h3>

            <p className="projectSummary">
              Official organization website built for Lambda Phi Epsilon with a
              focus on clarity, fast static hosting, and maintainable content
              structure.
            </p>

            <div className="techTags">
              <span>Jekyll</span>
              <span>HTML</span>
              <span>CSS</span>
              <span>GitHub Pages</span>
            </div>
          </article>

          <article className="featuredProjectCard">
            <div className="projectCardTop">
              <span className="projectEyebrow">Featured</span>
              <time>2024</time>
            </div>

            <h3>
              GooseChase
              <a
                href="https://github.com/AtumCor/goosechase"
                target="_blank"
                rel="noreferrer"
                className="projectLink"
              >
                ↗
              </a>
            </h3>

            <p className="projectSummary">
              Interactive scavenger hunt style web application designed for
              organizing events, tracking challenges, and coordinating group
              participation.
            </p>

            <div className="techTags">
              <span>JavaScript</span>
              <span>Web App</span>
              <span>Frontend</span>
            </div>
          </article>
        </div>
      </section>

      <section className="projectsSection moreProjectsSection">
        <header className="projectsSubheader">
          <h2>More Projects</h2>
          <p>Smaller builds, experiments, and works in progress.</p>
        </header>

        <div className="compactProjectsGrid">
          <article className="compactProjectCard">
            <h3>
              Digital Wardrobe
              <a
                href="https://github.com/AtumCor/digital-wardrobe"
                target="_blank"
                rel="noreferrer"
                className="projectLink"
              >
                ↗
              </a>
            </h3>

            <p>
              Web application for organizing clothing collections and
              experimenting with outfit combinations through a clean visual
              interface.
            </p>

            <div className="techTags">
              <span>React</span>
              <span>TypeScript</span>
              <span>Frontend</span>
            </div>
          </article>

          <article className="compactProjectCard">
            <h3>
              Studi-Buddi
              <a
                href="https://github.com/AtumCor/studi-buddi"
                target="_blank"
                rel="noreferrer"
                className="projectLink"
              >
                ↗
              </a>
            </h3>
            <p>
              Student collaboration app for finding study partners with similar
              schedules and improving coordination.
            </p>
            <div className="techTags">
              <span>Dart</span>
              <span>Flutter</span>
              <span>Mobile App</span>
            </div>
          </article>

          <article className="compactProjectCard">
            <h3>Source Movement Platformer</h3>
            <p>
              Unity platformer experimenting with Source-style movement and
              level editor support.
            </p>
            <div className="techTags">
              <span>Unity</span>
              <span>C#</span>
              <span>Game Dev</span>
            </div>
          </article>

          <article className="compactProjectCard">
            <h3>Factorio Rocket Calculator</h3>
            <p>
              Planning tool for rocket launches and production flow in Factorio.
            </p>
            <div className="techTags">
              <span>React</span>
              <span>TypeScript</span>
              <span>Tooling</span>
            </div>
          </article>

          <article className="compactProjectCard">
            <h3>Desktop Macro Collection</h3>
            <p>
              Small automation scripts and macros for improving workflows and
              gameplay efficiency.
            </p>
            <div className="techTags">
              <span>AutoHotkey</span>
              <span>Automation</span>
              <span>Scripting</span>
            </div>
          </article>
        </div>
      </section>
    </>
  );
}
