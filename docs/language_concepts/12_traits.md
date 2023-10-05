---
title: Traits
description: Learn how to use traits in the Noir programming language.
keywords: [Noir programming language, traits, impl, implementations, interfaces]
---

Traits in Noir are used to define shared behavior that can be implemented by different types. They follow the semantics of Rust, although currently only a minimal subset of Rust's functionality is supported. 

## Limitations
Traits are still in active development. We aim to eventually support as large of a subset of the Rust trait system as possible, but currently the following major features are missing:

- Associated types
- Associated constants
- Generic traits
- Implementing traits for generic types
- Trait bounds are only supported for free functions
- Builtin traits:
    - Function Traits (`Fn`)
    - Operator traits (`Add`, `Sub`, `Eq`, ...)

For an up-to-date list of supported features on the `master` branch, visit [the Traits tracking issue](https://github.com/noir-lang/noir/issues/2568).


## Defining a trait
A trait is defined using the `trait` keyword followed by the trait's name. Inside the `trait` block you can define method signatures without providing implementations:

```rust
trait MyTrait {
    fn get_field(self) -> Field;
    fn set_field(self, field: Field);
}
```

## Implementing a trait

To implement a trait for a particular type, you use the `impl` keyword followed by the trait's name. Inside the `impl` block you provide implementations the methods of that trait.

```rust
struct MyStruct {
    value: Field,
}

impl MyTrait for MyStruct {
    fn get_field(self) -> Field {
        self.value
    }
    fn set_field(self, field: Field) {
        self.value = field;
    }
}
```

A single type can implement multiple traits. This allows you to define and reuse different sets of behavior for the same type.

```rust
impl AnotherTrait for MyStruct {
    // Implement methods for AnotherTrait
}
```

## Using trait methods

If you have an instance of a type implementing a trait, trait methods can be used like regular `impl` methods:
```rust
fn uses_foo() {
    let foo = Foo{ value: 100 };
    assert(foo.get_field() == 100);
}
```

You can also use trait methods inside a generic function, if you declare a trait bound. You can require that a single generic named type implements multiple traits by separating them with a `+`:

```rust
struct AnotherTrait {
    fn another_method(self);
}

fn some_function<T>(t: T) where T: MyTrait+AnotherTrait {
    // Those methods come from MyTrait:
    let old_value = t.get_field();
    t.set_field(old_value * 2);

    // but since T also implements AnotherTrait, you can use its methods as well:
    t.another_method();
}
```


## Static trait methods

So far all methods shown have used the `self` parameter. If you omit it, you can create a static function that doesn't need an instance of the object.
```rust
trait Default {
    fn default() -> Self;
}

impl Default for Foo {
    fn default() -> Foo {
        Foo { value: 100 };
    }
}

// You can use the static method directly from the type:
fn uses_default() {
    let foo = Foo::default();
}

// You can also use the static method in a generic function
fn some_function<T>(t: T) -> T where T: Default {
    let t = T::default();
    t
}


```

## Default method implementations
Inside the trait block you can optionally provide default implementations for some of the methods. Trait `impl`s are allowed to omit methods with default implementations:

```rust
trait YetAnotherTrait {
    fn a_method(self) -> Field {
        1234 // default implementation!
    }
}

impl YetAnotehrTrait for Foo {
    // the implementation for `a_method` can be omitted, and the default will be used.
}

fn uses_default_method() {
    let foo = Foo{ value: 100 };
    assert(foo.a_method() == 1234);
}
```