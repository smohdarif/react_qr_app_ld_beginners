# What Does the `npm run deploy` Command Do?

## Overview

The `npm run deploy` command in this project is used to build and publish your React application to GitHub Pages, making it accessible as a static website.

---

## How It Works

### 1. **Build the React App**

When you run:

```sh
npm run deploy
```

It first runs the `predeploy` script:

```json
"predeploy": "npm run build"
```

This builds the production-ready static files for your React app and puts them in the `build/` directory.

---

### 2. **Publish to GitHub Pages**

After building, the `deploy` script runs:

```json
"deploy": "gh-pages -d build"
```

This uses the [`gh-pages`](https://www.npmjs.com/package/gh-pages) package to publish the contents of the `build/` directory to the `gh-pages` branch of your repository.

---

## What This Means

- Your app is automatically built and deployed to GitHub Pages.
- The deployed site will be available at the URL specified in the `homepage` field of your `package.json`:
  ```
  https://smohdarif.github.io/react_qr_app_ld_beginners/
  ```

---

## Summary of Steps

1. **Builds** your React app for production.
2. **Publishes** the build output to the `gh-pages` branch.
3. **Makes your app live** at your GitHub Pages URL.

---

## References

- [Create React App: Deployment](https://create-react-app.dev/docs/deployment/#github-pages)
- [gh-pages npm package](https://www.npmjs.com/package/gh-pages)
