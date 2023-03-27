# Constrain Statement

Noir includes a special keyword `constrain` which will explicitly constrain the predicate/comparison expression that follows to be true.
If this expression is false at runtime, the program will fail to be proven.

### Constrain statement example

```rust,noplaypen
fn main(x : Field, y : Field) {
    constrain x == y;
}
```

The above snippet compiles because `==` is a predicate operation. Conversely, the following will not compile:

```rust,noplaypen
fn main(x : Field, y : Field) {
    constrain x + y;
}
```

> The rationale behind this not compiling is due to ambiguity. It is not clear if the above should equate to `x + y == 0` or if it should check the truthiness of the result.
