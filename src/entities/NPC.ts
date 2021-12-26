/*
* NPC
*
* Contains control code for Non Player Characters (NPC)
*/

import Entity from '../Entity'
import Chat from '../Chat'

import { PLAYER } from '../main'
import { EntityOptions, MessageType } from '../types'


class NPC extends Entity {
    inInteraction: boolean

    constructor(options: EntityOptions) {
        super(options)

        this.sprite = { src: 'npc.png' }
        this.inInteraction = false

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

            for (let p = 0; p < 3; p++) {
                const shopItem = document.createElement('div')
                shopItem.classList.add('chat-shop__item')

                const itemName = document.createElement('span')
                itemName.textContent = 'Ond Sword ✪'

                const itemStats = document.createElement('div')
                itemStats.textContent = 'Damage: 15 💔'

                const buy = document.createElement('button')
                buy.textContent = 'Buy'

                shopItem.append( itemName )
                shopItem.append( itemStats )
                shopItem.append( buy )

                shop.append(shopItem)
            }

            /* Add as widget */
            
            Chat.widget(shop)

            resolve(true)
        })
       
    }
}

export default NPC