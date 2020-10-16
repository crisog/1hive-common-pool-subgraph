import { BigInt } from "@graphprotocol/graph-ts"
import {
  Transfer as TransferEvent
} from "../generated/Honey/ERC20"
import { Transfer as TransferEntity } from "../generated/schema"

const VAULT_ADDRESS = '0x05e42c4ae51ba28d8acf8c371009ad7138312ca4'

export function handleTransfer(event: TransferEvent): void {
  let source = event.params.from
  let destination = event.params.to
  let txHash = event.transaction.hash.toHex()
  let entity: TransferEntity
  // // We only care about the vault
  if (source.toHex() == VAULT_ADDRESS || destination.toHex() == VAULT_ADDRESS) {
    entity = new TransferEntity(txHash + '-' + event.logIndex.toString())
    entity.amount = event.params.value
    entity.source = source
    entity.destination = destination
    entity.txHash = txHash
    entity.timestamp = event.block.timestamp
    entity.save()
  }
  return
}
