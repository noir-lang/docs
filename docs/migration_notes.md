---
title: Migration notes
description: Read about migration notes from previous versions, which could solve problems while updating
keywords: [Noir, notes, migration, updating, upgrading]
---

Noir is in full-speed development. Things break fast, wild, and often. This page attempts to leave some notes when upgrading to specific versions.

## >v0.11.0

### Nargo backend

From this version on, Nargo starts managing backends through the `nargo backend` command. If you're updating, you may find an error similar to `backend encountered an error`.

The fix is to uninstall the existent backend (typically `barretenberg`) with

```bash
nargo backend uninstall acvm-backend-barretenberg
```

And running your program normally with `nargo prove`. This should install the newest compatible version of the backend.
