---
title: Workspaces
---

Workspaces are a feature of nargo that allow you to manage multiple related Noir packages in a single repository. A workspace is essentially a group of related projects that share common build output directories and configurations.

Each Noir project (with it's own Nargo.toml file) can be thought of as a package. Each packages is expected to contain exactly one "named circuit", being the "name" defined in Nargo.toml with the program logic defined in `./src/main.nr`.

For a project with the following structure:

```tree
├── crates
│   ├── a
│   │   ├── Nargo.toml
│   │   └── src
│   │       └── main.nr
│   └── b
│       ├── Nargo.toml
│       └── src
│           └── main.nr
├── Nargo.toml
└── Prover.toml
```

You can define a workspace in Nargo.toml like so:

```
[workspace]
members = ["crates/a", "crates/b"]
default-member = "crates/a"
```

`members` indicates which packages should be included in the workspace, for example, when the `--workspace` flag is used with various commands.

`default-member` indicates which packages should be included in the workspace be default. `default-members` can be particularly useful in scenarios where certain members of a workspace are auxiliary tools or infrequently-used components, and you don't want them to be built or tested every time you work with the main components.
