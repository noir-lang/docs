---
title: Nargo - Noir CLI Commands for Noir Prover and Verifier
description:
  Noir CLI Commands for Noir Prover and Verifier to create, execute, prove and verify programs,
  generate Solidity verifier smart contract and compile into JSON file containing ACIR
  representation and ABI of circuit.
keywords:
  [
    Nargo,
    Noir CLI,
    Noir Prover,
    Noir Verifier,
    generate Solidity verifier,
    compile JSON file,
    ACIR representation,
    ABI of circuit,
    TypeScript,
  ]
---

# Commands

## `nargo help [subcommand]`

Prints the list of available commands or specific information of a subcommand.

_Arguments_

- `<subcommand>` - The subcommand whose help message to display

## `nargo new <package_name> [path]`

Creates a new Noir project.

_Arguments_

- `<package_name>` - Name of the package
- `[path]` - The path to save the new project

## `nargo check`

Generate the `Prover.toml` and `Verifier.toml` files for specifying prover and verifier in/output
values of the Noir program respectively.

## `nargo execute`

Runs the Noir program and prints its return value.

- `<witness_name>` - The name of the witness

## `nargo prove <proof_name>`

Creates a proof for the program.

_Arguments_

- `<proof_name>` - The name of the proof

## `nargo verify <proof>`

Given a proof and a program, verify whether the proof is valid.

_Arguments_

- `<proof>` - The proof to verify

## `nargo contract`

Generate a Solidity verifier smart contract for the program.

## `nargo compile <circuit_name>`

Compile the program and its secret execution trace into a JSON file containing the ACIR
representation, and the ABI of the circuit.

_Arguments_

- `<circuit_name>` - The name of the circuit file

> The files compiled can be passed into a TypeScript project for proving and verification. See the [TypeScript](../getting_started/typescript.md#proving-and-verifying-externally-compiled-files) section to learn more.
