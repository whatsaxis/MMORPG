import EventManager from './events/EventManager'
import { GameEvent, EventType } from './events/Events'

/*
* Tick Manager
*
* Responsible for maintaining a synchronized game time across all entities
*/

namespace TickManager {
    export let STACK: GameEvent<any>[] = []
}

setInterval(() => {
    for (const event of TickManager.STACK) {
        const payload = event.getPayload()

        for (const l of EventManager.$listeners[payload.$type as keyof typeof EventType]) {
            l(event)

            if (event.isCancelled()) continue
        }
    }

    TickManager.STACK = []
}, 5)

export default TickManager