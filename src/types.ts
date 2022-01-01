/*
* Entity
*/

export interface EntityOptions {
    sprite?: SpriteImage,
    position: Grid2D,
    scale?: Grid2D
}

export interface Point {
    position: Grid2D
    scale: Grid2D
}

export interface SpriteImage {
    src: string
}

export interface Grid2D {
    x: number,
    y: number
}

/*
* Player
*/

export enum MovementDirection {
    NORTH = 'w',
    SOUTH = 's',
    EAST  = 'd',
    WEST  = 'a'
}

export enum EntityType {
    PLAYER = 'player'
}

/*
* Item
*/

/* Base Item Interface */

interface BaseItemOptions {
    name: string,
    description: string,
    type: ItemType,
    rarity: ItemRarity,
    value: number,
    image: string | null
}

interface BaseConsumableOptions extends BaseItemOptions {
    stats: BaseConsumableStats
}

interface BaseConsumableStats {
    upgrade: ItemUpgradeLevel
}

export enum ItemRarity {
    COMMON    = 'COMMON',
    UNCOMMON  = 'UNCOMMON',
    RARE      = 'RARE',
    EPIC      = 'EPIC',
    LEGENDARY = 'LEGENDARY',
    MYTHIC    = 'MYTHIC'
}

export enum ItemType {
    WEAPON   = 'WEAPON',
    ARMOUR   = 'ARMOUR',
    TOOL     = 'TOOL',
    MATERIAL = 'MATERIAL'
}

export enum ArmourType {
    HELMET      = 'HELMET',
    CHESTPLATE  = 'CHESTPLATE',
    LEGGINGS    = 'LEGGINGS',
    BOOTS       = 'BOOTS',
}

export type ItemUpgradeLevel = 0 | 1 | 2 | 3 | 4 | 5
export type Item = Weapon | Armour | Tool | Material

/* Extended Item Interfaces */

export interface Weapon extends BaseConsumableOptions {
    stats: {
        upgrade: ItemUpgradeLevel,
        damage: number
    }
}

export interface Armour extends BaseConsumableOptions {
    stats: {
        upgrade: ItemUpgradeLevel,
        part: ArmourType
        health: number,
        defence: number
    }
}

export interface Tool extends BaseConsumableOptions {
    stats: {
        upgrade: ItemUpgradeLevel,
        power: number
    }
}

export interface Material extends BaseItemOptions {
    type: ItemType.MATERIAL
}

/*
* Economy
*/

export interface Transaction {
    amount: number,
    type: '+' | '-'
}

export enum TransactionStatus {
    SUCCESS            = 'SUCCESS',
    NOT_ENOUGH_COINS   = 'NOT_ENOUGH_COINS',
    NO_INVENTORY_SPACE = 'NO_INVENTORY_SPACE'
}

/*
* Chat
*/

export interface ChatOptions {
    by?: string,
    type: MessageType,
    message: string
}

export enum MessageType {
    SERVER = 'SERVER',
    NPC = 'NPC'
}