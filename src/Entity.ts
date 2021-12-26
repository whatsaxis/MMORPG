import EnvironmentManager from './EnvironmentManager'
import { Grid2D, SpriteImage, EntityOptions } from './types'


abstract class Entity {
    position: Grid2D
    scale: Grid2D
    sprite: SpriteImage | null = null

    constructor(options: EntityOptions) {
        this.position = options.position

        if (options.scale) this.scale = options.scale
        else this.scale = { x: 50, y: 50 }

        if (options.sprite && options.sprite?.src) this.sprite = options.sprite

        EnvironmentManager.register(this)
    }
}

export default Entity