import { BigInt } from "@graphprotocol/graph-ts"
import {
  VaultTransfer as VaultTransferEvent,
  VaultDeposit as VaultDepositEvent
} from "../generated/Vault/Vault"
import { Transfer as TransferEntity, Deposit as DepositEntity } from "../generated/schema"

export function handleVaultTransfer(event: VaultTransferEvent): void {
  
  let txHash = event.transaction.hash.toHex()
  let origin = event.transaction.from.toHex()
  let entity = TransferEntity.load(origin)

  if (entity == null) {
    entity = new TransferEntity(origin)

    entity.amount = BigInt.fromI32(0)
  }

  entity.amount = event.params.amount

  entity.token = event.params.token
  entity.to = event.params.to
  entity.txHash = txHash

  entity.save()
}

export function handleVaultDeposit(event: VaultDepositEvent): void {
  
  let txHash = event.transaction.hash.toHex()
  let origin = event.transaction.from.toHex()
  let entity = DepositEntity.load(origin)
  
  if (entity == null) {
    entity = new DepositEntity(origin)

    entity.amount = BigInt.fromI32(0)
  }

  entity.amount = event.params.amount
  entity.token = event.params.token
  entity.from = event.params.sender
  entity.txHash = txHash

  entity.save()

}
