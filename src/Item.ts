import { Weapon, Armour, Tool, ItemRarity, ItemType, ArmourType } from './types'

/* Item Names */

enum WeaponNames {
    SWORD_OND = 'SWORD_OND',
}

enum ArmourNames {
    HELMET_OND = 'HELMET_OND',

    HELMET_STARDUST     = 'HELMET_STARDUST',
    CHESTPLATE_STARDUST = 'CHESTPLATE_STARDUST',
    LEGGINGS_STARDUST   = 'LEGGINGS_STARDUST',
    BOOTS_STARDUST      = 'BOOTS_STARDUST'
}

enum ToolNames {
    STONE_PICKAXE = 'STONE_PICKAXE'
}

type ItemNames = keyof typeof WeaponNames | keyof typeof ArmourNames | keyof typeof ToolNames

/* Item statistics */

const WEAPONS: { [ITEM_ID in WeaponNames]: Weapon } = {
    SWORD_OND: {
        name: 'Ond Sword',
        description: 'A simple sword!',
        rarity: ItemRarity.COMMON,
        type: ItemType.WEAPON,
        image: null,
        stats: {
            upgrade: 0,
            damage: 15
        }
    }
}

const ARMOUR: { [ITEM_ID in ArmourNames]: Armour } = {
    HELMET_OND: {
        name: 'Ond Helmet',
        description: 'A simple helmet!',
        rarity: ItemRarity.COMMON,
        type: ItemType.ARMOUR,
        image: null,
        stats: {
            upgrade: 0,
            part: ArmourType.HELMET,
            health: 20,
            defence: 15
        }
    },

    HELMET_STARDUST: {
        name: 'Stardust Helmet',
        description: 'Mythic helmet, forged from the intense heat in the core of a star.',
        rarity: ItemRarity.MYTHIC,
        type: ItemType.ARMOUR,
        image: null,
        stats: {
            upgrade: 0,
            part: ArmourType.HELMET,
            health: 600,
            defence: 400
        }
    },
    CHESTPLATE_STARDUST: {
        name: 'Stardust Chestplate',
        description: 'A mythic chestplate, forged from the intense heat in the core of a star.',
        rarity: ItemRarity.MYTHIC,
        type: ItemType.ARMOUR,
        image: null,
        stats: {
            upgrade: 0,
            part: ArmourType.CHESTPLATE,
            health: 800,
            defence: 580
        }
    },
    LEGGINGS_STARDUST: {
        name: 'Stardust Leggings',
        description: 'Mythic leggings, forged from the intense heat in the core of a star.',
        rarity: ItemRarity.MYTHIC,
        type: ItemType.ARMOUR,
        image: null,
        stats: {
            upgrade: 0,
            part: ArmourType.LEGGINGS,
            health: 650,
            defence: 475
        }
    },
    BOOTS_STARDUST: {
        name: 'Stardust Boots',
        description: 'Mythic boots, forged from the intense heat in the core of a star.',
        rarity: ItemRarity.MYTHIC,
        type: ItemType.ARMOUR,
        image: null,
        stats: {
            upgrade: 0,
            part: ArmourType.BOOTS,
            health: 480,
            defence: 300
        }
    }
}

const TOOLS: { [ITEM_ID in ToolNames]: Tool } = {
    STONE_PICKAXE: {
        name: 'Stone Pickaxe',
        description: 'Literally a pickaxe made out of stone..',
        rarity: ItemRarity.COMMON,
        type: ItemType.TOOL,
        image: null,
        stats: {
            upgrade: 0,
            power: 5
        }
    }
}

/* Union type of all items */
export const Items = { ...ARMOUR, ...WEAPONS, ...TOOLS }

/*
* Item creation method
*/

function item(i: keyof typeof WeaponNames): Weapon
function item(i: keyof typeof ArmourNames): Armour
function item(i: keyof typeof ToolNames): Tool

function item(i: ItemNames) {
    /* Make a copy of one of the base items */
    return { ...Items[i] }
}

export default item