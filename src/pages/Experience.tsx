import "../styles/pages/experience.css";

export default function Experience() {
  return (
    <>
      {/* Research */}
      <article className="module">
        <h2>Research</h2>

        <div className="experienceItem">
          <h3>HIGNN — Research Contributor</h3>

          <ul className="experienceList">
            <li>
              Contributed to research involving graph neural networks applied to
              biological and computational datasets.
            </li>
            <li>
              Assisted in developing machine learning pipelines for analyzing
              graph-structured biological data.
            </li>
            <li>
              Worked with Python and scientific computing libraries to process
              datasets and support experimental evaluation.
            </li>
          </ul>

          <div className="experienceTags">
            <span>Python</span>
            <span>Graph Neural Networks</span>
            <span>Machine Learning</span>
            <span>Scientific Computing</span>
          </div>
        </div>
      </article>

      {/* Leadership */}
      <article className="module">
        <h2>Leadership</h2>

        <div className="experienceItem">
          <h3>Multicultural Greek Council — Executive Vice President</h3>

          <div className="experienceMeta">
            The Ohio State University • Jan 2025 – Present
          </div>

          <ul className="experienceList">
            <li>
              Oversee the executive board and support strategic planning across
              member organizations.
            </li>
            <li>
              Coordinate monthly community events with 70+ attendees to promote
              cultural awareness and collaboration.
            </li>
            <li>
              Led a fundraising initiative that raised $2,000 for Lutheran
              Social Service.
            </li>
          </ul>

          <div className="experienceTags">
            <span>Leadership</span>
            <span>Event Coordination</span>
            <span>Fundraising</span>
            <span>Community Engagement</span>
          </div>
        </div>
      </article>
    </>
  );
}