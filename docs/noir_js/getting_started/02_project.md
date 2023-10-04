---
title: Project
description:
  Learn how to configure a new app that uses Noir and Barretenberg Backend to generate and verify zero-knowledge SNARK proofs in a typescript or javascript environment
keywords: [how to, guide, javascript, typescript, noir, barretenberg, zero-knowledge, proofs]
---

If you come from the previous page, your folder structure should look like this:

```
| circuit
| | src
| | | main.nr
| | target
| | | circuit.json
| | Nargo.toml
| package.json
| vite.config.js
| index.html
| app.js
```

You'll see other files and folders showing up (like `package-lock.json`, `yarn.lock`, `node_modules`) but you shouldn't have to care about those.

## Importing our dependencies

We're starting with the good stuff now. We want to import our two libraries. At the top of the typescript file, import them:

```ts
import { BarretenbergBackend } from '@noir-lang/backend_barretenberg';
import { Noir } from '@noir-lang/noir_js';
```

We also need to import the `circuit` JSON file we created. If you have the suggested folder structure, you can add this line:

```ts
import circuit from './circuit/target/circuit.json';
```

## Write code

:::note

We're gonna be adding code inside the `document.addEventListener...etc` block:

```js
// forget stuff here
document.addEventListener('DOMContentLoaded', async () => {
  // here's where the magic happens
})
// forget stuff here
```

:::

Our dependencies exported two classes: `BarretenbergBackend` and `Noir`. Let's `init` them and add some logs, just to flex:

```ts
const backend = new BarretenbergBackend(circuit);
const noir = new Noir(circuit, backend);

display("logs", "Init... ⌛")
await noir.init();
display("logs", "Init... ✅")
```

You're probably eager to see stuff happening, so go and run your app now!

From your terminal, run `npm start` (or `yarn start`). If it doesn't open a browser for you, just visit `localhost:5173`. You'll see your app with the two logs:

![Getting Started 0](./../../../static/img/noir_getting_started_0.png)

## Proving

Now we're ready to prove stuff! Let's feed some inputs to our circuit and calculate the proof:

```js
  const input = { x: 1, y: 2 };
  display("logs", "Generating proof... ⌛")
  const proof = await noir.generateFinalProof(input);
  display("logs", "Generating proof... ✅")
  display("results", proof);
```

Save your doc and vite should refresh your page automatically. On a modern laptop, proof will generate in less than 100ms, and you'll see this:

![Getting Started 0](./../../../static/img/noir_getting_started_1.png)

If you're human, you shouldn't be able to understand anything on the "proof" box. That's OK. We like you, human.

In any case, this means your proof was generated! But you shouldn't trust me just yet. Add these lines to see it being verified:

```js
  display("logs", "Verifying proof... ⌛")
  const verification = await noir.verifyFinalProof(proof);
  if (verification) display("logs", "Verifying proof... ✅")
```

By saving, your app will refresh and here's our complete Tiny Noir App!
