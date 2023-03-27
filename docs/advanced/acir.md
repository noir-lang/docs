---
id: acir
title: ACIR
tags:
- Advanced
---

# ACIR (Abstract Circuit Intermediate Representation)

The purpose of ACIR is to act as an intermediate layer between the proof system that Noir chooses to compile to and the Noir syntax.
This separation between proof system and programming language, allows those who want to integrate proof systems to have a stable target, moreover it allows the frontend to compile to any ACIR compatible proof system.

ACIR additionally allows proof systems to supply a fixed list of optimised blackbox functions that the frontend can access. Examples of this would be SHA256, PEDERSEN and SCHNORRSIGVERIFY.

# Compiling a Proof

When inside of a given Noir project the command `nargo compile my_proof` will perform two processes.

- First, compile the Noir program to its ACIR and solve the circuit's witness.

- Second, create a new `build/` directory to store the ACIR, `my_proof.acir`, and the solved witness, `my_proof.tr`

These can be used by the Noir Typescript wrapper to generate a prover and verifier inside of Typescript rather than in Nargo. This will be discussed further in another section.
