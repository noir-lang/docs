---
title: Shadowing
---

Noir allows for shadowing by default for local variables, similar to Rust, .

For example, the following function is valid in Noir:

```rust
use dep::std;

fn main() {
    let x = 5;

    {
        let x = x * 2;
        assert (x == 10);
    }

    {
        let x = 100;
        assert (x == 100);
    }

    assert (x == 5);
}
```

In this example, a variable x is first defined with the value 5.

The local scope that follows then shadows the original x, i.e. creates a local mutable x based on the value of the original x. It is given a value of 2 times the original x.

The next local scope again shadows x, this time hard-coding the local mutable x to an initial value of 100.

When we return to the main scope, x once again refers to just the original x, which stays at the value of 5.
