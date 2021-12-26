import Entity from '../Entity'
import { EntityOptions } from '../types'

/*
* Wall
*
* Immovable, stationary object to restrict movement of the player
*/

class Wall extends Entity {

    constructor(options: EntityOptions) {
        super(options)

        this.scale = { x: 50, y: 50 }
        this.sprite = { src: 'wall.png' }
    }

}

export default Wall