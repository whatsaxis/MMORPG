import Entity from '../Entity'

import EventManager from '../events/EventManager'
import { EventType } from '../events/Events'

import item from '../Item'

import { EntityOptions, EntityType, Item, Weapon, Armour, MovementDirection, ArmourType, ItemType } from '../types'

/*
* Player
*
* Contains controls and other aspects of the player
*/

type InventorySlot = Item | null
type IS = InventorySlot  // Short for InventorySlot

type WeaponSlot = Weapon | null
type ArmourSlot = Armour | null

class Player extends Entity {
    level: number
    health: number
    defence: number

    inventory: [IS, IS, IS, IS, IS, IS, IS, IS]
    armour: [ArmourSlot, ArmourSlot, ArmourSlot, ArmourSlot]

    constructor(options: EntityOptions) {
        super(options)

        this.sprite = { src: 'warrior.gif' }

        /*
        * Player statistics
        */

        this.level = 1
        this.health = 100
        this.defence = 100

        let stardust_armour: [Armour, Armour, Armour, Armour] = [ item('HELMET_STARDUST'), item('CHESTPLATE_STARDUST'), item('LEGGINGS_STARDUST'), item('BOOTS_STARDUST')]
        stardust_armour.forEach(p => p.stats.upgrade = 5)

        this.inventory = [...stardust_armour, null, null, null, null]
        this.armour = [null, null, null, null]

        this.$update()

        /*
        * Controls
        */

        let pressed = {
            'w': false,
            'a': false,
            's': false,
            'd': false
        }

        document.addEventListener('keydown', (e: KeyboardEvent) => {
            const key = e.key.toLowerCase()

            if (Object.keys(pressed).includes(key)) {
                pressed[key as keyof typeof pressed] = true
            }
        })

        document.addEventListener('keyup', (e: KeyboardEvent) => {
            const key = e.key.toLowerCase()

            if (Object.keys(pressed).includes(key)) {
                pressed[key as keyof typeof pressed] = false
            }
        })

        setInterval(() => {
            for (const [k, v] of Object.entries(pressed)) {

                if (v === true) {

                    EventManager.$emit(
                        {
                            $type: EventType.ENTITY_MOVEMENT,
                            entityType: EntityType.PLAYER,
                            entity: this,
                            direction: k as MovementDirection
                        }
                    )

                }
            }
        }, 30)
    }

    $update() {
        this.health = 100
        this.defence = 100

        /*
        * Calculate armour
        */

        for (const a of this.armour) {
            if (a === null) continue

            const { upgrade, health, defence } = a.stats

            const multiplier = upgrade === 0 ?
                1 :
                1 + (upgrade * 0.1)

            this.health += health * multiplier
            this.defence += defence * multiplier
        }
        
        /*
        * Update UI
        */

        const health_ui = document.querySelector('#stats-health')
        const defence_ui = document.querySelector('#stats-defence')

        if (!health_ui || !defence_ui) return
        if (!health_ui.textContent || !defence_ui.textContent) return

        health_ui.textContent = `Health: ${ this.health.toString()}❤️`
        defence_ui.textContent = `Defence: ${ this.defence.toString()}🛡️`

        /*
        * Update inventory & armour
        */

        const inventory_ui = document.querySelector('#inventory')
        const armour_ui = document.querySelector('#armour')

        if (!inventory_ui || !armour_ui) return

        inventory_ui.innerHTML = ''
        armour_ui.innerHTML = ''

        /* Inventory */

        const generateSlot = (item: InventorySlot, invIndex: number, armourSlot: boolean) => {
            const slot = document.createElement('div')

            slot.setAttribute('class', 'inventory-slot')

            if (item === null) {
                return slot
            }

            const i = document.createElement('span')

            if (item.type === ItemType.ARMOUR) {
                const armour = (item as Armour)
                const part = armour.stats.part
    
                let p = 0

                if (part === ArmourType.HELMET) p = 0
                else if (part === ArmourType.CHESTPLATE) p = 1
                else if (part === ArmourType.LEGGINGS) p = 2
                else if (part === ArmourType.BOOTS) p = 3

                i.addEventListener('click', () => {

                    if (armourSlot === true) {
                        const nextEmpty = this.inventory.indexOf(null)

                        this.inventory[nextEmpty] = this.armour[p]
                        this.armour[p] = null
                    } else {
                        this.inventory[invIndex] = this.armour[p]
                        this.armour[p] = armour
                    }

                    this.$update()
                })
            }

            i.textContent = item.name + '✪'.repeat(item.stats.upgrade)
            slot.append( i )

            return slot
        }

        for (const [i, itm] of this.inventory.entries()) { inventory_ui.append(generateSlot(itm, i, false)) }
        for (const [i, armr] of this.armour.entries()) { armour_ui.append(generateSlot(armr, i, true)) }
    }
}

export default Player