import Sprite from './Entity'

import { canvas, context } from './main'
import { assets } from './AssetManager'


namespace EnvironmentManager {
    export let sprites: Sprite[] = []

    export function register(sprite: Sprite) {
        sprites.push(sprite)

        draw()
    }

    export function clear() {
        /*
        * Helper function to clear the canvas
        */

        if (!canvas || !context) return

        context.clearRect(0, 0, canvas.width, canvas.height)
    }

    export async function draw() {
        if (!canvas || !context) return

        clear()

        /*
        * Draw sprites
        */

        for (const sprite of sprites) {
            if (!sprite.sprite?.src) {
                const { x, y } = sprite.position

                context?.fillRect(x, y, sprite.scale.x, sprite.scale.y)
                continue
            }

            /*
            * Load asset from cache
            */

            const { x, y } = sprite.position
            context.drawImage(assets[sprite.sprite.src], x, y, sprite.scale.x, sprite.scale.y)
        }
    }
}

export default EnvironmentManager