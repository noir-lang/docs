---
title: Traits
description:
  Learn how to write traits in Noir programming language. A trait is a group of methods that are defined for a particular type.
keywords: [Noir programming language, traits, rust]
---

Traits in Noir work in [much the same way as in Rust](https://doc.rust-lang.org/book/ch10-02-traits.html). It's highly recommended that you get familiar with the concept of Traits in Rust, as it will help you understanding how they work in Noir.

## Example

First you need to define a Struct that will hold the implementation of a Trait. Example

```rust
struct Values {
    x: Field,
    y: Field,
}
```

then define the trait:

```rust
trait Comparison {
    fn eq(sf: Values, other: Values);
}
```

and the implementation of that trait in your struct:

```rust
impl Comparison for Values {
    fn eq(sf: Values, other: Values) {
        assert((sf.x == other.x) & (sf.y == other.y));
    }
}
```

Now you should have a struct that implements the `Comparison` Trait. This means you can simply call `.eq()` on your struct:

```rust
fn main(x : Values, y : pub Values) {
    x.eq(y);
}
```
