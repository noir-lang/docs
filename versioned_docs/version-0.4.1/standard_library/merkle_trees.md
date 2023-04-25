---
title: Merkle Trees
description:
  Learn about Merkle Trees in Noir with this tutorial. Explore the basics of check membership and
  computing root from leaf, and implement them in your code with the help of code
keywords:
  [
    Merkle trees in Noir,
    Noir programming language,
    check membership,
    computing root from leaf,
    Noir Merkle tree implementation,
    Merkle tree tutorial,
    Merkle tree code examples,
    Noir libraries,
    pedersen hash.,
  ]
---

# Merkle Trees

## check_membership

Returns 1 if the specified leaf is at the given index on a tree

```rust
fn check_membership(_root : Field, _leaf : Field, _index : Field, _hash_path: [Field]) -> Field
```

example:

```rust
/**
 *
    index = "0"
    priv_key = "0x000000000000000000000000000000000000000000000000000000616c696365"
    secret = "0x1929ea3ab8d9106a899386883d9428f8256cfedb3c4f6b66bf4aa4d28a79988f"
    root = "0x2f36d4404719a30512af45be47c9732e916cb131933102b04ba6432602db209c"
    hash_path = [
    "0x1e61bdae0f027b1b2159e1f9d3f8d00fa668a952dddd822fda80dc745d6f65cc",
    "0x0e4223f3925f98934393c74975142bd73079ab0621f4ee133cee050a3c194f1a",
    "0x2fd7bb412155bf8693a3bd2a3e7581a679c95c68a052f835dddca85fa1569a40"
    ]
 */

fn main(root : Field, index : Field, hash_path : [Field; 3], secret: Field, priv_key: Field) {
    constrain index == index;

    let pubkey = std::scalar_mul::fixed_base(priv_key);
    let pubkey_x = pubkey[0];
    let pubkey_y = pubkey[1];
    let note_commitment = std::hash::pedersen([pubkey_x, pubkey_y, secret]);

    let root = std::merkle::check_membership(root, note_commitment[0], index, hash_path);
    std::println(root);
}
```

## check_membership_in_noir

Behaves exactly the same as above, but it's computed in Noir in order to accept many backends.

```rust
fn check_membership_in_noir(root : Field, leaf : Field, index : Field, hash_path: [Field]) -> Field
```

For examples, you can literally replace `check_membership` for this method, in the above example.

## compute_root_from_leaf

Returns the root of the tree from the provided leaf and its hashpath, using a pedersen hash

```rust
fn compute_root_from_leaf(leaf : Field, index : Field, hash_path: [Field]) -> Field
```

example:

```rust
/**
    index = "0"
    priv_key = "0x000000000000000000000000000000000000000000000000000000616c696365"
    secret = "0x1929ea3ab8d9106a899386883d9428f8256cfedb3c4f6b66bf4aa4d28a79988f"
    note_hash_path = [
    "0x1e61bdae0f027b1b2159e1f9d3f8d00fa668a952dddd822fda80dc745d6f65cc",
    "0x0e4223f3925f98934393c74975142bd73079ab0621f4ee133cee050a3c194f1a",
    "0x2fd7bb412155bf8693a3bd2a3e7581a679c95c68a052f835dddca85fa1569a40"
    ]
 */
fn main(index : Field, priv_key : Field, secret : Field, note_hash_path : [Field; 3]) {
    constrain index == index;

    let pubkey = std::scalar_mul::fixed_base(priv_key);
    let pubkey_x = pubkey[0];
    let pubkey_y = pubkey[1];
    let note_commitment = std::hash::pedersen([pubkey_x, pubkey_y, secret]);

    let root = std::merkle::compute_root_from_leaf(note_commitment[0], index, note_hash_path);
    std::println(root);
}
```
