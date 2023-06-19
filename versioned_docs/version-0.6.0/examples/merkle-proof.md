---
title: Merkle Proof Membership
description:
  Learn how to use merkle membership proof in Noir to prove that a given leaf is a member of a
  merkle tree with a specified root, at a given index.
keywords:
  [merkle proof, merkle membership proof, Noir, rust, hash function, Pedersen, sha256, merkle tree]
---

Let's walk through an example of a merkle membership proof in Noir that proves that a given leaf is
in a merkle tree.

```rust
use dep::std;

fn main(message : [Field; 62], index : Field, hashpath : [Field; 40], root : Field) {
    let leaf = std::hash::hash_to_field(message);
    let is_member = std::merkle::check_membership(root, leaf, index, hashpath);
    constrain is_member == 1;
}

```

:::info

The `std::merkle::check_membership` function is no longer in the standard library. The equivalent functionality can be achieved by using `std::merkle::compute_merkle_root` and checking that the computed root matches an expected value.

:::

The above code uses the noir standard library to call both of the aforementioned components.

```rust
let leaf = std::hash::hash_to_field(message);
```

The message is hashed using `hash_to_field`. The specific hash function that is being used is chosen
by the backend. The only requirement is that this hash function can heuristically be used as a
random oracle. If only collision resistance is needed, then one can call `std::hash::pedersen`
instead.

```rust
let is_member = std::merkle::check_membership(root, leaf, index, hashpath);
```

The leaf is then passed to a check_membership proof with the root, index and hashpath. `is_member`
returns 1 if the leaf is a member of the merkle tree with the specified root, at the given index.

> **Note:** It is possible to re-implement the merkle tree implementation without standard library.
> However, for most usecases, it is enough. In general, the standard library will always opt to be
> as conservative as possible, while striking a balance with efficiency.

An example, the merkle membership proof, only requires a hash function that has collision
resistance, hence a hash function like Pedersen is allowed, which in most cases is more efficient
than the even more conservative sha256.

```rust
constrain is_member == 1;
```

This last line, constrains the variable to be equal to 1. If 1 was changed to 0, this would create a
proof that the leaf was not present at that specific index for that specific root. _Importantly, it
would not prove that this leaf was not in the merkle tree._

Example Project: <https://github.com/vezenovm/simple_shield>
