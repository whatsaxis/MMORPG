import Entity from '../Entity'
import { EntityOptions, ResourceType } from '../types'

import { PLAYER } from '../main'
import item from '../Item'

/*
* Resource
*
* A collectible resource the user can obtain through interacting with this block.
*/

class Resource extends Entity {

    constructor(options: EntityOptions, type: ResourceType) {
        super(options)

        if (type === ResourceType.COAL) this.sprite = { src: 'coal.jpeg' }
        else if (type === ResourceType.CRYSTAL) this.sprite = { src: 'crystal.png' }

        /*
        * Resource collection mechanics
        */

        document.addEventListener('keydown', (e: KeyboardEvent) => {
            if (e.key !== ' ') return

            if (PLAYER.inventory.indexOf(null) !== -1) {

                if (Math.hypot(
                    this.position.x - PLAYER.position.x,
                    this.position.y - PLAYER.position.y
                ) <= 60) {
                    PLAYER.inventory[PLAYER.inventory.indexOf(null)] = item(type)
                }
            }

            PLAYER.$update()
        })
    }

}

export default Resource