---
title: Cryptographic primitives in Noir
description:
  Learn about the cryptographic primitives ready to use for any Noir project, including sha256,
  blake2s, pedersen, mimc_bn254 and mimc, scalar_mul::fixed_base, schnorr::verify_signature, and
  ecdsa_secp256k1::verify_signature.
keywords:
  [
    cryptographic primitives,
    Noir project,
    sha256,
    blake2s,
    pedersen,
    mimc_bn254,
    mimc,
    scalar multiplication,
    schnorr,
    schnorr signatures,
    ecdsa secp256k1,
    ecdsa signatures,
  ]
---

# Cryptographic primitives

Some cryptographic primitives are already developed and ready-to-use for any Noir project:

## sha256

Given an array of bytes, returns the sha256 of it:

```rust
fn main() {
    let x = [163, 117, 178, 149] // some random bytes
    let hash = std::hash::sha256(x);
}
```

## blake2s

Given an array of bytes, returns the Blake2 of it:

```rust
fn main() {
    let x = [163, 117, 178, 149] // some random bytes
    let hash = std::hash::blake2s(x);
}
```

## pedersen

Given an array of Fields, returns the Pedersen hash of it:

```rust
fn main() {
    let x = [163, 117, 178, 149] // some random bytes
    let hash = std::hash::pedersen(x);
}
```

## mimc_bn254 and mimc

`mimc_bn254` is `mimc`, but with hardcoded parameters for the BN254 curve. You can use it by
providing an array of Fields, and it returns a Field with the hash. You can use the `mimc` method if
you're willing to input your own constants:

```rust
fn mimc<N>(x: Field, k: Field, constants: [Field; N], exp : Field) -> Field
```

otherwise, use the `mimc_bn254` method:

```rust
fn mimc_bn254<N>(array: [Field; N]) -> Field
```

example:

```rust

fn main() {
    let x = [163, 117, 178, 149] // some random bytes
    let hash = std::hash::mimc_bn254(x);
}
```

## scalar_mul::fixed_base

Performs scalar multiplication over the embedded curve whose coordinates are defined by the
configured noir field. For the BN254 scalar field, this is BabyJubJub or Grumpkin.

```rust
fn fixed_base(_input : Field) -> [Field; 2]
```

example

```rust
fn main(x : Field) {
    let scal = std::scalar_mul::fixed_base(x);
    std::println(scal);
}
```

## schnorr::verify_signature

Verifier for Schnorr signatures

```rust
fn verify_signature(_public_key_x: Field, _public_key_y: Field, _signature: [u8; 64], _message: [u8]) -> Field
```

## ecdsa_secp256k1::verify_signature

Verifier for ECDSA Secp256k1 signatures

```rust
fn verify_signature(_public_key_x : [u8; 32], _public_key_y : [u8; 32], _signature: [u8; 64], _message: [u8]) -> Field
```
