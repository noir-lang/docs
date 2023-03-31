---
title: Schnorr Signatures
description:
  Learn how you can verify Schnorr signatures using Noir
keywords:
  [
    cryptographic primitives,
    Noir project,
    schnorr,
    signatures,
  ]
---


## schnorr::verify_signature

Verifier for Schnorr signatures

```rust
fn verify_signature(_public_key_x: Field, _public_key_y: Field, _signature: [u8; 64], _message: [u8]) -> Field
```
