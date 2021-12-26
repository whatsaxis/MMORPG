import EventManager from '../EventManager'
import EnvironmentManager from '../../EnvironmentManager'

import { EventType } from '../Events'
import { Point, EntityType, MovementDirection } from '../../types'

import { isColliding } from '../../collisions'


/*
* Movement Handler
*/


EventManager.listen(EventType.ENTITY_MOVEMENT, (e) => {
    const { entityType, entity, direction } = e.getPayload()
    if (entityType !== EntityType.PLAYER) return


    let playerVector: Point = {
        position: { ...entity.position },
        scale: { ...entity.scale }
    }

    if (direction === MovementDirection.NORTH) playerVector.position.y -= 10
    if (direction === MovementDirection.SOUTH) playerVector.position.y += 10
    if (direction === MovementDirection.EAST) playerVector.position.x += 10
    if (direction === MovementDirection.WEST) playerVector.position.x -= 10

    // Out of bounds!

    const s = playerVector.scale

    if (
        playerVector.position.y === 0 - 10          ||
        playerVector.position.y + s.y === 700 + 10  ||
        playerVector.position.x === 0 - 10          ||
        playerVector.position.x + s.x === 700 + 10
    ) return e.prevent()

    /*
    * Collision detection
    */

    for (const s of EnvironmentManager.sprites.filter(sp => sp != entity && sp.sprite?.src !== 'floor.png')) {
        if (
            isColliding
            (
                playerVector,
                { position: s.position, scale: s.scale }
            )
        ) return e.prevent()
    }

    /*
    * Move player
    */

    entity.position = playerVector.position
    entity.scale    = playerVector.scale

    EnvironmentManager.draw()
})