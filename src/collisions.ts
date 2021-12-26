import { Point } from './types'


function range(value: number, min: number, max: number) {
    return (value >= min) && (value <= max)
}

export function isColliding(a: Point, b: Point) {
    const x = range(a.position.x, b.position.x, (b.position.x + b.scale.x) - 10) ||
              range(b.position.x, a.position.x, (a.position.x + a.scale.x) - 10)

    const y = range(a.position.y, b.position.y, (b.position.y + b.scale.y) - 10) ||
              range(b.position.y, a.position.y, (a.position.y + a.scale.y) - 10)

    return x && y
}