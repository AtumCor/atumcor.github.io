# Personal Portfolio Website

A minimal, interactive portfolio website built with **React, TypeScript, and Vite**, designed to showcase projects, skills, experience, and contact information.

The site uses a **horizontal scroll layout with page snapping**, subtle UI animations, and a continuous gradient background to create a clean, modern browsing experience.

🌐 **Live Site:**
[https://atumcor.github.io](https://atumcor.github.io)

---

# Features

### Horizontal Navigation

Instead of traditional vertical scrolling, the site uses **horizontal page navigation** with snapping between sections.

Pages included:

* Home
* Projects
* Skills
* Experience
* Contact

### Smooth UI Interactions

* animated title rotation on the home page
* hover effects for project and contact cards
* animated page indicators
* subtle gradient transitions across pages

### Easter Eggs

Hidden interactive elements are included for fun exploration.

Example:

* Press **Space multiple times** on the Contact page to activate **Bongo Cat mode**.

---

# Tech Stack

Frontend

* **React**
* **TypeScript**
* **Vite**

Styling

* Modular CSS architecture
* CSS Grid / Flexbox layouts
* CSS transitions and animations

Deployment

* **GitHub Pages**

---

# Project Structure

```text
src/
 ├─ components/
 │   ├─ layout/
 │   └─ ui/
 │
 ├─ pages/
 │   ├─ Home.tsx
 │   ├─ Projects.tsx
 │   ├─ Skills.tsx
 │   ├─ Experience.tsx
 │   └─ Contact.tsx
 │
 ├─ styles/
 │   ├─ layout/
 │   ├─ pages/
 │   └─ ui/
 │
 ├─ assets/
 │
 └─ App.tsx
```

The site is organized around **page modules**, reusable UI components, and modular CSS styles.

---

# Local Development

Clone the repository:

```bash
git clone https://github.com/AtumCor/atumcor.github.io.git
cd atumcor.github.io
```

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open the local server:

```text
http://localhost:5173
```

---

# Build

To build the production version:

```bash
npm run build
```

The generated site will appear in:

```
dist/
```

---

# Deployment

This repository is configured for **GitHub Pages deployment**.

Because the repository name is:

```
atumcor.github.io
```

GitHub automatically serves the `main` branch as the live website.

Any push to `main` updates the site.

---

# Future Improvements

Potential features planned for future versions:

* project filtering by technology
* animated skill visualizations
* blog / notes section
* improved accessibility support
* additional hidden interactive elements

---

# Author

**Jiaming (Jerry) Meng**

Computer Science & Mathematics student

GitHub
[https://github.com/AtumCor](https://github.com/AtumCor)

