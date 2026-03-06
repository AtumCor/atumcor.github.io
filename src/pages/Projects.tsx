export default function Projects() {
  return (
    <>
      <article className="module projectsIntro">
        <header className="projectsHeader">
          <h1>Things I’ve Built</h1>
          <p>
            Here’s a mix of professional work and side projects I’ve enjoyed
            creating.
          </p>
        </header>
      </article>

      <article className="module projectSection">
        <h2>Professional Work</h2>

        <div className="cardGrid">
          <div className="card projectCard">
            <h3>HIGNN Project Intern</h3>
            <time dateTime="2024-05">Summer 2024</time>
            <ul>
              <li>
                Developed a Python wrapper for a C++ backend, enhancing
                usability for non-experts.
              </li>
              <li>
                Integrated with a Hierarchical Informative Graph Neural
                Networks framework.
              </li>
              <li>
                Contributed to molecular property prediction, improving
                simulation efficiency.
              </li>
              <li>
                Collaborated with a team of researchers to bridge complex
                algorithms with practical applications.
              </li>
            </ul>
          </div>

          <div className="card projectCard">
            <h3>WILDHACK 12-Hour Mini Hackathon</h3>
            <time dateTime="2023-09">Autumn 2023</time>
            <ul>
              <li>
                Created a Dart application to connect students with similar
                academic schedules.
              </li>
              <li>
                Implemented secure account login and real-time messaging
                features.
              </li>
              <li>
                Designed an intuitive UI for easy navigation and user
                engagement.
              </li>
              <li>
                Participated in a 12-hour hackathon, showcasing rapid
                development skills.
              </li>
            </ul>
          </div>

          <div className="card projectCard">
            <h3>Portfolio Website</h3>
            <time dateTime="2025-05">May 2025</time>
            <ul>
              <li>
                Designed and developed this portfolio website to showcase my
                projects and skills.
              </li>
              <li>
                Utilized HTML, CSS, and JavaScript for a clean, responsive
                design.
              </li>
              <li>
                Focused on user experience with easy navigation and clear
                project descriptions.
              </li>
              <li>
                Implemented best practices for web accessibility and
                performance.
              </li>
            </ul>
          </div>

          <div className="card projectCard">
            <h3>
              Lambda Phi Epsilon Organization Website:{" "}
              <a
                href="https://www.tosulambdas.com/"
                target="_blank"
                rel="noreferrer"
              >
                tosulambdas.com
              </a>
            </h3>
            <time dateTime="2023-09">Autumn 2023</time>
            <ul>
              <li>
                Developed a modern, responsive website for the Lambda Phi
                Epsilon fraternity.
              </li>
              <li>
                Implemented features like event calendars, member profiles, and
                news updates.
              </li>
              <li>
                Focused on user-friendly design and easy content management for
                non-technical users.
              </li>
              <li>
                Utilized Jekyll for static site generation, ensuring fast load
                times and SEO optimization.
              </li>
            </ul>
          </div>
        </div>
      </article>

      <article className="module projectSection">
        <h2>Hobby Projects</h2>

        <div className="cardGrid">
          <div className="card projectCard">
            <h3>(WIP) Source Movement Platformer</h3>
            <p>
              A Unity-based platformer utilizing source-style movement with
              level editor support.
            </p>
          </div>

          <div className="card projectCard">
            <h3>(WIP) Factorio Mod</h3>
            <p>
              A Factorio rocket launch calculator built with React and
              TypeScript.
            </p>
          </div>

          <div className="card projectCard">
            <h3>(WIP) Desktop Macro Collection</h3>
            <p>
              A collection of desktop macros for various games, enhancing
              gameplay efficiency.
            </p>
          </div>
        </div>
      </article>
    </>
  );
}