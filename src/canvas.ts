import EnvironmentManager from './EnvironmentManager'
import { canvas } from './main'

/*
* Set initial canvas size based on screen size
*/

const CELL = 35
const WIDTH = 15

export const DIMENSIONS = CELL * WIDTH
export const SPEED = CELL / 5

export function resize() {
    if (!canvas) return

    canvas.width = DIMENSIONS
    canvas.height = DIMENSIONS

    EnvironmentManager.draw()
}


export default CELL