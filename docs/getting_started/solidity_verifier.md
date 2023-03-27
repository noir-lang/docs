# Solidity Verifier

For certain applications, it may be desirable to run the verifier as a smart contract instead of on a local machine.

Compile a Solidity verifier contract for your Noir program by running:

```sh
nargo contract
```

A new `contract` folder would then be generated in your project directory, containing the Solidity file `plonk_vk.sol`. It can be deployed on any EVM blockchain acting as a verifier smart contract.

> **Note:** It is possible to compile verifier contracts of Noir programs for other smart contract platforms as long as the proving backend supplies an implementation.
>
> Barretenberg, the default proving backend Nargo is integrated with, supports compilation of verifier contracts in Solidity only for the time being.
