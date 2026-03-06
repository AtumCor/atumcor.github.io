import type { ReactNode } from "react";

export default function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="page" id={id} aria-label={title}>
      <div className="pageInner">
        <header className="pageHeader">
          <h1 className="pageTitle">{title}</h1>
        </header>
        <div className="modules">{children}</div>
      </div>
    </section>
  );
}
