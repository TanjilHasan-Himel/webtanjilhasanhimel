# My Portfolio (Vite + React)

Personal portfolio site built with React and Vite.

## Run locally (Windows)

PowerShell blocks npm scripts on some systems. Use cmd:

```bash
cmd /c "cd /d D:\Projects\My Site\my-portfolio && npm install"
cmd /c "cd /d D:\Projects\My Site\my-portfolio && npm run dev"
```

Open: http://localhost:5173/

## Where to edit

All main content lives in `src/App.jsx`:

- `personalInfo` (name, designation, about text)
- `experience` (radio, film, music video)
- `projects` (all project cards)
- `radioMedia`, `filmMedia`, `musicVideoMedia` (media section)
- `playTimeApp` + `appScreens` (Audia Player section)

Browser tab title and icon are in `index.html`.

## Add or edit projects

Inside `const projects = [ ... ]`, each project looks like:

```js
{
	id: "09",
	name: "New Project",
	category: "Web App",
	img: "https://images.unsplash.com/...",
	desc: "Short clear description.",
	stack: ["HTML", "CSS", "JavaScript"],
	liveLink: "https://example.com",
	repoLink: "https://github.com/your/repo",
	challenges: "One short challenge.",
	future: "One short next step."
}
```

Save and refresh the browser.

## Update Audia Player screenshots

Place images in `public/audiaplayer/` and list them in `appScreens`:

```js
const appScreens = [
	"/audiaplayer/1.jpeg",
	"/audiaplayer/2.jpeg"
];
```

## Favicon (browser tab)

Update this line in `index.html` and put the image in `public/`:

```html
<link rel="icon" type="image/jpeg" href="/Tanjil.jpg" />
```
