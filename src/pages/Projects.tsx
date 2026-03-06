import "../styles/pages/projects.css";

export default function Projects() {
  return (
    <>
      <section className="projectsSection">
        <div className="projectGrid">
          <div className="projectCard">
            <h3>
              Portfolio Website
              <a
                href="https://github.com/atumcor/atumcor.github.io"
                target="_blank"
                rel="noreferrer"
                className="projectLink portfolioLink"
              >
                ↗<span className="projectTooltip">You are looking at it!</span>
              </a>
            </h3>

            <time dateTime="2025-05">May 2025</time>

            <ul>
              <li>Personal portfolio built with React and TypeScript.</li>
              <li>Horizontally scrolling page layout.</li>
              <li>Minimal academic design with animated elements.</li>
            </ul>

            <div className="techTags">
              <span>React</span>
              <span>TypeScript</span>
              <span>CSS</span>
            </div>
          </div>

          <div className="projectCard">
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

            <time dateTime="2023-09">Autumn 2023</time>

            <ul>
              <li>Official website for the Lambda Phi Epsilon fraternity.</li>
              <li>Member profiles, events, and organization information.</li>
              <li>Built using Jekyll for fast static hosting.</li>
            </ul>

            <div className="techTags">
              <span>Jekyll</span>
              <span>Liquid</span>
              <span>Ruby</span>
            </div>
          </div>
          <div className="projectCard">
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

            <time>2024</time>

            <ul>
              <li>
                Interactive scavenger hunt style application for organizing
                group activities.
              </li>
              <li>
                Designed to manage challenges, participants, and progress
                tracking.
              </li>
              <li>
                Focused on simple user interaction and event-based gameplay
                mechanics.
              </li>
            </ul>

            <div className="techTags">
              <span>Typescript</span>
              <span>Web App</span>
              <span>Frontend</span>
              <span>Google Map API</span>
              <span>ChatGPT API</span>
            </div>
          </div>
          <div className="projectCard">
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

            <time>2023</time>

            <ul>
              <li>
                Study collaboration platform designed to connect students with
                compatible schedules.
              </li>
              <li>
                Allows users to discover study partners and coordinate sessions.
              </li>
              <li>
                Built as a hackathon project emphasizing rapid development and
                usability.
              </li>
            </ul>

            <div className="techTags">
              <span>Dart</span>
              <span>Flutter</span>
              <span>Mobile App</span>
            </div>
          </div>
          <div className="projectCard">
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

            <time>2025</time>

            <ul>
              <li>
                Web application for organizing and visualizing clothing
                collections digitally.
              </li>
              <li>
                Allows users to catalog garments and experiment with outfit
                combinations.
              </li>
              <li>
                Focuses on intuitive UI and visual browsing of wardrobe items.
              </li>
            </ul>

            <div className="techTags">
              <span>Dart</span>
              <span>TypeScript</span>
              <span>Frontend</span>
              <span>PyTorch</span>
            </div>
          </div>
        </div>
      </section>

      <section className="projectsSection hobbySection">
        <header className="projectsSubheader">
          <h2>Hobby Projects</h2>
          <p>Small experiments and works in progress.</p>
        </header>

        <div className="hobbyGrid">
          <div className="hobbyCard">
            <h3>Source Movement Platformer</h3>
            <p>
              Unity platformer using Source-style movement mechanics with a
              custom level editor.
            </p>
            <div className="techTags">
              <span className="projectTag">WIP</span>
              <span>Unity</span>
              <span>C#</span>
            </div>
          </div>

          <div className="hobbyCard">
            <h3>Factorio Rocket Calculator</h3>
            <p>
              React + TypeScript tool for planning rocket launches in Factorio.
            </p>
            <div className="techTags">
              <span className="projectTag">WIP</span>
              <span>Python</span>
            </div>
          </div>

          <div className="hobbyCard">
            <h3>Desktop Macro Collection</h3>
            <p>
              A collection of macros and automation tools for various games.
            </p>
            <div className="techTags">
              <span className="projectTag">WIP</span>
              <span>C#</span>
              <span>Auto Hotkey</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
