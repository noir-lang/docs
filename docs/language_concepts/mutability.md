# Mutability

Variables in noir can be declared mutable via the `mut` keyword.
Mutable variables can be reassigned to via
an assignment expression.

```rust,noplaypen
let x = 2;
x = 3; // error: x must be mutable to be assigned to

let mut y = 3;
let y = 4; // OK
```

The `mut` modifier can also apply to patterns:

```rust,noplaypen
let (a, mut b) = (1, 2);
a = 11; // error: a must be mutable to be assigned to
b = 12; // OK

let mut (c, d) = (3, 4);
c = 13; // OK
d = 14; // OK

// etc.
let MyStruct { x: mut y } = MyStruct { x: a }
// y is now in scope
```

Note that mutability in noir is local and everything is passed by value, so if a
called function mutates its parameters then the parent function will keep the old value of the parameters.

```rust,noplaypen
fn main() -> Field {
    let x = 3;
    helper(x);
    x // x is still 3
}

fn helper(mut x: i32) {
    x = 4;
}
```

### Constants

A constant type is a value that does not change per circuit instance. This is different to a witness which changes per proof. If a constant type that is being used in your program is changed, then your circuit will also change.

Below we show how to declare a constant value:

```rust,noplaypen
fn main() {
    let a: comptime Field = 5;

    // `comptime Field` can also be inferred:
    let a = 5;
}
```

Note that variables declared as mutable may not be constants:

```rust,noplaypen
fn main() {
    // error: Cannot mark a comptime type as mutable - any mutation would remove its const-ness
    let mut a: comptime Field = 5;

    // a inferred as a private Field here
    let mut a = 5;
}
```

### Globals

Noir also supports global variables. However, they must be compile-time variables. If `comptime` is not explicitly written in the type annotation the compiler will implicitly specify the declaration as compile-time. They can then be used like any other compile-time variable inside functions. The global type can also be inferred by the compiler entirely. Globals can also be used to specify array annotations for function parameters and can be imported from submodules.

Globals are currently limited to Field, integer, and bool literals.

```rust,noplaypen
global N: Field = 5; // Same as `global N: comptime Field = 5`

fn main(x : Field, y : [Field; N]) {
    let res = x * N;

    constrain res == y[0];

    let res2 = x * mysubmodule::N;
    constrain res != res2;
}

mod mysubmodule {
    use dep::std;

    global N: Field = 10;

    fn my_helper() -> comptime Field {
        let x = N;
        x
    }
}
```

### Why only local mutability?

Witnesses in a proving system are immutable in nature.
Noir aims to _closely_ mirror this setting without applying additional overhead to the user.
Modeling a mutable reference is not as straightforward as on conventional architectures and
would incur some possibly unexpected overhead.
