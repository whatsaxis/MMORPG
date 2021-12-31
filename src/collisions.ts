import { Point } from './types'
import { SPEED } from './canvas'


function range(value: number, min: number, max: number) {
    return (value >= min) && (value <= max)
}

export function isColliding(a: Point, b: Point) {
    const x = range(a.position.x, b.position.x, (b.position.x + b.scale.x) - SPEED) ||
              range(b.position.x, a.position.x, (a.position.x + a.scale.x) - SPEED)

    const y = range(a.position.y, b.position.y, (b.position.y + b.scale.y) - SPEED) ||
              range(b.position.y, a.position.y, (a.position.y + a.scale.y) - SPEED)

    return x && y
}