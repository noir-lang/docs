# Control Flow

## Loops

Noir has one kind of loop: the `for` loop. `for` loops allow you to repeat a block of code multiple times.

The following block of code between the braces is run 10 times.

```rust,noplaypen
for i in 0..10 {
    // do something
};
```

## If Expressions

Noir supports `if-else` statements. The syntax is most similar to Rust's where it is not required for the statement's conditonal to be surrounded by parentheses.

```rust,noplaypen
let a = 0;
let mut x: u32 = 0;

if a == 0 {
    if a != 0 {
        x = 6;
    } else {
        x = 2;
    }
} else {
    x = 5;
    constrain x == 5;
}
constrain x == 2;
```
