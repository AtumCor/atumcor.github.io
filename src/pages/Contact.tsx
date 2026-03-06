import "../styles/pages/contact.css";
import BongoCatEasterEgg from "../components/ui/BongoCatEasterEgg";

type ContactItem = {
  label: string;
  value: string;
  href: string;
  icon: React.ReactNode;
  helper?: string;
};

const CONTACTS: ContactItem[] = [
  {
    label: "Email",
    value: "j.meng1024@gmail.com.com",
    href: "mailto:j.meng1024@gmail.com.com",
    helper: "Best for internships, collabs, and questions",
    icon: <MailIcon />,
  },
  {
    label: "GitHub",
    value: "@AtumCor",
    href: "https://github.com/AtumCor",
    helper: "Projects, code, and experiments",
    icon: <GitHubIcon />,
  },
  {
    label: "Instagram",
    value: "@atumcor",
    href: "https://instagram.com/atumcor",
    helper: "Casual updates and photos",
    icon: <InstagramIcon />,
  },
  {
    label: "",
    value: "Resume",
    href: `${import.meta.env.BASE_URL}Jiaming_(Jerry)_Meng.pdf`,
    helper: "",
    icon: <DocumentIcon />
  }
];

export default function Contact() {
  return (
    <>
      <article className="module contactModule">
        <div className="contactHero">
            
          <h2>Let’s build something cool.</h2>
          <p className="contactIntro">
            I'm bored
          </p>
        </div>

        <div className="contactGrid">
          {CONTACTS.map((item) => (
            <a
              key={item.label}
              className="contactCard"
              href={item.href}
              target={item.href.startsWith("http") ? "_blank" : undefined}
              rel={item.href.startsWith("http") ? "noreferrer" : undefined}
              aria-label={`${item.label}: ${item.value}`}
            >
              <div className="contactIconWrap">{item.icon}</div>

              <div className="contactText">
                <span className="contactLabel">{item.label}</span>
                <span className="contactValue">{item.value}</span>
                {item.helper ? <span className="contactHelper">{item.helper}</span> : null}
              </div>

              <span className="contactArrow" aria-hidden="true">
                ↗
              </span>
            </a>
          ))}
        </div>

        <div className="contactHint" aria-live="polite">
          <span>Fun fact:</span> press <kbd>Space</kbd> a few times.
        </div>
      </article>

      <BongoCatEasterEgg />
    </>
  );
}

function IconBase({ children }: { children: React.ReactNode }) {
  return (
    <svg
      className="contactIcon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

function MailIcon() {
  return (
    <IconBase>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M4 7l8 6 8-6" />
    </IconBase>
  );
}

// function PhoneIcon() {
//   return (
//     <IconBase>
//       <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.3 19.3 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7l.4 2.6a2 2 0 0 1-.6 1.7l-1.6 1.6a16 16 0 0 0 7.1 7.1l1.6-1.6a2 2 0 0 1 1.7-.6l2.6.4A2 2 0 0 1 22 16.9z" />
//     </IconBase>
//   );
// }

function GitHubIcon() {
  return (
    <IconBase>
      <path d="M9 19c-4 1.2-4-2-6-2" />
      <path d="M15 22v-3.1a3.4 3.4 0 0 0-.9-2.6c3-.3 6.2-1.5 6.2-6.7A5.2 5.2 0 0 0 19 6.1 4.8 4.8 0 0 0 18.9 3S17.7 2.7 15 4.5a13.4 13.4 0 0 0-6 0C6.3 2.7 5.1 3 5.1 3A4.8 4.8 0 0 0 5 6.1a5.2 5.2 0 0 0-1.3 3.5c0 5.2 3.2 6.4 6.2 6.7A3.4 3.4 0 0 0 9 18.9V22" />
    </IconBase>
  );
}

function InstagramIcon() {
  return (
    <IconBase>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.7" fill="currentColor" stroke="none" />
    </IconBase>
  );
}

// function XIcon() {
//   return (
//     <IconBase>
//       <path d="M4 4l16 16" />
//       <path d="M20 4L4 20" />
//     </IconBase>
//   );
// }

function DocumentIcon() {
  return (
    <IconBase>
      {/* document shape */}
      <path d="M6 2h9l5 5v13a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z" />
      {/* folded corner */}
      <path d="M15 2v6h6" />
      {/* text lines */}
      <path d="M9 13h6" />
      <path d="M9 17h6" />
    </IconBase>
  );
}