---
title: Introduction to Logging in Noir
description:
  Learn how to use the println statement for debugging in Noir with this tutorial. Understand the
  basics of logging in Noir and how to implement it in your code.
keywords:
  [
    noir logging,
    println statement,
    debugging in noir,
    noir std library,
    logging tutorial,
    basic logging in noir,
    noir logging implementation,
    noir debugging techniques,
    rust,
  ]
---

# Logging

The standard library provides a familiar `println` statement you can use. Despite being a limited
implementation of rust's `println!` macro, this construct can be useful for debugging.

```rust
use dep::std;

fn main(string: pub str<5>) {
    let x = 5;
    std::println(x)
}

```
