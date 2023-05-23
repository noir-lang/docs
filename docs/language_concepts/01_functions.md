---
title: Functions
description:
  Learn how to declare functions and methods in Noir, a programming language with Rust semantics.
  This guide covers parameter declaration, return types, call expressions, and more.
keywords: [Noir, Rust, functions, methods, parameter declaration, return types, call expressions]
---

Functions in Noir follow the same semantics of Rust, though Noir does not support early returns.

To declare a function the `fn` keyword is used.

```rust
fn foo() {}
```

All parameters in a function must have a type and all types are known at compile time. The parameter
is pre-pended with a colon and the parameter type. Multiple parameters are separated using a comma.

```rust
fn foo(x : Field, y : pub Field){}
```

The return type of a function can be stated by using the `->` arrow notation. The function below
states that the foo function must return a `Field`. If the function returns no value, then the arrow
is omitted.

```rust
fn foo(x : Field, y : pub Field) -> Field {
    x + y
}
```

Note that a `return` keyword is unneeded in this case - the last expression in a function's body is
returned.

## Call Expressions

Calling a function in Noir is executed by using the function name and passing in the necessary
arguments.

Below we show how to call the `foo` function from the `main` function using a call expression:

```rust
fn main(x : Field, y : Field) {
    let z = foo(x);
}

fn foo(x : Field) -> Field {
    x + x
}
```

## Methods

You can define methods in Noir on any struct type in scope.

```rust
struct MyStruct {
    foo: Field,
    bar: Field,
}

impl MyStruct {
    fn new(foo: Field) -> MyStruct {
        MyStruct {
            foo,
            bar: 2,
        }
    }

    fn sum(self) -> Field {
        self.foo + self.bar
    }
}

fn main() {
    let s = MyStruct::new(40);
    constrain s.sum() == 42;
}
```

Methods are just syntactic sugar for functions, so if we wanted to we could also call `sum` as
follows:

```rust
constrain MyStruct::sum(s) == 42
```

## Black Box Functions

Black box functions are functions in Noir that rely on backends implementing support for specialized constraints. This makes certain zk-snark unfriendly computations cheaper than if they were implemented in Noir.

:::warning

It is likely that not all backends will support a particular black box function.

:::

Because it is not guaranteed that all backends will support black box functions, it is possible that certain Noir programs won't compile against a particular backend if they use an unsupported black box function. It is possible to fallback to less efficient implementations written in Noir/ACIR in some cases.

Here is a list of the current black box functions that are supported by UltraPlonk:

- AES
- [SHA256](../standard_library/cryptographic_primitives/hashes#sha256)
- [Schnorr signature verification](../standard_library/cryptographic_primitives/schnorr)
- [Blake2s](../standard_library/cryptographic_primitives/hashes#blake2s)
- [Pedersen](../standard_library/cryptographic_primitives/hashes#pedersen)
- HashToField128Security
- [ECDSA signature verification](../standard_library/cryptographic_primitives/ecdsa_secp256k1)
- [Fixed base scalar multiplication](../standard_library/cryptographic_primitives/scalar)
- AND
- XOR
- RANGE
- [Keccak256](../standard_library/cryptographic_primitives/hashes#keccack256)

You can find `stdlib` functions which link to these as they'll have the `#[foreign()]` modifier.

You may notice there's a number of black box functions which aren't included in the `stdlib` as they are generated as part of the language (e.g. working with a `u64` will result in RANGE black box functions being emitted to ensure you don't overflow). For these, we have fallback implementations of `AND`, `XOR` and `RANGE` defined in the ACVM `stdlib` which means that we can seamlessly fallback if the backend doesn't support them.

You can view the black box functions defined in the ACVM code [here](https://github.com/noir-lang/acvm/blob/master/acir/src/circuit/black_box_functions.rs).
