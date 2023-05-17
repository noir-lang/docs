---
title: Solidity Verifier
description:
  Learn how to run the verifier as a smart contract on the blockchain. Compile a Solidity verifier
  contract for your Noir program and deploy it on any EVM blockchain acting as a verifier smart
  contract. Read more to find out!
keywords:
  [
    solidity verifier,
    smart contract,
    blockchain,
    compiler,
    plonk_vk.sol,
    EVM blockchain,
    verifying Noir programs,
    proving backend,
    Barretenberg,
  ]
---

For certain applications, it may be desirable to run the verifier as a smart contract instead of on
a local machine.

Compile a Solidity verifier contract for your Noir program by running:

```sh
nargo codegen-verifier
```

A new `contract` folder would then be generated in your project directory, containing the Solidity
file `plonk_vk.sol`. It can be deployed on any EVM blockchain acting as a verifier smart contract.

> **Note:** It is possible to compile verifier contracts of Noir programs for other smart contract
> platforms as long as the proving backend supplies an implementation.
>
> Barretenberg, the default proving backend Nargo is integrated with, supports compilation of
> verifier contracts in Solidity only for the time being.

## Verify

To verify a proof using the Solidity verifier contract, call the `verify` function with the
following signature:

```solidity
function verify(bytes calldata _proof, bytes32[] calldata _publicInputs) external view returns (bool)
```

### Public Inputs

:::tip

A circuit doesn't have the concept of a return value. Return values are just syntactic sugar in
Noir.

Under the hood, the return value is passed as an input to the circuit and is checked at the end of
the circuit program.

:::

The verifier contract uses the output (return) value of a Noir program as a public input. So if you
have the following function

```rust
fn main(
    // Public inputs
    pubkey_x: pub Field,
    pubkey_y: pub Field,
    // Private inputs
    priv_key: Field,
) -> pub Field
```

then `verify` in `plonk_vk.sol` will expect 3 public inputs. Passing two inputs will result in an
error like `Reason: PUBLIC_INPUT_COUNT_INVALID(3, 2)`.

In this case the 3 inputs to `verify` would be ordered as `[pubkey_x, pubkey_y, return]`.
