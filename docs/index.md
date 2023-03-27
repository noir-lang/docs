---
id: index
title: The Noir Programming Language
slug: "/"
tags:
- Introductory
---

This version of the book is being released with the public alpha.
There will be a lot of features that are missing in this version, however the syntax and the feel of the language will mostly be completed.

## What is Noir?

Noir is a domain specific language for creating and verifying proofs.
It's design choices are influenced heavily by Rust.

## What's new about Noir?

Noir is much more simple and flexible in design as it does not compile immediately to a fixed NP-complete language.
Instead Noir compiles to an intermediate language which itself can be compiled to an arithmetic circuit or a rank-1 constraint system.
This in itself brings up a few challenges within the design process, but allows one to decouple the programming language completely from the backend.
This is similar in theory to LLVM.

## Who is Noir for?

Noir can be used for a variety of purposes.

### Ethereum Developers

Noir currently includes a command to publish a contract which verifies your Noir program. This will be modularised in the future, however as of the alpha you can use the `contract` command to create it.

### Protocol Developers

As a protocol developer, you may not want to use the Aztec backend due to it not being a fit for your stack or maybe you simply want to use a different proving system.
Since Noir does not compile to a specific proof system, it is possible for protocol developers to replace the PLONK based proving system with a different proving system altogether.

### Blockchain developers

As a blockchain developer, you will be constrained by parameters set by your blockchain, ie the proving system and smart contract language has been pre-defined.
In order for you to use Noir in your blockchain, a proving system backend must be implemented for it and a smart contract interface must be implemented for it.
