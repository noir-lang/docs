---
title: Working with TypeScript
description:
  Learn how to interact with Noir programs using TypeScript. Follow this tutorial to compile your
  program, specify inputs, initialize a prover & verifier, and prove and verify your program.
keywords: [TypeScript, Noir, tutorial, compile, inputs, prover, verifier, proof]
---

Interactions with Noir programs can also be performed in TypeScript, which can come in handy when
writing tests or when working in TypeScript-based projects like [Hardhat](https://hardhat.org/).

This guide is based on the [noir-starter](https://github.com/noir-lang/noir-starter) example.
Please refer to it for an example implementation.

:::note

You may find unexpected errors working with some frameworks such as `vite`. This is due to the
nature of `wasm` files and the way Noir uses web workers. As we figure it out, we suggest using
[Create React App](https://create-react-app.dev/), or [Next.js](https://nextjs.org/) for a quick
start.

:::

## Setup

We're assuming you're using ES6 for both browser (for example with React), or nodejs.

Install [Yarn](https://yarnpkg.com/) or [Node.js](https://nodejs.org/en). Init a new project with
`npm init`. Install Noir dependencies in your project by running:

```bash
npm i @aztec/bb.js github:noir-lang/acvm-simulator-wasm.git#c56eec56f67f90fef90126c5575b85190bdcd1e1 github:noir-lang/noir_wasm.git
```

This will install the `acvm-simulator` that will generate our witness, and the proving backend barretenberg `bb.js`. We also install `noir_wasm` which will compile our circuit into the ACIR format.

The witness generator expects our public inputs to be an array of 32 bytes, so every input must be padded. If you're lazy like us, you can just use some library like `ethers` and use `ethers.utils.hexZeroPad`. Just make sure to also run `npm i ethers@5.7.2`

:::note

While Noir is in rapid development, some packages could interfere with others. For that reason, you
should use these specified versions. Let us know if for some reason you need to use other ones.

:::

As for the circuit, we will use the _Standard Noir Example_ and place it in the `src` folder. Feel
free to use any other, as long as you refactor the below examples accordingly.

This standard example is a program that multiplies input `x` with input `y` and returns the result:

```rust
// src/main.nr
fn main(x: u32, y: pub u32) -> pub u32 {
    let z = x * y;
    z
}
```

One valid scenario for proving could be `x = 3`, `y = 4` and `return = 12`

## Compiling

In order to start proving, we need to compile our circuit into the intermediate representation used by our backend. As of today, you have to do that with `nargo`. Just hop to your circuits folder and run `nargo compile main`.

You should have a `json` file in `target/main.json` with your circuit's bytecode. You can then import that file normally.

```ts
import circuit from "../target/main.json";
```

## Decompressing the circuit

The compiled circuit comes compressed with `gZip`. We need to decompress it.

### Decompressing on the server

On the server side, `nodejs` already comes with the `zlib` built-in so we can just add it to the imports list and use it:

```ts
import { gunzipSync } from 'zlib';

const acirBuffer = Buffer.from(circuit.bytecode, 'base64');
const acirBufferUncompressed = gunzipSync(acirBuffer);
```

### Decompressing on the browser

On the browser, you can use the excellent `fflate` package to get the same result:

```ts
import { decompressSync } from 'fflate';

const acirBuffer = Buffer.from(circuit.bytecode, 'base64');
const acirBufferUncompressed = decompressSync(acirBuffer);

```

From here, it's highly recommended you store `acirBuffer` and `acirBufferUncompressed` close by, as they will be used for witness generation and proving.

## Initializing BB.JS

::: note

This step will eventually be abstracted away as Noir tooling matures. For now, you should be fine just literally copy-pasting most of this into your own code.

:::

Before proving, `bb.js` needs to be initialized. We need to import some functions more:

```ts
import {
  Crs,
  BarretenbergApiAsync,
  newBarretenbergApiAsync,
  RawBuffer,
} from '@aztec/bb.js/dest/node';
```

and use them like:

```ts

const api = await newBarretenbergApiAsync(4);

const [exact, total, subgroup] = await api.acirGetCircuitSizes(JSON.parse(circuit.bytecode));
const subgroupSize = Math.pow(2, Math.ceil(Math.log2(circuitSize)));
const crs = await Crs.new(subgroupSize + 1);
await api.commonInitSlabAllocator(subgroupSize);
await api.srsInitSrs(
  new RawBuffer(crs.getG1Data()),
  crs.numPoints,
  new RawBuffer(crs.getG2Data()),
);

const acirComposer = await api.acirNewAcirComposer(subgroupSize);

```

We should take two very useful objects from here: `api` and `acirComposer`. Make sure to keep these close by!

## Generating witnesses

Witness generation is what allows us to prove with arbitrary inputs (like user inputs on a form, game, etc). Could be useful to wrap this on a callable function with your input. In this example, our input is a simple object with our circuit inputs `x` and `y`

```ts
import { ethers } from 'ethers'; // I'm lazy so I'm using ethers to pad my input
import { executeCircuit, compressWitness } from '@noir-lang/acvm_js';

async function generateWitness(input: any, acirBuffer: Buffer): Promise<Uint8Array> {
  const initialWitness = new Map<number, string>();
  initialWitness.set(1, ethers.utils.hexZeroPad(`0x${input.x.toString(16)}`, 32));
  initialWitness.set(2, ethers.utils.hexZeroPad(`0x${input.y.toString(16)}`, 32));
  initialWitness.set(3, ethers.utils.hexZeroPad(`0x${input.z.toString(16)}`, 32));

  const witnessMap = await executeCircuit(acirBuffer, initialWitness, () => {
    throw Error('unexpected oracle');
  });

  const witnessBuff = compressWitness(witnessMap);
  return witnessBuff;
}

```

::: note
On the browser, you need to init the ACVM as well:

```ts
import initACVM, { executeCircuit, compressWitness } from '@noir-lang/acvm_js'; // modify your import to include initACVM

async function generateWitness(input: any): Promise<Uint8Array> {
    await initACVM();
    // the rest of the code...
}
```

:::

## Proving

Finally, we're ready to prove with our backend. Just like with the witness generation, could be useful to wrap it in its own function:

```ts

async function generateProof(witness: Uint8Array) {
  const proof = await api.acirCreateProof(
    acirComposer,
    acirBufferUncompressed,
    gunzipSync(witness), // you should use decompressSync or equivalent on the browser
    false,
  );
  return proof;
}

```

## Verifying

Our backend should also be ready to verify our proof:

```ts
async function verifyProof(proof: Uint8Array) {
  await api.acirInitProvingKey(acirComposer, acirBufferUncompressed);
  const verified = await api.acirVerifyProof(acirComposer, proof, false);
  return verified;
}
```

## Verifying with Smart Contract

Alternatively, a verifier smart contract can be generated and used for verifying Noir proofs in
TypeScript as well.

This could be useful if the Noir program is designed to be decentrally verified and/or make use of
decentralized states and logics that is handled at the smart contract level.

This assumes you've already ran `nargo codegen-verifier`, got your smart contract, and deployed it with Hardhat, Foundry, or your tool of choice. You can then verify a Noir proof by simply calling it.

Currently, `bb.js` appends the public inputs to the proof. However, these inputs need to be fed separately to the verifier contract. A simple solution is to just slice them from the resulting proof, like this:

```ts
import { ethers } from 'ethers'; // example using ethers v5
import artifacts from '../artifacts/circuits/contract/plonk_vk.sol/UltraVerifier.json'; // I compiled using Hardhat, so I'm getting my abi from here

const verifierAddress = "0x123455" // your verifier address
const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = this.provider.getSigner();

const contract = new ethers.Contract(verifierAddress, artifacts.abi, signer);

const publicInputs = proof.slice(0, 32);
const slicedProof = proof.slice(32);
await contract.verify(slicedProof, [publicInputs]);
```
