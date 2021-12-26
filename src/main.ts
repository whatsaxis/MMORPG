// ? => https://gamedev.stackexchange.com/questions/182955/my-html-canvas-keep-flickering

import EnvironmentManager from './EnvironmentManager'

import Player from './entities/Player'
import NPC from './entities/NPC'
import Wall from './entities/Wall'
import Tile from './entities/Tile'

import Chat from './Chat'
import { Grid2D, MessageType } from './types'

import loadAssets from './AssetManager'
import { resize } from './canvas'

import './normalize.css'
import './style.css'
import './noscript.css'


export const canvas = document.querySelector<HTMLCanvasElement>('#canvas')
export let context = canvas?.getContext('2d')

// Initialization stuff
resize()
await loadAssets()

// Player positioning stuff, so that it is in front of the tiles
let playerPos: Grid2D = { x: 9999, y: 9999 }

// Map loading

const map = 
`--------------
--------w-----
---w----------
----ww--w---w-
--w-----w-----
-----wwww-----
--------------
--------------
--------------
---------wwwww
---------w---w
----p------n-w
---------w---w
---------wwwww
`

let y = 0

for (const row of map.split('\n')) {
    let x = 0

    for (const block of [...row]) {
        x++

        const pos = { x: (x - 1) * 50, y: y * 50 }

        if (block === '-' || block === 'p' || block === 'n') {
            new Tile({ position: pos })
        }
        if (block === 'w') new Wall({ position: pos })
        if (block === 'p') playerPos = pos
        if (block === 'n') new NPC({ position: pos })
    }

    y++
}

// Global player object
export const PLAYER = new Player({ position: playerPos })

// Initial paint
EnvironmentManager.draw()

// Welcome the player!
Chat.send({ type: MessageType.SERVER, message: 'Welcome, adventurer.' })