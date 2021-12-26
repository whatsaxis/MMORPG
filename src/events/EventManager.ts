import TickManager from '../TickManager'
import { GameEvent, EventType, Payload } from './Events'

import {
    EntityMovementEventPayload,
    EntityAttackEventPayload
} from './Events'


namespace EventManager {

    /*
    * Event emitter
    */

    export let $listeners: Record<keyof typeof EventType, ((event: GameEvent<any>) => void)[]> = {
        'ENTITY_MOVEMENT': [],
        'ENTITY_ATTACK': []
    }
    
    export function listen(event: EventType.ENTITY_MOVEMENT, callback: (event: GameEvent<EntityMovementEventPayload>) => void): void
    export function listen(event: EventType.ENTITY_ATTACK, callback: (event: GameEvent<EntityAttackEventPayload>) => void): void

    export function listen(event: any, callback: any): void {
        $listeners[event as EventType].push(callback)
    }

    export function $emit(payload: Payload): void {               
        const event = new GameEvent(payload)

        TickManager.STACK.push(event)
    }
}

export default EventManager