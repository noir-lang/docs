---
title: Working with TypeScript
description:
  Learn how to interact with Noir programs using TypeScript. Follow this tutorial to compile your
  program, specify inputs, initialize a prover & verifier, and prove and verify your program.
keywords: [TypeScript, Noir, tutorial, compile, inputs, prover, verifier, proof]
---

Interactions with Noir programs can also be performed in TypeScript, which can come in handy when
writing tests or when working in TypeScript-based projects like [Hardhat](https://hardhat.org/).

You can check the complete code for this tutorial here: [browser with next.js](https://github.com/signorecello/noir-min-browser-example) and [node.js](https://github.com/signorecello/noir-min-nodejs-example). If you want just a browser boilerplate to start with, check out the [noir-starter](https://github.com/noir-lang/noir-starter) for an example implementation.

:::note

You may find unexpected errors working with some frameworks such as `vite`. This is due to the
nature of `wasm` files and the way Noir uses web workers. As we figure it out, we suggest using
[Create React App](https://create-react-app.dev/), or [Next.js](https://nextjs.org/) for a quick
start.

:::

## Setup

We're assuming you're using ES6 for both browser (for example with React), or nodejs. Install [Node.js](https://nodejs.org/en). Init a new project with `npm init`. Install Noir dependencies in your project by running:

```bash
npm i @aztec/bb.js github:noir-lang/acvm-simulator-wasm.git#c56eec56f67f90fef90126c5575b85190bdcd1e1 github:noir-lang/noir_wasm.git fflate ethers@5.7.2
```

This will install the `acvm-simulator` that will generate our witness, and the proving backend barretenberg `bb.js`.

We're also installing `ethers` because we're too lazy to write a function that pads public inputs with 32bytes, and `fflate` to help us decompress our circuit bytecode.

:::note

While Noir is in rapid development, some packages could interfere with others. For that reason, you
should use these specified versions. Let us know if for some reason you need to use other ones.

:::

As for the circuit, we will use a Standard Noir Example and place it in the `src` folder. Feel
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

:::info

At this time, you need to _specifically_ use version 0.9.0 of nargo. Using [noirup](./getting_started/00_nargo_installation.md#option-1-noirup) you can do this simply by running `noirup -v 0.9.0`.

:::

You should have a `json` file in `target/main.json` with your circuit's bytecode. You can then import that file normally.

```ts
import circuit from "../target/main.json";
```

## Decompressing the circuit

The compiled circuit comes compressed. We need to decompress it, that's where `fflate` comes in.

```ts
import { decompressSync } from 'fflate';

const acirBuffer = Buffer.from(circuit.bytecode, 'base64');
const acirBufferUncompressed = decompressSync(acirBuffer);
```

From here, it's highly recommended you store `acirBuffer` and `acirBufferUncompressed` close by, as they will be used for witness generation and proving.

## Initializing ACVM and BB.JS

:::note

This step will eventually be abstracted away as Noir tooling matures. For now, you should be fine just literally copy-pasting most of this into your own code.

:::

Before proving, `bb.js` needs to be initialized. We need to import some functions and use them

```ts
import {
  Crs,
  newBarretenbergApiAsync,
  RawBuffer,
} from '@aztec/bb.js/dest/node';

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

:::info

On the browser, you also need to init the ACVM. You can do that by importing it and calling it like:

```ts
import initACVM, { executeCircuit, compressWitness } from '@noir-lang/acvm_js';

await initACVM();
// the rest of your code
```

:::

## Generating witnesses

Witness generation is what allows us to prove with arbitrary inputs (like user inputs on a form, game, etc). In this example, our input is a simple object with our circuit inputs `x`, `y`, and return `z` (fun fact: the return value in Noir is actually a public input!). We're wrapping it in a function, so it can be conveniently called later on.

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

## Proving

Finally, we're ready to prove with our backend. Just like with the witness generation, could be useful to wrap it in its own function:

```ts
async function generateProof(witness: Uint8Array) {
  const proof = await api.acirCreateProof(
    acirComposer,
    acirBufferUncompressed,
    decompressSync(witness),
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

## Now for the fun part

Let's call our functions, and destroy our API!

```ts
const input = { x: 3, y: 4, z: 12 };
const witness = await generateWitness(input, acirBuffer);
console.log("Witness generated!")
const proof = await generateProof(witness);
console.log("Proof generated!")
await verifyProof(proof);
console.log("Proof verified!")
api.destroy();
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
