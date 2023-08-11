---
title: Shadowing
---

Noir allows for variable shadowing, similar to Rust, by default for local variables.

For example, the following function is valid Noir:

```rust
fn main() {
    let x = 5;
    let x = x + 1;
    let x = x * 2;
    std::println(x);
}
```

In this example, the first line defines a variable x with the value 5. The next line doesn't change x — instead, it creates a new x and shadows the original x. The new x is the result of the old x plus 1, which is 6. On the third line, it again shadows x with x \* 2, which is 12. So, in the end, it will print 12 instead of 5 or 6.
