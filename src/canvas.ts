import EnvironmentManager from './EnvironmentManager'
import { canvas } from './main'

/*
* Automatically resize the canvas based on window size
*/

const DIMENSIONS = 700
const LIMIT = DIMENSIONS + (DIMENSIONS * 0.1)

export function resize() {
    if (!canvas) return

    canvas.width = window.innerWidth > LIMIT ?
        DIMENSIONS :
        Math.floor(window.innerWidth * 0.9)

    canvas.height = window.innerHeight > LIMIT ?
        DIMENSIONS :
        Math.floor(window.innerHeight * 0.9)

    EnvironmentManager.draw()
}

window.addEventListener('resize', resize)