/*
* Tile
*
* Simply a background tile! Avoided by collision detection.
*/

import Entity from '../Entity'
import { EntityOptions } from '../types'

class Tile extends Entity {

    constructor(options: EntityOptions) {
        super(options)
        
        this.sprite = { src: 'floor.png' }
    }

}

export default Tile