---
id: "Backend"
title: "Interface: Backend"
sidebar_label: "Backend"
sidebar_position: 0
custom_edit_url: null
hide_title: true
---

## Hierarchy

- `BackendInternal`

  ↳ **`Backend`**

## Implemented by

- [`BarretenbergBackend`](../classes/BarretenbergBackend.md)

## Properties

### circuit

• **circuit**: [`CompiledCircuit`](CompiledCircuit.md)

#### Inherited from

BackendInternal.circuit

## Methods

### destroy

▸ **destroy**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Inherited from

BackendInternal.destroy

___

### generateFinalProof

▸ **generateFinalProof**(`decompressedWitness`): `Promise`<[`ProofData`](ProofData.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `decompressedWitness` | `Uint8Array` |

#### Returns

`Promise`<[`ProofData`](ProofData.md)\>

#### Inherited from

BackendInternal.generateFinalProof

___

### generateIntermediateProof

▸ **generateIntermediateProof**(`decompressedWitness`): `Promise`<[`ProofData`](ProofData.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `decompressedWitness` | `Uint8Array` |

#### Returns

`Promise`<[`ProofData`](ProofData.md)\>

___

### generateIntermediateProofArtifacts

▸ **generateIntermediateProofArtifacts**(`proofData`, `numOfPublicInputs`): `Promise`<`ProofArtifacts`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `proofData` | [`ProofData`](ProofData.md) |
| `numOfPublicInputs` | `number` |

#### Returns

`Promise`<`ProofArtifacts`\>

___

### instantiate

▸ **instantiate**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Inherited from

BackendInternal.instantiate

___

### verifyFinalProof

▸ **verifyFinalProof**(`proofData`): `Promise`<`boolean`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `proofData` | [`ProofData`](ProofData.md) |

#### Returns

`Promise`<`boolean`\>

#### Inherited from

BackendInternal.verifyFinalProof

___

### verifyIntermediateProof

▸ **verifyIntermediateProof**(`proofData`): `Promise`<`boolean`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `proofData` | [`ProofData`](ProofData.md) |

#### Returns

`Promise`<`boolean`\>
