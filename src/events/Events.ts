/*
* Events
*
* All definitions for event payloads
*/

import Entity from '../Entity'
import { EntityType, MovementDirection } from '../types'

/*
* Game Event base class
*/

export class GameEvent<T extends IPayload> {
    private cancelled: boolean
    private payload: T

    constructor(payload: T) {
        this.cancelled = false
        this.payload = payload
    }

    isCancelled() {
        return this.cancelled
    }

    getPayload() {
        return this.payload
    }

    prevent() {
        this.cancelled = true
    }
}

/*
* Game event payload definitions
*/

interface IPayload {
    $type: keyof typeof EventType
}

export interface EntityMovementEventPayload extends IPayload {
    $type: EventType.ENTITY_MOVEMENT
    entityType: EntityType,
    entity: Entity,
    direction: MovementDirection
}

export interface EntityAttackEventPayload extends IPayload {
    $type: EventType.ENTITY_ATTACK
    entityType: EntityType,
    from: Entity,
    to: Entity
}


export type Payload = EntityMovementEventPayload | EntityAttackEventPayload

/*
* Events enum
*/

export enum EventType {
    ENTITY_MOVEMENT = 'ENTITY_MOVEMENT',
    ENTITY_ATTACK   = 'ENTITY_ATTACK',
}