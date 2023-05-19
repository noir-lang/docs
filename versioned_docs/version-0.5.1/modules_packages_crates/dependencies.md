---
title: Managing Dependencies
description:
  Learn how to specify and manage dependencies in Nargo, allowing you to upload packages to GitHub
  and use them easily in your project.
keywords: [Nargo, dependencies, GitHub, package management, versioning]
---

Nargo allows you to upload packages to GitHub and use them as dependencies.

## Specifying a dependency

Specifying a dependency requires a tag to a specific commit and the git url to the url containing
the package.

Currently, there are no requirements on the tag contents. If requirements are added, it would follow
semver 2.0 guidelines.

> Note: Without a `tag` , there would be no versioning and dependencies would change each time you
> compile your project.

For example, to add the [ecrecover-noir library](https://github.com/colinnielsen/ecrecover-noir) to your project, add it to `Nargo.toml`:

```toml
# Nargo.toml

[dependencies]
ecrecover = {tag = "v0.2.0", git = "https://github.com/colinnielsen/ecrecover-noir"}
```

## Importing dependencies

You can import a dependency to a Noir file using the following syntax. For example, to import the
ecrover-noir library referenced above:

```rust
use dep::ecrecover;
```

See the [merkle proof example](../examples/merkle-proof) for how to use it in the file.

You can also import only the specific parts of dependency that you want to use. For example,
demonstrated in the
[elliptic curve example](../standard_library/cryptographic_primitives/ec_primitives#examples), you
can import just the `Point` and the `Curve` that you want to use.

```rust
use dep::std::ec::tecurve::affine::Curve;
use dep::std::ec::tecurve::affine::Point;
```
