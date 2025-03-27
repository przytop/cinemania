# Cinemania

This project was built using Vite. To learn more and configure additional
features, [check out the documentation](https://vite.dev/).

## Getting Started

1. Make sure you have the LTS version of Node.js installed on your computer.
   [Download and install it if necessary](https://nodejs.org/en/).
2. Install the basic dependencies of the project in the terminal using the
   `npm install` or simply `npm i` command.
3. Run the development mode by executing the `npm run dev` command.
4. Open [http://localhost:5173](http://localhost:5173) in your browser. The page
   will automatically reload after saving changes in the project files.

## Files and Folders

- HTML component files should be placed in the `src/partials` folder and
  imported into the `index.html` file. For example, the header file
  `header.html` should be created in the `partials` folder and imported into
  `index.html`.
- Style files should be placed in the `src/css` folder and imported into the
  HTML files of the pages. For example, for `index.html`, the style file is
  called `index.css`.
- Images should be added to the `src/img` folder. The build tool will optimize
  them, but only after the production version of the project is deployed. This
  happens in the cloud to avoid overloading your computer, as it can take a long
  time on weaker machines.

## Deployment

The production version of the project will be automatically built and deployed
to GitHub Pages in the `gh-pages` branch every time the `main` branch is
updated. For example, after a direct push or a pull request is merged. To do
this, modify the `--base=/<REPO>/` flag in the `build` script in the
`package.json` file, replacing `<REPO>` with the repository name, and push the
changes to GitHub.

```json
"build": "vite build --base=/<REPO>/",
```

### Deployment Status

The deployment status of the latest commit is displayed with an icon next to its
ID.

- **Yellow** - the project is being built and deployed.
- **Green** - deployment was successful.
- **Red** - there was an error during linting, building, or deploying.

More detailed information about the status can be viewed by clicking the icon
and then the `Details` link in the dropdown.

### Live Site

After a while, usually a few minutes, the live site can be accessed at the
address specified in the `Settings` > `Pages` tab in the repository settings.

If you see a blank page, make sure there are no errors related to incorrect file
paths for CSS and JS in the `Console` tab `(404)`. Most likely, you have an
incorrect value for the `--base` flag in the `build` script in the
`package.json` file.

## How It Works

1. After each push to the `main` branch of the GitHub repository, a special
   script (GitHub Action) from the `.github/workflows/deploy.yml` file is
   triggered.
2. All repository files are copied to the server, where the project is
   initialized, linted, and built before deployment.
3. If all steps succeed, the production version of the project files is pushed
   to the `gh-pages` branch. Otherwise, an error message will appear in the
   script execution log.
