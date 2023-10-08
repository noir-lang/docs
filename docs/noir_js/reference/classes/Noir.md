---
id: "Noir"
title: "Class: Noir"
sidebar_label: "Noir"
sidebar_position: 0
custom_edit_url: null
hide_title: true
---

## Constructors

### constructor

• **new Noir**(`backend`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `backend` | [`Backend`](../interfaces/Backend.md) |

## Properties

### backend

• `Private` **backend**: [`Backend`](../interfaces/Backend.md)

## Methods

### destroy

▸ **destroy**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

___

### generateFinalProof

▸ **generateFinalProof**(`inputs`): `Promise`<[`ProofData`](../interfaces/ProofData.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `inputs` | `any` |

#### Returns

`Promise`<[`ProofData`](../interfaces/ProofData.md)\>

___

### init

▸ **init**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

___

### verifyFinalProof

▸ **verifyFinalProof**(`proofData`): `Promise`<`boolean`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `proofData` | [`ProofData`](../interfaces/ProofData.md) |

#### Returns

`Promise`<`boolean`\>
