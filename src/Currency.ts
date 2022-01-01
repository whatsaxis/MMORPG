import { Transaction, TransactionStatus, Item } from './types'
import { PLAYER } from './main'

/*
* Currency API
*
* An easy way to manipulate the coins in the player's purse
*/

export function transaction(meta: Transaction) {
    const { amount, type } = meta

    let status = TransactionStatus.SUCCESS

    if (type === '+') PLAYER.coins += amount
    else if (type === '-') {
        if (PLAYER.coins >= amount) {
            PLAYER.coins -= amount
        } else {
            status = TransactionStatus.NOT_ENOUGH_COINS
        }
    }

    return status
}

export function buy(item: Item) {
    if (PLAYER.inventory.filter(item => item === null).length === 0) return TransactionStatus.NO_INVENTORY_SPACE

    const { value } = item
    const Transaction = transaction({ amount: value, type: '-' })

    if (Transaction === TransactionStatus.SUCCESS) {
        PLAYER.inventory[PLAYER.inventory.indexOf(null)] = item
        PLAYER.$update()

        return TransactionStatus.SUCCESS
    }

    return TransactionStatus.NOT_ENOUGH_COINS   
}

export function sell(item: Item) {
    // todo

    const { value } = item
    return transaction({ amount: value, type: '+' })
}