---
title: Setup
description:
  Learn how to setup a new app that uses Noir to generate and verify zero-knowledge SNARK proofs in a typescript or javascript environment
keywords: [how to, guide, javascript, typescript, noir, barretenberg, zero-knowledge, proofs]
---

Noir JS works both on the browser and on the server, and works for both ESM and CJS module systems. In this page, we will learn how can we write a simple test and a simple webapp to verify the Standard Noir Example.

## Before we start

Make sure you have Node installed on your machine by opening a terminal and executing `node --version`. If you don't see a version, you should install [node](https://nodejs.org/en/download). You can also use `yarn` if you prefer that package manager.

First of all, follow the the [Nargo guide](../../getting_started/00_nargo_installation.md) to install nargo and create a new project with `nargo new circuit`. Once there, `cd` into the `circuit` folder. You should then be able to compile your circuit into `json` format and see it inside the `target` folder:

```bash
nargo compile
```

Your folder structure should look like:

```
| circuit
| | src
| | | main.nr
| | target
| | | circuit.json
| | Nargo.toml
```

## Starting a new project

Go back to the previous folder and start a new project by running run `npm init` or `yarn create`. You can configure your project or just leave the defaults, and see a `package.json` appear in your root folder.

## Installing dependencies

We'll need two `npm` packages. These packages will provide us the methods we need to run and verify proofs. Let's install them:

`npm i @noir-lang/backend_barretenberg @noir-lang/noir_js`

To serve our page, we can use a build tool such as `vite`. Because we're gonna use some `wasm` files, we need to install a plugin as well. Run:

`npm i --save-dev vite rollup-plugin-copy`

Since we're on the dependency world, we may as well define a nice starting script. Vite makes it easy. Just open `package.json`, find the block "scripts" and add this just below the line with `"test" : "echo......."`:

```json
  "start": "vite --open"
```

If you want do build a static website, you can also add some build and preview scripts:

```json
    "build": "vite build",
    "preview": "vite preview"
```

## Vite plugins

Vite is great, but support from `wasm` doesn't work out-of-the-box. We're gonna write a quick plugin and use another one. Just copy and paste this into a file named `vite.config.js`. You don't need to understand it, just trust me bro.

```js
import { defineConfig } from "vite";
import copy from 'rollup-plugin-copy'
import fs from 'fs'
import path from "path"

const wasmContentTypePlugin = {
 name: "wasm-content-type-plugin",
 configureServer(server) {
  server.middlewares.use(async (req, res, next) => {
   if (req.url.endsWith(".wasm")) {
    res.setHeader("Content-Type", "application/wasm");
                const newPath = req.url.replace("deps", "dist");
                const targetPath = path.join(__dirname, newPath);
                const wasmContent = fs.readFileSync(targetPath);
                return res.end(wasmContent);
   }
            next();
  });
 },
};

export default defineConfig(({ command }) => {
    if (command === "serve") {
        return {
            plugins: [
            copy({
                targets: [
                    { src: 'node_modules/**/*.wasm', dest: 'node_modules/.vite/dist' },
                ],
                copySync: true,
                hook: "buildStart"
            }),
            command === "serve" ? wasmContentTypePlugin : []
        ]}
    }
    
    return {}
});
```

## HTML

Here's the simplest HTML with some terrible UI. Create a file called `index.html` and paste this:

```html
<!DOCTYPE html>
<head>
  <style>
    .outer {
        display: flex;
        justify-content: space-between;
        width: 100%;
    }
    .inner {
        width: 45%; 
        border: 1px solid black; 
        padding: 10px; 
        word-wrap: break-word;
    }
  </style>
</head>
<body>
  <script type="module" src="/app.js"></script>
  <h1>Very basic Noir app</h1>
  <div class="outer">
    <div id="logs" class="inner"><h2>Logs</h2></div>
    <div id="results" class="inner"><h2>Proof</h2></div>
  </div>
</body>
</html>
```

## Some good old vanilla Javascript

Create a new file `app.js`, which is where our javascript code will live. Let's start with this code inside:

```js
document.addEventListener('DOMContentLoaded', async () => {
});
```

We can manipulate our website with a little function, so we can see our website working. Add this at the bottom and forget it exists:

```js
function display(container, msg) {
  const c = document.getElementById(container);
  const p = document.createElement("p");
  p.textContent = msg;
  c.appendChild(p);
}
```

[On the next section](./02_project.md), we're gonna Noir it!
