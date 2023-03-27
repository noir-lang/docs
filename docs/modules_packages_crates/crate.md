# Crate

A crate is the compilation unit used in Noir.

## Crate Root

Every crate has a root, which is the source file that the compiler starts, this is also known as the root module.
The Noir compiler does not enforce any conditions on the name of the file which is the crate root, however if you are compiling via Nargo.
The Crate Root, must be called `lib.nr` or `main.nr`.
