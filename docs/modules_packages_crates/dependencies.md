---
title: Managing Dependencies
description:
  Learn how to specify and manage dependencies in Nargo, allowing you to upload packages to GitHub
  and use them easily in your project.
keywords: [Nargo, dependencies, GitHub, package management, versioning]
---

# Dependencies

Nargo allows you to upload packages to GitHub and use them as dependencies.

## Specifying a dependency

```
hello_world = { tag = "v0.5", git = "https://github.com/kevaundray/hello-world-noir"}
```

Specifying a dependency requires a tag to a specific commit and the git url to the url containing
the package.

Currently, there are no requirements on the tag contents. If requirements are added, it would follow
semver 2.0 guidelines.

> Note: Without a `tag` , there would be no versioning and dependencies would change each time you
> compile your project.
