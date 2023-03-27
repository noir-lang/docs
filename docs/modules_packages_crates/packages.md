# Packages

A Nargo Package is a collection of one of more crates. A Package must include a Nargo.toml file.

A Package _must_ contain either a library or a binary crate.

## Creating a new package

A new package is created using the `new` command.

```
$ nargo new my-project
$ ls my-project
Nargo.toml
src
$ ls my-project/src
main.nr
```

## Binary vs Library

Similar to Cargo, Nargo follows the convention that if there is a `src/main.nr` then the project is a binary. If it contains a `src/lib.nr` then it is a library.

However, note that dissimilar to Cargo, we cannot have both a binary and library in the same project.
