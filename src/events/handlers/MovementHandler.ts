import EventManager from '../EventManager'
import EnvironmentManager from '../../EnvironmentManager'

import { EventType } from '../Events'
import { Point, EntityType, MovementDirection } from '../../types'

import { DIMENSIONS, SPEED } from '../../canvas'
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

    if (direction === MovementDirection.NORTH) playerVector.position.y -= SPEED
    if (direction === MovementDirection.SOUTH) playerVector.position.y += SPEED
    if (direction === MovementDirection.EAST) playerVector.position.x += SPEED
    if (direction === MovementDirection.WEST) playerVector.position.x -= SPEED

    // Out of bounds!

    const s = playerVector.scale

    if (
        playerVector.position.y === 0 - SPEED          ||
        playerVector.position.y + s.y === DIMENSIONS + SPEED  ||
        playerVector.position.x === 0 - SPEED          ||
        playerVector.position.x + s.x === DIMENSIONS + SPEED
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