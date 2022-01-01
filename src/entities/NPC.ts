/*
* NPC
*
* Contains control code for Non Player Characters (NPC)
*/

import Entity from '../Entity'
import Chat from '../Chat'
import { buy } from '../Currency'

import { PLAYER } from '../main'
import { EntityOptions, Item, ItemType, MessageType, TransactionStatus } from '../types'

import item from '../Item'


class NPC extends Entity {
    inInteraction: boolean
    items: { item: Item, bought: boolean, price: number }[]

    constructor(options: EntityOptions) {
        super(options)

        this.sprite = { src: 'npc.png' }
        this.inInteraction = false


        this.items = [
            { item: item('SWORD_OND'), bought: false, price: 15 },
            { item: item('HELMET_OND'), bought: false, price: 25 },
            { item: item('COAL'), bought: false, price: 4 },
        ]

        /*
        * Interactivity
        */

        document.addEventListener('keydown', async (e: KeyboardEvent) => {
            const key = e.key

            if (key === ' ') {

                    // Check if player is in close proximity to self

                    if (Math.hypot(
                        this.position.x - PLAYER.position.x,
                        this.position.y - PLAYER.position.y
                    ) <= 60) {

                        if (this.inInteraction === false) {

                            this.inInteraction = true
                            await this.initiateInteraction()
                            this.inInteraction = false

                        }

                    }

            }
        })
    }

    _sleep(ms: number) {
        return new Promise((resolve) => setTimeout(resolve, ms))
    }

    initiateInteraction() {
        return new Promise(async (resolve) => {

            /*
            * Introduction
            */

            Chat.send({ by: 'Jon', type: MessageType.NPC, message: 'Hello, traveller!' })
            await this._sleep(2000)
            Chat.send({ by: 'Jon', type: MessageType.NPC, message: 'What makes you venture around these parts? Powerful creatures reside here.' })
            await this._sleep(2000)
            Chat.send({ by: 'Jon', type: MessageType.NPC, message: "You're gonna need some better gear than that!" })
            await this._sleep(1500)


            /*
            * Initiate shop
            */

            const answer = await Chat.question({ by: 'Jon', type: MessageType.NPC, message: 'Would you like to purchase some?' }, ['Y', 'N'])
            
            if (answer === 'N') {
                Chat.send({ by: 'Jon', type: MessageType.NPC, message: "Very well." })
                return resolve(false)
            }

            Chat.send({ by: 'Jon', type: MessageType.NPC, message: "Awesome! Here's what I have to offer." })

            const shop = document.createElement('div')
            shop.classList.add('chat-widget', 'chat-shop')

            /* List items */

            this.items.forEach((i) => {
                const shopItem = document.createElement('div')
                shopItem.classList.add('chat-shop__item')

                const itemName = document.createElement('span')
                itemName.textContent = i.item.name

                shopItem.append( itemName )
                
                if (i.item.type !== ItemType.MATERIAL) {
                    itemName.textContent += '✪'.repeat(i.item.stats.upgrade)

                    Object.entries(i.item.stats).forEach(([k, v]) => {
                        const itemStat = document.createElement('div')
                        itemStat.textContent = `${ k.charAt(0).toUpperCase() + k.slice(1) }: ${ v }`
        
                        if (k === 'health') itemStat.textContent += '❤️'
                        else if (k === 'defence') itemStat.textContent += '🛡️'
                        else if (k === 'damage') itemStat.textContent += '⚔️'
                        else return

                        shopItem.append( itemStat )
                    })
                }

                const Buy = document.createElement('button')
                Buy.textContent = `${ i.price } 💰`

                shopItem.append( Buy )
                shop.append(shopItem)

                if (i.bought === true) return Buy.textContent = '✅'

                Buy.onclick = () => {
                    const transaction = buy(i.item)

                    // Clear menu

                    shop.remove()
                    exit.remove()

                    /*
                    * Transaction failed
                    */

                    if (transaction === TransactionStatus.NOT_ENOUGH_COINS) {
                        return Chat.send({
                            by: 'Jon',
                            type: MessageType.NPC,
                            message: `Hey! You don't have enough coins to buy that! [${ PLAYER.coins.toString() }/${ i.item.value.toString() }💰]`
                        })
                    }
                    else if (transaction === TransactionStatus.NO_INVENTORY_SPACE) {
                        return Chat.send({
                            by: 'Jon',
                            type: MessageType.NPC,
                            message: "You don't have enough space in your inventory to buy that!"
                        })
                    }

                    // Tag the item as purchased, so as to not allow the user to buy it again.
                    i.bought = true

                    Chat.send({ by: 'Jon', type: MessageType.NPC, message: "See ya later buddy!" })
                    return resolve(true)
                }

                return true
            })

            /* Add as widget */
            
            Chat.widget(shop)

            const exit = document.createElement('button')
            exit.classList.add('chat-shop__exit')

            exit.textContent = 'Exit'

            exit.onclick = () => {
                shop.remove()
                exit.remove()

                Chat.send({ by: 'Jon', type: MessageType.NPC, message: "See ya later!" })

                resolve(true)
            }

            Chat.widget(exit)

            // resolve(true)
        })
       
    }
}

export default NPC