---
title: Scalar multiplication
description:
  See how you can perform scalar multiplications over a fixed base in Noir
keywords:
  [
    cryptographic primitives,
    Noir project,
    scalar multiplication,
  ]
---

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

:::info

This is a black box function. Read [this section](../../language_concepts/functions#black-box-functions) to learn more about black box functions in Noir.

:::