---
id: "BarretenbergBackend"
title: "Class: BarretenbergBackend"
sidebar_label: "BarretenbergBackend"
sidebar_position: 0
custom_edit_url: null
hide_title: true
---

## Implements

- [`Backend`](../interfaces/Backend.md)

## Constructors

### constructor

• **new BarretenbergBackend**(`circuit`, `options?`)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `circuit` | [`CompiledCircuit`](../interfaces/CompiledCircuit.md) | The circuit to be used by the backend. |
| `options` | [`BackendOptions`](../interfaces/BackendOptions.md) | Options for the backend. |

## Properties

### circuit

• **circuit**: [`CompiledCircuit`](../interfaces/CompiledCircuit.md)

#### Implementation of

[Backend](../interfaces/Backend.md).[circuit](../interfaces/Backend.md#circuit)

___

### options

• **options**: [`BackendOptions`](../interfaces/BackendOptions.md)

## Methods

### instantiate

▸ **instantiate**(): `Promise`<`void`\>

This async method is called by the Noir class.
It allocates resources, decompresses the bytecode, and inits the SRS.

#### Returns

`Promise`<`void`\>

#### Implementation of

[Backend](../interfaces/Backend.md).[instantiate](../interfaces/Backend.md#instantiate)
